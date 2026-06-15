import FAQ from "@/components/shadcn-studio/blocks/faq-component-01/faq-component-01";

const faqItems = [
  {
    question: "What problem does this platform solve?",
    answer:
      "There are many children in our country who are denied their basic right to education due to poverty. Many children drop out of school to support their families, while many others do not have access to quality education at all.",
  },
  {
    question: "How does the system connect users with NGOs or volunteers?",
    answer:
      "Users can easily find NGOs or volunteers based on their location and the type of help needed. The platform features a comprehensive directory with detailed profiles of each organization or volunteer, making it simple for users to find the right match for their needs.",
  },
  {
    question: "How do you ensure the authenticity of requests?",
    answer:
      "We implement verification mechanisms such as user authentication, report validation, and community/volunteer review to minimize false or misleading requests.",
  },
  {
    question: "How can NGOs benefit from this platform? ",
    answer:
      "NGOs can manage requests more efficiently, track impact, prioritize urgent cases, and improve transparency with donors by showcasing real-time activities and outcomes.",
  },
  {
    question: "How can NGOs benefit from this platform? ",
    answer:
      "NGOs can manage requests more efficiently, track impact, prioritize urgent cases, and improve transparency with donors by showcasing real-time activities and outcomes.",
  },
];

const FAQPage = () => {
  return (
    <section id="faq" className="scroll-mt-8">
      <FAQ faqItems={faqItems} />
    </section>
  );
};

export default FAQPage;
