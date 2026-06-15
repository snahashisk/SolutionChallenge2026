import { SwatchBookIcon, SearchIcon, StarIcon, SmartphoneIcon, LockKeyholeIcon, ShieldBanIcon } from "lucide-react";

import Features from "@/components/shadcn-studio/blocks/features-section-01/features-section-01";

const featuresList = [
  {
    icon: SwatchBookIcon,
    title: "Help For Food",
    description:
      "We provide proper care and support to women and children in need. Our programs focus on education, healthcare, and overall well-being to empower vulnerable communities.",
    cardBorderColor: "border-primary/40 hover:border-primary",
    avatarTextColor: "text-primary",
    avatarBgColor: "bg-primary/10",
    imageSrc: "/image-5.jpg",
    progress: 80,
    raised: 200,
    goal: 10000,
  },
  {
    icon: ShieldBanIcon,
    title: "Help For Health",
    description:
      "Our health programs provide essential medical care, vaccinations, and health education to underserved communities. We ensure access to treatment and promote preventive care.",
    cardBorderColor: "border-green-600/40 hover:border-green-600 dark:border-green-400/40 dark:hover:border-green-400",
    avatarTextColor: "text-green-600 dark:text-green-400",
    avatarBgColor: "bg-green-600/10 dark:bg-green-400/10",
    imageSrc: "/image-6.jpg",
    progress: 70,
    raised: 200,
    goal: 10000,
  },
  {
    icon: SearchIcon,
    title: "Help For Education",
    description:
      "We provide proper care and support to women and children in need. Our programs focus on education, healthcare, and overall well-being to empower vulnerable communities.",
    cardBorderColor: "border-amber-600/40 hover:border-amber-600 dark:border-amber-400/40 dark:hover:border-amber-400",
    avatarTextColor: "text-amber-600 dark:text-amber-400",
    avatarBgColor: "bg-amber-600/10 dark:bg-amber-400/10",
    imageSrc: "/image-7.jpg",
    progress: 60,
    raised: 200,
    goal: 10000,
  },
  {
    icon: StarIcon,
    title: "Help For Medical",
    description:
      "Our health programs provide essential medical care, vaccinations, and health education to underserved communities. We ensure access to treatment.",
    cardBorderColor: "border-destructive/40 hover:border-destructive",
    avatarTextColor: "text-destructive",
    avatarBgColor: "bg-destructive/10",
    imageSrc: "/image-8.jpg",
    progress: 50,
    raised: 200,
    goal: 10000,
  },
  {
    icon: SmartphoneIcon,
    title: "Help For Shelter",
    description:
      "Protect your data with fraud detection and two-factor authentication. Ensure a secure environment for all transactions and account activities.",
    cardBorderColor: "border-sky-600/40 hover:border-sky-600 dark:border-sky-400/40 dark:hover:border-sky-400",
    avatarTextColor: "text-sky-600 dark:text-sky-400",
    avatarBgColor: "bg-sky-600/10 dark:bg-sky-400/10",
    imageSrc: "/image-9.jpg",
    progress: 40,
    raised: 200,
    goal: 10000,
  },
  {
    icon: LockKeyholeIcon,
    title: "Human Rights",
    description:
      "Protecting fundamental human rights and ensuring everyone is treated with dignity and respect. Our programs work towards a just and equitable society for all.",
    cardBorderColor: "border-primary/40 hover:border-primary",
    avatarTextColor: "text-primary",
    avatarBgColor: "bg-primary/10",
    imageSrc: "/image-10.jpg",
    progress: 30,
    raised: 200,
    goal: 10000,
  },
];

const FeatureMain = () => {
  return (
    <section id="donation" className="scroll-mt-8">
      <Features featuresList={featuresList} />
    </section>
  );
};

export default FeatureMain;
