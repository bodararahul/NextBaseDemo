--  Create buckets
INSERT INTO STORAGE.buckets (id, name)
VALUES ('project-assets', 'project-assets') ON CONFLICT DO NOTHING;

INSERT INTO STORAGE.buckets (id, name)
VALUES ('user-assets', 'user-assets') ON CONFLICT DO NOTHING;

INSERT INTO STORAGE.buckets (id, name, public)
VALUES ('public-user-assets', 'public-user-assets', TRUE) ON CONFLICT DO NOTHING;

INSERT INTO STORAGE.buckets (id, name, public)
VALUES ('public-assets', 'public-assets', TRUE) ON CONFLICT DO NOTHING;

--  Create policies
DROP policy IF EXISTS "Give users access to own folder 10fq7k5_0" ON "storage"."objects";
CREATE policy "Give users access to own folder 10fq7k5_0" ON "storage"."objects" AS permissive FOR
SELECT TO authenticated USING (
    (
      (bucket_id = 'user-assets'::text)
      AND (
        (auth.uid())::text = (STORAGE.foldername(name)) [1]
      )
    )
  );

DROP policy IF EXISTS "Give users access to own folder 10fq7k5_1" ON "storage"."objects";
CREATE policy "Give users access to own folder 10fq7k5_1" ON "storage"."objects" AS permissive FOR
INSERT TO authenticated WITH CHECK (
    (
      (bucket_id = 'user-assets'::text)
      AND (
        (auth.uid())::text = (STORAGE.foldername(name)) [1]
      )
    )
  );

DROP policy IF EXISTS "Give users access to own folder 10fq7k5_2" ON "storage"."objects";
CREATE policy "Give users access to own folder 10fq7k5_2" ON "storage"."objects" AS permissive FOR
UPDATE TO authenticated USING (
    (
      (bucket_id = 'user-assets'::text)
      AND (
        (auth.uid())::text = (STORAGE.foldername(name)) [1]
      )
    )
  );

DROP policy IF EXISTS "Give users access to own folder 10fq7k5_3" ON "storage"."objects";
CREATE policy "Give users access to own folder 10fq7k5_3" ON "storage"."objects" AS permissive FOR DELETE TO authenticated USING (
  (
    (bucket_id = 'user-assets'::text)
    AND (
      (auth.uid())::text = (STORAGE.foldername(name)) [1]
    )
  )
);

DROP policy IF EXISTS "Give users access to own folder 1plzjhd_0" ON "storage"."objects";
CREATE policy "Give users access to own folder 1plzjhd_0" ON "storage"."objects" AS permissive FOR
SELECT TO public USING (((bucket_id = 'public-user-assets'::text)));

DROP policy IF EXISTS "Give users access to own folder 1plzjhd_1" ON "storage"."objects";
CREATE policy "Give users access to own folder 1plzjhd_1" ON "storage"."objects" AS permissive FOR
INSERT TO public WITH CHECK (
    (
      (bucket_id = 'public-user-assets'::text)
      AND (
        (auth.uid())::text = (STORAGE.foldername(name)) [1]
      )
    )
  );

DROP policy IF EXISTS "Give users access to own folder 1plzjhd_2" ON "storage"."objects";
CREATE policy "Give users access to own folder 1plzjhd_2" ON "storage"."objects" AS permissive FOR
UPDATE TO public USING (
    (
      (bucket_id = 'public-user-assets'::text)
      AND (
        (auth.uid())::text = (STORAGE.foldername(name)) [1]
      )
    )
  );

DROP policy IF EXISTS "Give users access to own folder 1plzjhd_3" ON "storage"."objects";
CREATE policy "Give users access to own folder 1plzjhd_3" ON "storage"."objects" AS permissive FOR DELETE TO public USING (
  (
    (bucket_id = 'public-user-assets'::text)
    AND (
      (auth.uid())::text = (STORAGE.foldername(name)) [1]
    )
  )
);

DROP policy IF EXISTS "anything 1plzjhd_0" ON "storage"."objects";
CREATE policy "anything 1plzjhd_0" ON "storage"."objects" AS permissive FOR
UPDATE TO public USING (TRUE);

DROP policy IF EXISTS "anything 1plzjhd_1" ON "storage"."objects";
CREATE policy "anything 1plzjhd_1" ON "storage"."objects" AS permissive FOR
SELECT TO public USING (TRUE);

DROP policy IF EXISTS "anything 1plzjhd_2" ON "storage"."objects";
CREATE policy "anything 1plzjhd_2" ON "storage"."objects" AS permissive FOR DELETE TO public USING (TRUE);

DROP policy IF EXISTS "Public Access for public-assets 1plzjha_3" ON "storage"."objects";
CREATE policy "Public Access for public-assets 1plzjha_3" ON STORAGE.objects FOR
SELECT USING (bucket_id = 'public-assets');

INSERT INTO app_settings (id)
VALUES (1) ON CONFLICT DO NOTHING;
