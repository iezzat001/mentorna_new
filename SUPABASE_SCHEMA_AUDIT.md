# Mentorna — Supabase Schema Audit

> Full audit of the existing Supabase database schema for the Convex migration.
> Source: `src/integrations/supabase/types.ts` + `supabase/migrations/*.sql`

---

## Tables Overview

| # | Table                  | Purpose                              | Row Count Est. | Relations          |
|---|------------------------|--------------------------------------|----------------|--------------------|
| 1 | `founders`             | Team member / founder profiles       | Low (~5-10)    | None               |
| 2 | `waiting_list`         | Parent waitlist sign-ups             | Medium         | None               |
| 3 | `magnet_leads`         | Lead-magnet contact captures         | Medium-High    | None               |
| 4 | `contact_messages`     | Contact-form submissions             | Low-Medium     | None               |
| 5 | `newsletter_subscribers` | Newsletter sign-ups                | Low-Medium     | None               |
| 6 | `valuation_submissions` | Startup valuation calculator results | Low-Medium     | FK → magnet_leads  |
| 7 | `visitor_analytics`    | Page-visit tracking                  | High           | None               |
| 8 | `user_roles`           | Admin role assignments               | Very Low       | None (implicit FK → auth.users) |
| 9 | `weeks`                | 8-week curriculum definitions        | Fixed (8)      | None               |
| 10| `week_activities`      | Activities within each week          | Low (~30)      | FK → weeks         |
| 11| `week_skills`          | Skills gained per week               | Low (~30)      | FK → weeks         |
| 12| `week_outcomes`        | Learning outcomes per week           | Low (~30)      | FK → weeks         |

---

## Enums

| Enum Name       | Values                                           |
|-----------------|--------------------------------------------------|
| `activity_type` | `assignment`, `workshop`, `seminar`, `project`   |
| `app_role`      | `super_admin`, `admin`, `moderator`              |
| `phase_type`    | `Foundation Building`, `Advanced Implementation` |

---

## Detailed Table Schemas

### 1. `founders`

Team member profiles displayed on the landing page.

| Column         | Type                     | Nullable | Default              | Notes                        |
|----------------|--------------------------|----------|----------------------|------------------------------|
| `id`           | UUID                     | NOT NULL | `gen_random_uuid()`  | PK                           |
| `name`         | TEXT                     | NOT NULL | —                    |                              |
| `title`        | TEXT                     | NOT NULL | —                    | e.g. "CEO", "CTO"           |
| `short_bio`    | TEXT                     | NOT NULL | —                    | Card-level bio               |
| `extended_bio` | TEXT                     | NOT NULL | —                    | Detail-page bio              |
| `image_url`    | TEXT                     | NOT NULL | —                    | Profile photo URL            |
| `linkedin_url` | TEXT                     | NULL     | —                    | Optional social link         |
| `twitter_url`  | TEXT                     | NULL     | —                    | Optional social link         |
| `instagram_url`| TEXT                     | NULL     | —                    | Added in migration 20260308  |
| `tiktok_url`   | TEXT                     | NULL     | —                    | Added in migration 20260308  |
| `is_active`    | BOOLEAN                  | NOT NULL | `true`               | Soft-delete / visibility     |
| `order_index`  | INTEGER                  | NOT NULL | `0`                  | Display order                |
| `created_at`   | TIMESTAMPTZ              | NOT NULL | `now()`              |                              |
| `updated_at`   | TIMESTAMPTZ              | NOT NULL | `now()`              |                              |

**Indexes:** None custom (PK only).
**RLS:** Authenticated users manage; public read implied by app usage.

---

### 2. `waiting_list`

Parents who sign up for the bootcamp waitlist.

| Column              | Type        | Nullable | Default             | Notes                           |
|---------------------|-------------|----------|---------------------|---------------------------------|
| `id`                | UUID        | NOT NULL | `gen_random_uuid()` | PK                              |
| `name`              | TEXT        | NOT NULL | —                   | Parent's name                   |
| `email`             | TEXT        | NOT NULL | —                   | Contact email                   |
| `whatsapp`          | TEXT        | NOT NULL | —                   | WhatsApp number                 |
| `children_count`    | TEXT        | NOT NULL | —                   | e.g. "1", "2", "3+"            |
| `age_groups`        | TEXT[]      | NOT NULL | —                   | e.g. ["8-10", "11-13"]         |
| `coding_experience` | TEXT        | NOT NULL | —                   | e.g. "none", "some", "advanced"|
| `english_level`     | TEXT        | NULL     | —                   | Added in migration 20250108     |
| `relationship`      | TEXT        | NULL     | —                   | Added in migration 20250108     |
| `country`           | TEXT        | NULL     | —                   | Added in migration 20250108001  |
| `preferred_days`    | TEXT[]      | NULL     | —                   | Added in migration 20250108     |
| `created_at`        | TIMESTAMPTZ | NOT NULL | `now()`             |                                 |

