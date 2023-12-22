-- Grant usage on the schema
GRANT USAGE ON SCHEMA auth TO service_role;

-- Grant select on all tables in the auth schema
DO $$
DECLARE tt text;
BEGIN FOR tt IN (
  SELECT table_name
  FROM information_schema.tables
  WHERE table_schema = 'auth'
) LOOP EXECUTE 'GRANT SELECT ON auth.' || tt || ' TO service_role';
END LOOP;
END $$;

DO $$
DECLARE r RECORD;
BEGIN FOR r IN (
  SELECT rolname
  FROM pg_roles
  WHERE rolname <> 'service_role'
) LOOP EXECUTE format(
  'REVOKE EXECUTE ON FUNCTION make_user_app_admin FROM %I',
  r.rolname
);
EXECUTE format(
  'REVOKE EXECUTE ON FUNCTION remove_app_admin_privilege_for_user FROM %I',
  r.rolname
);
EXECUTE format(
  'REVOKE EXECUTE ON FUNCTION app_admin_get_all_organizations FROM %I',
  r.rolname
);
EXECUTE format(
  'REVOKE EXECUTE ON FUNCTION app_admin_get_all_users FROM %I',
  r.rolname
);
EXECUTE format(
  'REVOKE EXECUTE ON FUNCTION app_admin_get_organizations_created_per_month FROM %I',
  r.rolname
);
EXECUTE format(
  'REVOKE EXECUTE ON FUNCTION app_admin_get_projects_created_per_month FROM %I',
  r.rolname
);
EXECUTE format(
  'REVOKE EXECUTE ON FUNCTION app_admin_get_recent_30_day_signin_count FROM %I',
  r.rolname
);
EXECUTE format(
  'REVOKE EXECUTE ON FUNCTION app_admin_get_total_organization_count FROM %I',
  r.rolname
);
EXECUTE format(
  'REVOKE EXECUTE ON FUNCTION app_admin_get_total_project_count FROM %I',
  r.rolname
);
EXECUTE format(
  'REVOKE EXECUTE ON FUNCTION app_admin_get_total_user_count FROM %I',
  r.rolname
);
EXECUTE format(
  'REVOKE EXECUTE ON FUNCTION app_admin_get_users_created_per_month FROM %I',
  r.rolname
);
END LOOP;
END;
$$;