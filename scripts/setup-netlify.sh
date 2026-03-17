#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────
# Mentorna — Netlify Setup Script
# ──────────────────────────────────────────────────────────────
# Usage:
#   1. Log in:  netlify login
#   2. Run:     bash scripts/setup-netlify.sh
#
# Or pass a token directly:
#   NETLIFY_AUTH_TOKEN=nfp_xxx bash scripts/setup-netlify.sh
# ──────────────────────────────────────────────────────────────
set -euo pipefail

SITE_NAME="mentorna"
PROD_BRANCH="master"
DEV_BRANCH="develop"

# ── Colors ──
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}✓${NC} $*"; }
warn() { echo -e "${YELLOW}⚠${NC} $*"; }
err()  { echo -e "${RED}✗${NC} $*" >&2; }

# ── 1. Check Auth ──
echo ""
echo "═══════════════════════════════════════════════════"
echo "  Mentorna — Netlify Deployment Setup"
echo "═══════════════════════════════════════════════════"
echo ""

if ! netlify status &>/dev/null && [ -z "${NETLIFY_AUTH_TOKEN:-}" ]; then
  err "Not logged in to Netlify."
  echo "  Run 'netlify login' first, or set NETLIFY_AUTH_TOKEN."
  exit 1
fi
log "Netlify authentication verified."

# ── 2. Create / Link Site ──
if [ -f .netlify/state.json ]; then
  SITE_ID=$(python3 -c "import json; print(json.load(open('.netlify/state.json'))['siteId'])" 2>/dev/null || echo "")
  if [ -n "$SITE_ID" ]; then
    log "Site already linked: $SITE_ID"
  fi
else
  echo ""
  warn "No site linked. Creating new site: $SITE_NAME"
  netlify sites:create --name "$SITE_NAME" --manual 2>/dev/null || true
  netlify link --name "$SITE_NAME"
  SITE_ID=$(python3 -c "import json; print(json.load(open('.netlify/state.json'))['siteId'])" 2>/dev/null || echo "")
  log "Site created and linked: $SITE_ID"
fi

# ── 3. Configure Branch Deploys ──
echo ""
echo "Configuring branch deploys..."
echo "  Production branch: $PROD_BRANCH"
echo "  Branch deploy:     $DEV_BRANCH"
echo ""

# The netlify.toml handles build config; branch deploys need to be enabled
# via the Netlify API or dashboard. We'll use the API if a token is available.

if [ -n "${NETLIFY_AUTH_TOKEN:-}" ]; then
  AUTH="$NETLIFY_AUTH_TOKEN"
elif [ -f ~/.config/netlify/config.json ]; then
  AUTH=$(python3 -c "
import json
cfg = json.load(open('$HOME/.config/netlify/config.json'))
print(cfg.get('users', {}).get(list(cfg.get('users', {}).keys())[0], {}).get('auth', {}).get('token', ''))
" 2>/dev/null || echo "")
fi

if [ -n "${AUTH:-}" ] && [ -n "${SITE_ID:-}" ]; then
  # Enable branch deploys for 'develop'
  curl -s -X PATCH "https://api.netlify.com/api/v1/sites/$SITE_ID" \
    -H "Authorization: Bearer $AUTH" \
    -H "Content-Type: application/json" \
    -d "{
      \"repo\": {
        \"branch\": \"$PROD_BRANCH\",
        \"allowed_branches\": [\"$DEV_BRANCH\"]
      },
      \"branch_deploy_custom_domain\": null
    }" > /dev/null 2>&1 && log "Branch deploy config updated via API." || warn "API update failed — configure manually in dashboard."
else
  warn "Cannot auto-configure branch deploys (no API token available)."
  echo "  → Go to: https://app.netlify.com/sites/$SITE_NAME/configuration/deploys"
  echo "  → Set Production branch: $PROD_BRANCH"
  echo "  → Under Branch deploys, add: $DEV_BRANCH"
fi

# ── 4. Set Environment Variables ──
echo ""
echo "Setting environment variables..."

# Read from .env file
if [ -f .env ]; then
  while IFS='=' read -r key value; do
    # Skip comments and empty lines
    [[ "$key" =~ ^#.*$ || -z "$key" ]] && continue
    # Remove surrounding quotes
    value=$(echo "$value" | sed 's/^"//;s/"$//')
    if [ -n "$value" ]; then
      netlify env:set "$key" "$value" --scope builds 2>/dev/null && \
        log "Set $key (both contexts)" || \
        warn "Failed to set $key"
    fi
  done < .env
else
  warn "No .env file found. Set variables manually:"
  echo "  netlify env:set VITE_SUPABASE_URL <value>"
  echo "  netlify env:set VITE_SUPABASE_PUBLISHABLE_KEY <value>"
  echo "  netlify env:set VITE_CONVEX_URL <value>  (develop only)"
fi

# ── 5. Deploy Production (master) ──
echo ""
echo "═══════════════════════════════════════════════════"
echo "  Ready to deploy!"
echo "═══════════════════════════════════════════════════"
echo ""
echo "  Deploy production (master):"
echo "    git checkout master && netlify deploy --prod"
echo ""
echo "  Deploy development (develop):"
echo "    git checkout develop && netlify deploy --alias develop"
echo ""
echo "  Or push to a Git remote and let Netlify CI handle it."
echo ""

# ── 6. Show URLs ──
if [ -n "${SITE_ID:-}" ]; then
  echo "═══════════════════════════════════════════════════"
  echo "  Netlify URLs"
  echo "═══════════════════════════════════════════════════"
  echo ""
  echo "  Production:  https://$SITE_NAME.netlify.app"
  echo "  Development: https://develop--$SITE_NAME.netlify.app"
  echo "  Dashboard:   https://app.netlify.com/sites/$SITE_NAME"
  echo ""
fi

log "Setup complete!"
