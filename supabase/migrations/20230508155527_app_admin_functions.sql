CREATE OR REPLACE FUNCTION app_admin_get_users_created_per_month() RETURNS TABLE(MONTH DATE, number_of_users INTEGER) AS $$ BEGIN IF CURRENT_ROLE NOT IN (
    'service_role',
    'supabase_admin',
    'dashboard_user',
    'postgres'
  ) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
CREATE TEMPORARY TABLE temp_result (MONTH DATE, number_of_users INTEGER) ON COMMIT DROP;

  WITH date_series AS (
  SELECT DATE_TRUNC('MONTH', dd)::DATE AS MONTH
  FROM generate_series(
      DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1 YEAR'),
      DATE_TRUNC('MONTH', CURRENT_DATE),
      '1 MONTH'::INTERVAL
    ) dd
),
user_counts AS (
  SELECT DATE_TRUNC('MONTH', created_at)::DATE AS MONTH,
    COUNT(*) AS user_count
  FROM public.user_profiles
  WHERE created_at >= CURRENT_DATE - INTERVAL '1 YEAR'
  GROUP BY MONTH
)
INSERT INTO temp_result
SELECT date_series.month,
  COALESCE(user_counts.user_count, 0)
FROM date_series
  LEFT JOIN user_counts ON date_series.month = user_counts.month
ORDER BY date_series.month;

  RETURN QUERY
SELECT *
FROM temp_result;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION app_admin_get_total_user_count() RETURNS INTEGER AS $$
DECLARE user_count INTEGER;
BEGIN IF CURRENT_ROLE NOT IN (
  'service_role',
  'supabase_admin',
  'dashboard_user',
  'postgres'
) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
SELECT COUNT(*) INTO user_count
FROM public.user_profiles;
RETURN user_count;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION app_admin_get_recent_30_day_signin_count() RETURNS INTEGER AS $$
DECLARE signin_count INTEGER;
BEGIN IF CURRENT_ROLE NOT IN (
  'service_role',
  'supabase_admin',
  'dashboard_user',
  'postgres'
) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
SELECT COUNT(*) INTO signin_count
FROM public.app_admin_all_users
WHERE last_sign_in_at >= CURRENT_DATE - INTERVAL '30 DAYS';

    RETURN signin_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION app_admin_get_projects_created_per_month() RETURNS TABLE(MONTH DATE, number_of_projects INTEGER) AS $$ BEGIN IF CURRENT_ROLE NOT IN (
    'service_role',
    'supabase_admin',
    'dashboard_user',
    'postgres'
  ) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
CREATE TEMPORARY TABLE temp_result (MONTH DATE, number_of_projects INTEGER) ON COMMIT DROP;

  WITH date_series AS (
  SELECT DATE_TRUNC('MONTH', dd)::DATE AS MONTH
  FROM generate_series(
      DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1 YEAR'),
      DATE_TRUNC('MONTH', CURRENT_DATE),
      '1 MONTH'::INTERVAL
    ) dd
),
project_counts AS (
  SELECT DATE_TRUNC('MONTH', created_at)::DATE AS MONTH,
    COUNT(*) AS project_count
  FROM public.projects
  WHERE created_at >= CURRENT_DATE - INTERVAL '1 YEAR'
  GROUP BY MONTH
)
INSERT INTO temp_result
SELECT date_series.month,
  COALESCE(project_counts.project_count, 0)
FROM date_series
  LEFT JOIN project_counts ON date_series.month = project_counts.month
ORDER BY date_series.month;

  RETURN QUERY
SELECT *
FROM temp_result;
END;
$$ LANGUAGE plpgsql;


-- Function to get the total number of organizations
CREATE OR REPLACE FUNCTION app_admin_get_total_organization_count() RETURNS INTEGER AS $$
DECLARE org_count INTEGER;
BEGIN IF CURRENT_ROLE NOT IN (
  'service_role',
  'supabase_admin',
  'dashboard_user',
  'postgres'
) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
SELECT COUNT(*) INTO org_count
FROM public.organizations;
RETURN org_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get the total number of projects
CREATE OR REPLACE FUNCTION app_admin_get_total_project_count() RETURNS INTEGER AS $$
DECLARE proj_count INTEGER;
BEGIN IF CURRENT_ROLE NOT IN (
  'service_role',
  'supabase_admin',
  'dashboard_user',
  'postgres'
) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
SELECT COUNT(*) INTO proj_count
FROM public.projects;
RETURN proj_count;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION app_admin_get_organizations_created_per_month() RETURNS TABLE(MONTH DATE, number_of_organizations INTEGER) AS $$ BEGIN IF CURRENT_ROLE NOT IN (
    'service_role',
    'supabase_admin',
    'dashboard_user',
    'postgres'
  ) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
CREATE TEMPORARY TABLE temp_result (MONTH DATE, number_of_organizations INTEGER) ON COMMIT DROP;

  WITH date_series AS (
  SELECT DATE_TRUNC('MONTH', dd)::DATE AS MONTH
  FROM generate_series(
      DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1 YEAR'),
      DATE_TRUNC('MONTH', CURRENT_DATE),
      '1 MONTH'::INTERVAL
    ) dd
),
organization_counts AS (
  SELECT DATE_TRUNC('MONTH', created_at)::DATE AS MONTH,
    COUNT(*) AS organization_count
  FROM public.organizations
  WHERE created_at >= CURRENT_DATE - INTERVAL '1 YEAR'
  GROUP BY MONTH
)
INSERT INTO temp_result
SELECT date_series.month,
  COALESCE(organization_counts.organization_count, 0)
FROM date_series
  LEFT JOIN organization_counts ON date_series.month = organization_counts.month
ORDER BY date_series.month;

  RETURN QUERY
SELECT *
FROM temp_result;
END;
$$ LANGUAGE plpgsql;
