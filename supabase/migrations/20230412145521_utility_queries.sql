CREATE OR REPLACE FUNCTION get_organizations_for_user(user_id UUID) RETURNS TABLE (organization_id UUID) AS $$ BEGIN RETURN QUERY
SELECT o.id AS organization_id
FROM organizations o
  JOIN organization_members ot ON o.id = ot.organization_id
WHERE ot.member_id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
