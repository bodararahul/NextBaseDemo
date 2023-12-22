ALTER TABLE "public"."user_private_info"
ADD COLUMN "default_organization" uuid,
  ADD CONSTRAINT "user_private_info_default_organization_fkey" FOREIGN KEY ("default_organization") REFERENCES "public"."organizations"("id") ON DELETE
SET NULL;

ALTER TABLE projects
ALTER COLUMN team_id DROP NOT NULL;