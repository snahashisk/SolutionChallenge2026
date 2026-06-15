import Team from "@/components/shadcn-studio/blocks/team-section-01/team-section-01";

const teamMembers = [
  {
    image: "/snahashis.jpg",
    alt: "Snahashis Kanrar",
    name: "Snahashis Kanrar",
    role: "Founder & CEO",
    description: "A visionary leader driving innovation and collaboration.",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      github: "#",
      instagram: "#",
    },
  },
  {
    image: "/koustav.jpeg",
    alt: "Koustav Das",
    name: "Koustav Das",
    role: "Engineering Manager",
    description: "Leading teams to build smart, scalable solutions.",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      github: "#",
      instagram: "#",
    },
  },
  {
    image: "/shalini.jpeg",
    alt: "Shalini Mukherjee",
    name: "Shalini Mukherjee",
    role: "Product Designer",
    description: "Crafting intuitive and engaging user experiences.",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      github: "#",
      instagram: "#",
    },
  },
  {
    image: "/sweety.jpeg",
    alt: "Sweety Nag",
    name: "Sweety Nag",
    role: "Frontend Developer",
    description: "Bringing designs to life with seamless interfaces.",
    socialLinks: {
      facebook: "#",
      twitter: "#",
      github: "#",
      instagram: "#",
    },
  },
];

const TeamPage = () => {
  return <Team teamMembers={teamMembers} />;
};

export default TeamPage;
