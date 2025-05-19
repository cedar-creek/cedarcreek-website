import { HeroSection } from "@/components/sections/hero-section";
import { StatsSection } from "@/components/sections/stats-section";
import { ApproachSection } from "@/components/sections/approach-section";
import { SolutionsSection } from "@/components/sections/solutions-section";
import { AssessmentSection } from "@/components/sections/assessment-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>CedarCreek.AI - AI Accelerator Blueprint™</title>
        <meta name="description" content="Accelerate your business growth through strategic AI adoption with CedarCreek.AI's proven Accelerator Blueprint methodology." />
      </Helmet>
      <HeroSection />
      <StatsSection />
      <ApproachSection />
      <SolutionsSection />
      <AssessmentSection />
      <ContactSection />
    </>
  );
}
