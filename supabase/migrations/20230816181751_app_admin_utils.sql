CREATE OR REPLACE FUNCTION app_admin_get_user_id_by_email (emailArg text) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE v_user_id uuid;
BEGIN IF CURRENT_ROLE NOT IN (
  'service_role',
  'supabase_admin',
  'dashboard_user',
  'postgres'
) THEN RAISE EXCEPTION 'Only service_role, supabase_admin, dashboard_user, postgres can execute this function';
END IF;

SELECT id INTO v_user_id
FROM auth.users
WHERE LOWER(email) = LOWER(emailArg);

  RETURN v_user_id;
END;
$$;

REVOKE ALL ON FUNCTION public.app_admin_get_user_id_by_email(text)
FROM PUBLIC;
REVOKE ALL ON FUNCTION public.app_admin_get_user_id_by_email(text)
FROM ANON;
REVOKE ALL ON FUNCTION public.app_admin_get_user_id_by_email(text)
FROM AUTHENTICATED;


CREATE OR REPLACE FUNCTION public.check_if_authenticated_user_owns_email(email character varying) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER AS $function$ BEGIN -- Check if the email exists in the auth.users table and if the id column matches the auth.uid() function
  IF EXISTS (
    SELECT *
    FROM auth.users
    WHERE (
        auth.users.email = $1
        OR LOWER(auth.users.email) = LOWER($1)
      )
      AND id = auth.uid()
  ) THEN RETURN TRUE;
ELSE RETURN false;
END IF;
END;
$function$;

REVOKE ALL ON FUNCTION public.check_if_authenticated_user_owns_email
FROM PUBLIC;
REVOKE ALL ON FUNCTION public.check_if_authenticated_user_owns_email
FROM ANON;