**Indexes:** None custom (PK only).
**RLS:** Public insert (anon + authenticated); authenticated read/update/delete.

---

### 3. `magnet_leads`  _(referred to as "leads" in migration target)_

Contacts captured from lead-magnet pages (Vibe Coding guide, etc.).

| Column       | Type        | Nullable | Default             | Notes                                     |
|--------------|-------------|----------|---------------------|--------------------------------------------|
| `id`         | UUID        | NOT NULL | `gen_random_uuid()` | PK                                         |
| `email`      | TEXT        | NULL     | —                   | Optional if `whatsapp` provided            |
| `whatsapp`   | TEXT        | NULL     | —                   | Optional if `email` provided               |
| `source`     | TEXT        | NOT NULL | `'Vibe Coding'`     | Lead-magnet source tag                     |
| `created_at` | TIMESTAMPTZ | NOT NULL | `now()`             |                                            |

**Constraint:** `CHECK (email IS NOT NULL OR whatsapp IS NOT NULL)` — at least one contact method.
**Indexes:** `idx_magnet_leads_source`, `idx_magnet_leads_created_at DESC`, partial indexes on `email` and `whatsapp`.
**RLS:** Public insert; authenticated read/update/delete.

---

### 4. `contact_messages`

| Column       | Type        | Nullable | Default             |
|--------------|-------------|----------|---------------------|
| `id`         | UUID        | NOT NULL | `gen_random_uuid()` |
| `name`       | TEXT        | NOT NULL | —                   |
| `email`      | TEXT        | NOT NULL | —                   |
| `phone`      | TEXT        | NULL     | —                   |
| `message`    | TEXT        | NOT NULL | —                   |
| `is_read`    | BOOLEAN     | NOT NULL | `false`             |
| `created_at` | TIMESTAMPTZ | NOT NULL | `now()`             |

---

### 5. `newsletter_subscribers`

| Column                 | Type        | Nullable | Default             |
|------------------------|-------------|----------|---------------------|
| `id`                   | UUID        | NOT NULL | `gen_random_uuid()` |
| `email`                | TEXT        | NOT NULL | —                   |
| `name`                 | TEXT        | NULL     | —                   |
| `interested_in_webinar`| BOOLEAN     | NOT NULL | `false`             |
| `created_at`           | TIMESTAMPTZ | NOT NULL | `now()`             |

---

### 6. `valuation_submissions`

| Column                        | Type        | Nullable | Default             | Notes                  |
|-------------------------------|-------------|----------|---------------------|------------------------|
| `id`                          | UUID        | NOT NULL | `gen_random_uuid()` | PK                     |
| `mrr`                         | NUMERIC     | NOT NULL | —                   | Monthly Recurring Rev  |
| `growth_rate`                 | NUMERIC     | NOT NULL | —                   |                        |
| `industry`                    | TEXT        | NOT NULL | —                   |                        |
| `investment_amount`           | NUMERIC     | NOT NULL | —                   |                        |
| `base_valuation`              | NUMERIC     | NOT NULL | —                   | Calculated             |
| `growth_adjusted_valuation`   | NUMERIC     | NOT NULL | —                   | Calculated             |
| `post_money_valuation`        | NUMERIC     | NOT NULL | —                   | Calculated             |
| `dilution_percent`            | NUMERIC     | NOT NULL | —                   | Calculated             |
| `lead_id`                     | UUID        | NULL     | —                   | FK → magnet_leads(id)  |
| `created_at`                  | TIMESTAMPTZ | NOT NULL | `now()`             |                        |

**FK:** `fk_valuation_submissions_lead` → `magnet_leads(id)`

---

### 7. `visitor_analytics`

| Column        | Type        | Nullable | Default             |
|---------------|-------------|----------|---------------------|
| `id`          | UUID        | NOT NULL | `gen_random_uuid()` |
| `session_id`  | TEXT        | NOT NULL | —                   |
| `page_path`   | TEXT        | NOT NULL | —                   |
| `referrer`    | TEXT        | NULL     | —                   |
| `user_agent`  | TEXT        | NULL     | —                   |
| `ip_hash`     | TEXT        | NULL     | —                   |
| `device_type` | TEXT        | NULL     | —                   |
| `country`     | TEXT        | NULL     | —                   |
| `created_at`  | TIMESTAMPTZ | NOT NULL | `now()`             |
| `updated_at`  | TIMESTAMPTZ | NOT NULL | `now()`             |

---

### 8. `user_roles`

