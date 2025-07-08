# Database Migration Required

To enable the Activities visibility toggle feature, you need to run this SQL migration in your Supabase SQL editor:

## Step 1: Add the activities_visible column

```sql
ALTER TABLE weeks 
ADD COLUMN activities_visible BOOLEAN DEFAULT true;
```

## Step 2: Set default values for existing weeks

```sql
UPDATE weeks 
SET activities_visible = true 
WHERE activities_visible IS NULL;
```

## How to apply:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Paste the SQL commands above
4. Click "Run" to execute

After running this migration, the Activities visibility toggle will work as expected.

## Temporary Solution

Until the migration is applied, the toggle will use localStorage to persist the visibility state locally in the browser. This means:
- Each admin's settings are stored locally
- Settings don't persist across devices/browsers
- Once the database migration is applied, the feature will work globally

## Verification

After applying the migration, you can verify it worked by checking the weeks table structure in Supabase - it should now include an `activities_visible` column.