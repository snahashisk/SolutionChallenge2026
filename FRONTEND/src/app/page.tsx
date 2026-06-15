import HeroSectionPage from "@/components/HeroSection";
import About from "@/components/About";
import FeatureMain from "@/components/FeatureMain";
import GalleryPage from "@/components/GalleryPage";
import Testimonials from "@/components/Testimonials";
import Events from "@/components/Events";
import TeamPage from "@/components/TeamPage";
import FAQPage from "@/components/FAQPage";
import ContactUsPage from "@/components/ContactUs";
import Footer from "@/components/shadcn-studio/blocks/footer-component-01/footer-component-01";
import { FaChildren, FaHandHoldingDollar, FaGlobe, FaChartLine } from "react-icons/fa6";

const page = () => {
  return (
    <div>
      <HeroSectionPage />
      <About />
      <FeatureMain />
      <GalleryPage />
      <Testimonials />
      <Events />
      <TeamPage />
      <FAQPage />
      <ContactUsPage />
      <Footer />
    </div>
  );
};

export default page;
