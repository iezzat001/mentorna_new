# Working on this repo (humans and AI agents)

Multiple people and multiple AI agents work on Mentorna in parallel. Everything below exists because we actually hit the problem, not because it is good practice in the abstract.

**The one rule that prevents almost everything: never work directly in `main`, and never share a working directory with another agent.**

---

## 1. One worker, one worktree

A git *branch* is just a label. A git *worktree* is a separate folder with its own checked-out files. Two agents on two branches in the **same folder** will still collide, because there is only one set of files on disk.

Create a worktree per parallel task:

```bash
# from the main repo folder
git worktree add ../mentorna-ep4 -b feat/episode-4
git worktree add ../mentorna-links -b fix/links-page
```

Now `../mentorna-ep4` and `../mentorna-links` are independent folders. Two agents can build, run dev servers and commit at the same time without touching each other.

When finished:

```bash
git worktree remove ../mentorna-ep4
```

List what exists at any time:

```bash
git worktree list
```

**Dev server ports:** each worktree needs its own. Vite auto-increments (8080, 8081, 8082), so just note which port your worktree grabbed.

## 2. Never `git add -A`

This is the single most damaging habit in a shared tree. `git add -A` stages **everything in the folder**, including work someone else left uncommitted. It silently pulls their changes into your commit.

Stage explicitly:

```bash
git add src/pages/Validation.tsx src/data/series.ts   # yes
git add -A                                            # no
```

Before every commit, read what you are about to commit:

```bash
git status --short
git diff --cached --stat
```

If a file appears that you did not touch, stop and find out whose it is.

## 3. Check where you are before you commit

Branches can be switched by another process while you work. Always confirm:

```bash
git rev-parse --abbrev-ref HEAD
```

If a commit lands on the wrong branch, it is recoverable:

```bash
git checkout <correct-branch>
git cherry-pick <commit-sha>
git branch -f <wrong-branch> <its-original-sha>   # put the other branch back
```

`git reflog` shows every branch switch and commit, so nothing is truly lost.

## 4. Branch naming

| Prefix | Use |
|---|---|
| `feat/` | new capability, e.g. `feat/episode-4` |
| `fix/` | bug or correction, e.g. `fix/links-page` |
| `chore/` | housekeeping, deps, docs, cleanup |
| `redesign/` | visual rework of something that exists |

One branch does one thing. If a branch touches unrelated areas, split it.

## 5. Keep branches from overlapping

Before starting, check what files a task will touch. Two branches editing the same file is the main source of conflicts.

Check overlap before opening PRs:

```bash
git diff --name-only origin/main..branch-a
git diff --name-only origin/main..branch-b
```

Some files are **high-traffic** and almost every feature touches them. Treat these with care and merge quickly rather than sitting on a long-lived branch:

- `src/App.tsx` (routes)
- `src/data/series.ts` (episode registry)
- `src/integrations/supabase/types.ts`
- `tailwind.config.ts`, `src/index.css`

## 6. Merge order when branches stack

If branch B was created from branch A, merge A first, then B. A PR from B to `main` before A lands will show A's commits too and confuse review.

If they are independent, order does not matter.

## 7. Definition of done, before opening a PR

```bash
npx tsc -p tsconfig.app.json --noEmit   # must be zero errors
npx vite build                          # must pass
git diff --name-only origin/main..HEAD  # only your files
```

`main` currently typechecks with zero errors. Keep it that way. If you see errors in files you did not touch, say so rather than absorbing them silently.

## 8. Database changes

Migrations live in `supabase/migrations/` named `YYYYMMDDHHMMSS_description.sql`.

- Write the migration in the PR
- **Do not apply it to production yourself.** Say it needs applying and let Ahmed run it
- Make client code tolerate the column not existing yet, so deploys never depend on migration timing
- Update `src/integrations/supabase/types.ts` in the same PR

## 9. Never commit

Already gitignored, but worth stating: `.env*`, `.opencode/`, `.swarm/`, `memory/`, `claude-flow`, `dist/`, `.DS_Store`, and large binaries. Media belongs on S3/CloudFront, not in git.

## 10. For AI agents specifically

- **Announce your branch and worktree** at the start of a task so other agents can avoid the same files.
- **Never force-push a branch you did not create**, and never reset a branch that has commits you did not author.
- **Do not delete or "clean up" files** outside the scope of your task without asking.
- **Report anything you find but did not cause.** Do not quietly fix an unrelated broken thing inside an unrelated PR.
- **If the working tree has uncommitted changes you did not make**, stop. They belong to someone else. Do not stash, revert or commit them.

---

## Incidents this document came from

**2026-08-12, three in one session:**

1. An agent committed to `feat/episode-3-validation`, the branch was switched externally to `fix/links-page`, and the next commit landed on the wrong branch. Fixed with cherry-pick plus `git branch -f`.
2. `git add -A` swept Ahmed's uncommitted `Links.tsx` work into an unrelated Episode 3 commit, so the same change existed on two branches.
3. Ahmed's links work sat staged but uncommitted on `main` for a while, invisible to the other agent and at risk from any checkout.

All three are prevented by rules 1, 2 and 3.
