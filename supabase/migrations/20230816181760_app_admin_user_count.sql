CREATE OR REPLACE FUNCTION public.app_admin_get_all_users_count(
    search_query character varying DEFAULT ''::character varying
  ) RETURNS integer AS $$ BEGIN IF CURRENT_ROLE NOT IN (
    'service_role',
    'supabase_admin',
    'dashboard_user',
    'postgres'
  ) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
RETURN (
  SELECT COUNT(*)
  FROM public.app_admin_all_users
  WHERE (
      app_admin_all_users.id::TEXT = search_query
      OR app_admin_all_users.email ILIKE '%' || search_query || '%'
      OR app_admin_all_users.full_name ILIKE '%' || search_query || '%'
    )
);
END;
$$ LANGUAGE plpgsql;
REVOKE ALL ON FUNCTION public.app_admin_get_all_users_count
FROM PUBLIC;
REVOKE ALL ON FUNCTION public.app_admin_get_all_users_count
FROM ANON;
REVOKE ALL ON FUNCTION public.app_admin_get_all_users_count
FROM AUTHENTICATED;


CREATE OR REPLACE FUNCTION public.app_admin_get_all_organizations_count (
    search_query character varying DEFAULT ''::character varying
  ) RETURNS bigint AS $function$ BEGIN IF CURRENT_ROLE NOT IN (
    'service_role',
    'supabase_admin',
    'dashboard_user',
    'postgres'
  ) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;
RETURN (
  SELECT COUNT(*)
  FROM public.organizations p
    INNER JOIN public.organization_members owner_team_member ON p.id = owner_team_member.organization_id
    AND owner_team_member.member_role = 'owner'::public.organization_member_role
    INNER JOIN public.user_profiles up ON owner_team_member.member_id = up.id
    INNER JOIN app_admin_all_users au ON owner_team_member.member_id = au.id
  WHERE p.id::TEXT = search_query
    OR p.title ILIKE '%' || search_query || '%'
    OR up.full_name ILIKE '%' || search_query || '%'
    OR au.email ILIKE '%' || search_query || '%'
);
END;
$function$ language plpgsql;

REVOKE ALL ON FUNCTION public.app_admin_get_all_organizations_count
FROM PUBLIC;

REVOKE ALL ON FUNCTION public.app_admin_get_all_organizations_count
FROM ANON;

REVOKE ALL ON FUNCTION public.app_admin_get_all_organizations_count
FROM AUTHENTICATED;
