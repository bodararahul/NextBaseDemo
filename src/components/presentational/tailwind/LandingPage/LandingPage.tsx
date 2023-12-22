import Testimonials from './Testimonials';
import HeroSection from './HeroSection';
import TrustedCompanies from './TrustedCompanies';
import AllFeatures from './AllFeatures';
import MainFeatures from './MainFeatures';
import CTA from './CTA';
import Footer from './Footer';

export const LandingPage = () => {
  return (
    <>
      <HeroSection
        title="lorem ipsum dolor onsectetur elit"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at"
        image="/mockups/office.jpeg"
      />
      <TrustedCompanies />
      <AllFeatures />
      <MainFeatures />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
};
