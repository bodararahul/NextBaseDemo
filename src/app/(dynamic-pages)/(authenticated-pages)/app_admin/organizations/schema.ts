import { z } from 'zod';

export const appAdminOrganizationsFiltersSchema = z.object({
  page: z.coerce.number().int().positive().optional(),
  query: z.string().optional(),
});

export type AppAdminOrganizationsFiltersSchema = z.infer<
  typeof appAdminOrganizationsFiltersSchema
>;
