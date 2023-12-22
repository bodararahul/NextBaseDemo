-- SET check_function_bodies = off;
-- SET default_tablespace = '';
-- SET default_table_access_method = "heap";
--
-- Name: organization_members; Type: TABLE; Schema: public; Owner: postgres
--
--  Get all organizations
--  This function is used to get all organizations
-- Create or replace a function named check_if_user_is_app_admin
CREATE OR REPLACE FUNCTION public.check_if_user_is_app_admin (user_id uuid) -- Returns a boolean value
  RETURNS boolean -- Written in plpgsql language
  language plpgsql -- Set the security definer
  SECURITY DEFINER AS $function$ -- Begin the function
  BEGIN -- Check if the given user ID exists in the app_admins table
  -- Return true if the user is a super admin
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = user_id
      AND auth.users.is_super_admin = TRUE
  );
-- End the function
END;
$function$;


CREATE OR REPLACE FUNCTION public.app_admin_get_all_organizations(
    search_query character varying DEFAULT ''::character varying,
    PAGE integer DEFAULT 1,
    page_size integer DEFAULT 20
  ) RETURNS TABLE(
    id uuid,
    created_at timestamp WITH time zone,
    title character varying,
    team_members_count bigint,
    owner_full_name character varying,
    owner_email character varying,
    credits bigint
  ) AS $function$ BEGIN IF CURRENT_ROLE <> 'service_role' THEN RAISE EXCEPTION 'Only service_role can execute this function';
END IF;
RETURN QUERY WITH team_member_counts AS (
  SELECT organization_id,
    COUNT(*) AS COUNT
  FROM public.organization_members
  GROUP BY organization_id
)
SELECT DISTINCT ON (p."id") p."id",
  p."created_at",
  p."title",
  tmc."count" AS "team_members_count",
  up."full_name" AS "owner_full_name",
  au."email" AS "owner_email",
  oc."credits"
FROM "public"."organizations" p
  INNER JOIN team_member_counts tmc ON p."id" = tmc."organization_id"
  INNER JOIN "public"."organization_members" owner_team_member ON p."id" = owner_team_member."organization_id"
  AND owner_team_member."member_role" = 'owner'::"public"."organization_member_role"
  INNER JOIN "public"."organization_credits" oc ON p."id" = oc."organization_id"
  INNER JOIN "public"."user_profiles" up ON owner_team_member."member_id" = up."id"
  INNER JOIN "auth"."users" au ON owner_team_member."member_id" = au."id"
WHERE p."id"::TEXT = search_query
  OR p."title" ILIKE '%' || search_query || '%'
  OR up."full_name" ILIKE '%' || search_query || '%'
  OR au."email" ILIKE '%' || search_query || '%'
ORDER BY p."id",
  p."created_at" DESC OFFSET (PAGE - 1) * page_size
LIMIT page_size;
END;
$function$ LANGUAGE plpgsql;
-- Get all users
-- This function is used by the app admin to get all users
CREATE OR REPLACE VIEW public.app_admin_all_users AS
SELECT u.id,
  u.email,
  u.created_at,
  u.updated_at,
  user_profiles.full_name,
  user_profiles.avatar_url,
  public.check_if_user_is_app_admin(u.id) AS is_app_admin,
  u.confirmed_at,
  CASE
    WHEN u.confirmed_at IS NOT NULL THEN TRUE
    ELSE false
  END AS is_confirmed,
  u.last_sign_in_at
FROM auth.users AS u
  JOIN public.user_profiles ON u.id = user_profiles.id
WHERE (
    CURRENT_USER = 'service_role'
    OR CURRENT_USER = 'supabase_admin'
    OR CURRENT_USER = 'postgres'
    OR HAS_TABLE_PRIVILEGE(CURRENT_USER, 'auth.users', 'SELECT')
  );
;

CREATE OR REPLACE FUNCTION public.app_admin_get_all_users(
    search_query character varying DEFAULT ''::character varying,
    PAGE integer DEFAULT 1,
    page_size integer DEFAULT 20
  ) RETURNS TABLE(
    id uuid,
    email character varying,
    created_at timestamp WITH time zone,
    updated_at timestamp WITH time zone,
    full_name character varying,
    avatar_url character varying,
    is_app_admin boolean,
    confirmed_at timestamp WITH time zone,
    is_confirmed boolean,
    last_sign_in_at timestamp WITH time zone
  ) AS $$ BEGIN IF CURRENT_ROLE NOT IN (
    'service_role',
    'supabase_admin',
    'dashboard_user',
    'postgres'
  ) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
RETURN QUERY
SELECT *
FROM public.app_admin_all_users
WHERE (
    app_admin_all_users.id::TEXT = search_query
    OR app_admin_all_users.email ILIKE '%' || search_query || '%'
    OR app_admin_all_users.full_name ILIKE '%' || search_query || '%'
  )
ORDER BY app_admin_all_users.created_at DESC OFFSET (PAGE - 1) * page_size
LIMIT page_size;
END;
$$ LANGUAGE plpgsql;

-- Decrement credits
-- This function is used to decrement credits for an organization
CREATE OR REPLACE FUNCTION public.decrement_credits(org_id uuid, amount integer) RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $function$ BEGIN -- Decrement the credits column by the specified amount
UPDATE organization_credits
SET credits = credits - amount
WHERE organization_id = org_id;
END;
$function$;