| Column       | Type        | Nullable | Default             | Notes                                    |
|--------------|-------------|----------|---------------------|------------------------------------------|
| `id`         | UUID        | NOT NULL | `gen_random_uuid()` | PK                                       |
| `user_id`    | TEXT        | NOT NULL | —                   | References `auth.users` (Supabase Auth)  |
| `role`       | `app_role`  | NOT NULL | —                   | Enum: super_admin, admin, moderator      |
| `created_at` | TIMESTAMPTZ | NOT NULL | `now()`             |                                          |

---

### 9. `weeks`

| Column               | Type          | Nullable | Default             |
|----------------------|---------------|----------|---------------------|
| `id`                 | UUID          | NOT NULL | `gen_random_uuid()` |
| `week_number`        | INTEGER       | NOT NULL | —                   |
| `title`              | TEXT          | NOT NULL | —                   |
| `description`        | TEXT          | NOT NULL | —                   |
| `phase`              | `phase_type`  | NOT NULL | —                   |
| `activities_visible` | BOOLEAN       | NULL     | —                   |
| `created_at`         | TIMESTAMPTZ   | NOT NULL | `now()`             |
| `updated_at`         | TIMESTAMPTZ   | NOT NULL | `now()`             |

**Constraint:** `week_number >= 1 AND week_number <= 8`, `UNIQUE(week_number)`

---

### 10. `week_activities`

| Column          | Type            | Nullable | Default             |
|-----------------|-----------------|----------|---------------------|
| `id`            | UUID            | NOT NULL | `gen_random_uuid()` |
| `week_id`       | UUID            | NOT NULL | FK → weeks(id) CASCADE |
| `activity_type` | `activity_type` | NOT NULL | —                   |
| `title`         | TEXT            | NOT NULL | —                   |
| `description`   | TEXT            | NOT NULL | —                   |
| `duration`      | TEXT            | NOT NULL | —                   |
| `order_index`   | INTEGER         | NOT NULL | `0`                 |
| `created_at`    | TIMESTAMPTZ     | NOT NULL | `now()`             |
| `updated_at`    | TIMESTAMPTZ     | NOT NULL | `now()`             |

---

### 11. `week_skills`

| Column       | Type        | Nullable | Default             |
|--------------|-------------|----------|---------------------|
| `id`         | UUID        | NOT NULL | `gen_random_uuid()` |
| `week_id`    | UUID        | NOT NULL | FK → weeks(id) CASCADE |
| `skill_name` | TEXT        | NOT NULL | —                   |
| `order_index`| INTEGER     | NOT NULL | `0`                 |
| `created_at` | TIMESTAMPTZ | NOT NULL | `now()`             |

---

### 12. `week_outcomes`

| Column        | Type        | Nullable | Default             |
|---------------|-------------|----------|---------------------|
| `id`          | UUID        | NOT NULL | `gen_random_uuid()` |
| `week_id`     | UUID        | NOT NULL | FK → weeks(id) CASCADE |
| `outcome_text`| TEXT        | NOT NULL | —                   |
| `created_at`  | TIMESTAMPTZ | NOT NULL | `now()`             |
| `updated_at`  | TIMESTAMPTZ | NOT NULL | `now()`             |

---

## Database Functions

| Function   | Args                    | Returns  | Purpose                           |
|------------|-------------------------|----------|-----------------------------------|
| `has_role` | `_user_id`, `_role`     | BOOLEAN  | Check if user has specific role   |
| `is_admin` | `_user_id`              | BOOLEAN  | Check if user is any admin role   |

---

## Migration Priority for Convex

### Phase 1 — Core Tables (this migration)
- **`founders`** → `founders`
- **`waiting_list`** → `waitingList`
- **`magnet_leads`** → `leads`

### Phase 2 — Supporting Tables
- `contact_messages` → `contactMessages`
- `newsletter_subscribers` → `newsletterSubscribers`
- `valuation_submissions` → `valuationSubmissions`

### Phase 3 — Content & Admin
- `weeks`, `week_activities`, `week_skills`, `week_outcomes`
- `user_roles` (requires Convex Auth strategy)
- `visitor_analytics`

---

## Key Differences: Supabase → Convex

| Supabase Concept           | Convex Equivalent                                    |
|----------------------------|------------------------------------------------------|
| UUID `id` (PK)             | `_id` (system field, auto-generated)                 |
| `created_at` TIMESTAMPTZ   | `_creationTime` (system field, auto-generated)       |
| `updated_at` TIMESTAMPTZ   | Custom `updatedAt: v.number()` field                 |
| `TEXT[]` (Postgres array)  | `v.array(v.string())`                                |
| ENUMs                      | `v.union(v.literal(...), ...)`                       |
| Foreign Key UUID           | `v.id("tableName")`                                  |
| RLS Policies               | Convex function-level auth checks                    |
| `CHECK` constraints        | Validated in mutation functions                       |
| Partial indexes            | Convex `.index()` on table definition                |
| `snake_case` columns       | `camelCase` fields (Convex/JS convention)            |
