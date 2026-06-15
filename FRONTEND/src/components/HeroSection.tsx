import HeroSection from "@/components/shadcn-studio/blocks/hero-section-01/hero-section-01";
import Header from "@/components/shadcn-studio/blocks/hero-section-01/header";
import type { NavigationSection } from "@/components/shadcn-studio/blocks/hero-section-01/header";

const navigationData: NavigationSection[] = [
  {
    title: "Home",
    href: "#",
  },
  {
    title: "About",
    href: "#about",
  },
  {
    title: "Donation",
    href: "#donation",
  },
  {
    title: "Gallery",
    href: "#gallery",
  },
  {
    title: "Events",
    href: "#events",
  },
  {
    title: "Faq",
    href: "#faq",
  },
  {
    title: "Contact",
    href: "#contact",
  },
];

const HeroSectionPage = () => {
  return (
    <>
      {/* Header Section */}
      <Header navigationData={navigationData} />

      {/* Main Content */}
      <main className="flex flex-col">
        <HeroSection />
      </main>
    </>
  );
};

export default HeroSectionPage;
