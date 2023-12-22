-- Get invited organizations for user v2
-- This function is used to get all organizations that a user has been invited to
CREATE OR REPLACE FUNCTION public.get_invited_organizations_for_user_v2(user_id uuid, user_email character varying) RETURNS TABLE(organization_id uuid) LANGUAGE plpgsql SECURITY DEFINER AS $function$ BEGIN IF (user_id IS NULL)
  AND (
    user_email IS NULL
    OR user_email = ''
  ) THEN RETURN QUERY
SELECT id
FROM organizations
WHERE 1 = 0;
END IF;
RETURN QUERY
SELECT o.id AS organization_id
FROM organizations o
  JOIN organization_join_invitations oti ON o.id = oti.organization_id
WHERE (
    (
      (
        (
          oti.invitee_user_email = user_email
          OR oti.invitee_user_email ilike concat('%', user_email, '%')
        )
      )
      OR (oti.invitee_user_id = user_id)
    )
    AND (oti.status = 'active')
  );
END;
$function$;
-- Get organization of a team
-- This function is used to get an organization of a team
CREATE OR REPLACE FUNCTION public.get_organization_id_by_team_id(p_id integer) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER AS $function$
DECLARE v_organization_id UUID;
BEGIN
SELECT organization_id INTO v_organization_id
FROM teams
WHERE id = p_id;
RETURN v_organization_id;
EXCEPTION
WHEN NO_DATA_FOUND THEN RAISE EXCEPTION 'No organization found for the provided id: %',
p_id;
END;
$function$;
CREATE OR REPLACE FUNCTION public.get_organization_id_by_team_id(p_id bigint) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER AS $function$
DECLARE v_organization_id UUID;
BEGIN
SELECT organization_id INTO v_organization_id
FROM teams
WHERE id = p_id;
RETURN v_organization_id;
EXCEPTION
WHEN NO_DATA_FOUND THEN RAISE EXCEPTION 'No organization found for the provided id: %',
p_id;
END;
$function$;

-- Get organizations for user
-- This function is used to get all organizations that a user is a member of
CREATE OR REPLACE FUNCTION public.get_organizations_for_user(user_id uuid) RETURNS TABLE(organization_id uuid) LANGUAGE plpgsql SECURITY DEFINER AS $function$ BEGIN RETURN QUERY
SELECT o.id AS organization_id
FROM organizations o
  JOIN organization_members ot ON o.id = ot.organization_id
WHERE ot.member_id = user_id;
END;
$function$;
-- Get project admins of a team
-- This function is used to get all admins of a team
CREATE OR REPLACE FUNCTION public.get_team_admins_by_team_id(team_id bigint) RETURNS TABLE(user_id uuid) LANGUAGE plpgsql SECURITY DEFINER AS $function$ BEGIN RETURN QUERY
SELECT team_members.user_id
FROM team_members
WHERE team_members.team_id = $1
  AND role = 'admin';
END;
$function$;
-- Get project members of a team
-- This function is used to get all members of a team
CREATE OR REPLACE FUNCTION public.get_team_members_team_id(team_id bigint) RETURNS TABLE(user_id uuid) LANGUAGE plpgsql SECURITY DEFINER AS $function$ BEGIN RETURN QUERY
SELECT team_members.user_id
FROM team_members
WHERE team_members.team_id = $1;
END;
$function$;
-- Add credits to an organization on creation
-- This function is used to add credits to an organization when it is created
CREATE OR REPLACE FUNCTION public.handle_organization_created_add_credits() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $function$ BEGIN
INSERT INTO public.organization_credits (organization_id)
VALUES (NEW.id);
RETURN NEW;
END;
$function$;
-- Increment credits for an organization
-- This function is used to increment credits for an organization
CREATE OR REPLACE FUNCTION public.increment_credits(org_id uuid, amount integer) RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $function$ BEGIN -- Decrement the credits column by the specified amount
UPDATE organization_credits
SET credits = credits + amount
WHERE organization_id = org_id;
END;
$function$;

CREATE OR REPLACE FUNCTION get_organization_id_for_project_id(project_id UUID) RETURNS UUID AS $$
DECLARE org_id UUID;
BEGIN
SELECT p.organization_id INTO org_id
FROM projects p
WHERE p.id = project_id;
RETURN org_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_team_id_for_project_id(project_id UUID) RETURNS INT8 AS $$
DECLARE team_id INT8;
BEGIN
SELECT p.team_id INTO team_id
FROM projects p
WHERE p.id = project_id;
RETURN team_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;