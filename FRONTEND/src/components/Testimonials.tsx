import TestimonialsComponent from "@/components/shadcn-studio/blocks/testimonials-component-01/testimonials-component-01";
import type { TestimonialItem } from "@/components/shadcn-studio/blocks/testimonials-component-01/testimonials-component-01";

const testimonials: TestimonialItem[] = [
  {
    name: "Snahashis Kanrar",
    role: "CEO & Co Founder",
    company: "Zendesk",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png?width=40&height=40&format=auto",
    rating: 5,
    content:
      "GoodDeed has been a game-changer for our organization. The platform's user-friendly interface and powerful features have made it easier than ever to manage our charitable initiatives and connect with donors.",
  },
  {
    name: "Koustav Das",
    role: "Product manager",
    company: "Orbit",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=40&height=40&format=auto",
    rating: 4,
    content:
      "The team at GoodDeed has been incredibly responsive and supportive. They truly care about their users and are always looking for ways to improve the platform based on feedback.",
  },
  {
    name: "Sweety Nag",
    role: "Lead Designer",
    company: "Figma",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png?width=40&height=40&format=auto",
    rating: 5,
    content:
      "As a designer, I appreciate the attention to detail in GoodDeed's user interface. The platform is not only functional but also visually appealing, making it a pleasure to use.",
  },
  {
    name: "Alex Chen",
    role: "Frontend Developer",
    company: "Vercel",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png?width=40&height=40&format=auto",
    rating: 4,
    content:
      "GoodDeed has streamlined our workflow and improved our ability to track and manage our charitable efforts. The analytics features have been particularly helpful in understanding our impact and making data-driven decisions.",
  },
];

const Testimonials = () => {
  return <TestimonialsComponent testimonials={testimonials} />;
};

export default Testimonials;
