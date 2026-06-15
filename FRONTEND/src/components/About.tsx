import AboutUsPage01 from "./shadcn-studio/blocks/about-us-page-01/about-us-page-01";
import { FaChildren, FaHandHoldingDollar, FaGlobe, FaChartLine } from "react-icons/fa6";

const About = () => {
  const stats = [
    { icon: FaChildren, value: "100+", description: "Children Supported" },
    { icon: FaHandHoldingDollar, value: "₹5500", description: "Monthly Donated" },
    { icon: FaGlobe, value: "1100+", description: "Global Volunteers" },
    { icon: FaChartLine, value: "7000+", description: "Fund Raised" },
  ];
  return (
    <section id="about" className="scroll-mt-0">
      <AboutUsPage01 stats={stats} />
    </section>
  );
};

export default About;
