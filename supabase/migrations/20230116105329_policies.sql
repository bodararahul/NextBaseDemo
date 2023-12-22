--
-- Name: products Active products are visible to everyone; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Active products are visible to everyone" ON "public"."products" FOR
SELECT USING (("active" = TRUE));
--
-- Name: organizations All authenticated users can create organizations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "All authenticated users can create organizations" ON "public"."organizations" FOR
INSERT TO "authenticated" WITH CHECK ("public"."is_app_not_in_maintenance_mode"());
--
-- Name: organizations All organization members can read organizations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "All organization members can read organizations" ON "public"."organizations" FOR
SELECT TO "authenticated" USING (
    (
      ("auth"."uid"() = "created_by")
      OR (
        "auth"."uid"() IN (
          SELECT "public"."get_organization_member_ids"("organizations"."id") AS "get_organization_member_ids"
        )
      )
    )
  );
--
-- Name: organizations All organization members can update organizations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "All organization members can update organizations" ON "public"."organizations" FOR
UPDATE TO "authenticated" USING (
    (
      (
        "auth"."uid"() IN (
          SELECT "public"."get_organization_member_ids"("organizations"."id") AS "get_organization_member_ids"
        )
      )
      AND "public"."is_app_not_in_maintenance_mode"()
    )
  );
--
-- Name: user_profiles Any organization mate can view a user's public profile ; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Any organization mate can view a user's public profile " ON "public"."user_profiles" FOR
SELECT TO "authenticated" USING (
    (
      EXISTS (
        SELECT 1
        FROM "public"."organization_members"
        WHERE (
            (
              "organization_members"."member_id" = "auth"."uid"()
            )
            AND (
              "organization_members"."organization_id" IN (
                SELECT "organization_members_1"."organization_id" AS "organization_id"
                FROM "public"."organization_members" "organization_members_1"
                WHERE (
                    "organization_members_1"."member_id" = "user_profiles"."id"
                  )
              )
            )
          )
      )
    )
  );
--
-- Name: organization_join_invitations Anyone can view; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Anyone can view" ON "public"."organization_join_invitations" FOR
SELECT USING (TRUE);
--
-- Name: app_settings Enable read access for all users; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable read access for all users" ON "public"."app_settings" FOR
SELECT USING (TRUE);
--
-- Name: subscriptions Everyone organization member can view the subscription on  organization; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Everyone organization member can view the subscription on  organization" ON "public"."subscriptions" FOR
SELECT TO "authenticated" USING (
    (
      "auth"."uid"() IN (
        SELECT "public"."get_organization_member_ids"("subscriptions"."organization_id") AS "get_organization_member_ids"
      )
    )
  );
--
-- Name: organization_members Only organization admins can insert new members; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Only organization admins can insert new members" ON "public"."organization_members" FOR
INSERT TO "authenticated" WITH CHECK (
    (
      "auth"."uid"() IN (
        SELECT "public"."get_organization_admin_ids"("organization_members"."organization_id") AS "get_organization_admin_ids"
      )
    )
  );
--
-- Name: organization_join_invitations Only organization admins can invite other users; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Only organization admins can invite other users" ON "public"."organization_join_invitations" FOR
INSERT TO "authenticated" WITH CHECK (
    (
      (
        "auth"."uid"() IN (
          SELECT "public"."get_organization_admin_ids"(
              "organization_join_invitations"."organization_id"
            ) AS "get_organization_admin_ids"
        )
      )
      AND "public"."is_app_not_in_maintenance_mode"()
    )
  );
--
-- Name: organization_members Only organization admins can update organization members; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Only organization admins can update organization members" ON "public"."organization_members" FOR
UPDATE TO "authenticated" USING (
    (
      "auth"."uid"() IN (
        SELECT "public"."get_organization_admin_ids"("organization_members"."organization_id") AS "get_organization_admin_ids"
      )
    )
  );
--
-- Name: organizations Only organization admins/owners can delete organizations; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Only organization admins/owners can delete organizations" ON "public"."organizations" FOR DELETE TO "authenticated" USING (
  (
    (
      "auth"."uid"() IN (
        SELECT "public"."get_organization_admin_ids"("organizations"."id") AS "get_organization_admin_ids"
      )
    )
    AND "public"."is_app_not_in_maintenance_mode"()
  )
);
--
-- Name: organizations_private_info Only organization owners/admins can update private organizations info; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Only organization owners/admins can update private organizations info" ON "public"."organizations_private_info" FOR
UPDATE TO "authenticated" USING (
    (
      "auth"."uid"() IN (
        SELECT "public"."get_organization_admin_ids"("organizations_private_info"."id") AS "get_organization_admin_ids"
      )
    )
  );
--
-- Name: organizations_private_info Only organization owners/admins can view private organizations info; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Only organization owners/admins can view private organizations info" ON "public"."organizations_private_info" FOR
SELECT TO "authenticated" USING (
    (
      "auth"."uid"() IN (
        SELECT "public"."get_organization_admin_ids"("organizations_private_info"."id") AS "get_organization_admin_ids"
      )
    )
  );
--
-- Name: organization_join_invitations Only the invited user can edit the invitation; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Only the invited user can edit the invitation" ON "public"."organization_join_invitations" FOR
UPDATE TO "authenticated" USING (
    "public"."check_if_authenticated_user_owns_email"("invitee_user_email")
  );
--
-- Name: user_profiles Only the own user can update it; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Only the own user can update it" ON "public"."user_profiles" FOR
UPDATE TO "authenticated" USING (
    (
      ("auth"."uid"() = "id")
      AND "public"."is_app_not_in_maintenance_mode"()
    )
  );
--
-- Name: user_private_info Only the user can update their private information; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Only the user can update their private information" ON "public"."user_private_info" FOR
UPDATE TO "authenticated" USING (("auth"."uid"() = "id"));
--
-- Name: user_private_info Only the user can view their private information; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Only the user can view their private information" ON "public"."user_private_info" FOR
SELECT TO "authenticated" USING (("auth"."uid"() = "id"));
--
-- Name: prices Prices of active products are visible; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Prices of active products are visible" ON "public"."prices" FOR
SELECT USING (TRUE);
--
-- Name: organization_members organization members can view other organization members; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "organization members can view other organization members" ON "public"."organization_members" FOR
SELECT TO "authenticated" USING (
    (
      "auth"."uid"() IN (
        SELECT "public"."get_organization_member_ids"("organization_members"."organization_id") AS "get_organization_member_ids"
      )
    )
  );

  -- row level security
--
-- Name: app_settings; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."app_settings" ENABLE ROW LEVEL SECURITY;
--
-- Name: customers; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."customers" ENABLE ROW LEVEL SECURITY;
--
-- Name: organization_join_invitations; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."organization_join_invitations" ENABLE ROW LEVEL SECURITY;
--
-- Name: organization_members; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."organization_members" ENABLE ROW LEVEL SECURITY;
--
-- Name: organizations; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."organizations" ENABLE ROW LEVEL SECURITY;
--
-- Name: organizations_private_info; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."organizations_private_info" ENABLE ROW LEVEL SECURITY;
--
-- Name: prices; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."prices" ENABLE ROW LEVEL SECURITY;
--
-- Name: products; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."products" ENABLE ROW LEVEL SECURITY;
--
-- Name: subscriptions; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;
--
-- Name: user_private_info; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE "public"."user_private_info" ENABLE ROW LEVEL SECURITY;
--
-- Name: user_profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE "public"."user_profiles" ENABLE ROW LEVEL SECURITY;
--
-- Name: SCHEMA "public"; Type: ACL; Schema: -; Owner: postgres
--