CREATE TRIGGER on_organization_created_credits
AFTER
INSERT ON public.organizations FOR EACH ROW EXECUTE FUNCTION handle_organization_created_add_credits();
