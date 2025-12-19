import { HeroSection } from "@/components/sections/hero-section";
import { ApproachSection } from "@/components/sections/approach-section";
import { ExpertiseSection } from "@/components/sections/expertise-section";
import { SolutionsSection } from "@/components/sections/solutions-section";
import { StatsSection } from "@/components/sections/stats-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>CedarCreek.AI - Legacy Modernization & AI Integration</title>
        <meta name="description" content="Transform your legacy systems into modern, AI-ready platforms. Specializing in ColdFusion modernization, Go microservices, Svelte frontends, and Ionic mobile apps." />
      </Helmet>
      <HeroSection />
      <ApproachSection />
      <ExpertiseSection />
      <StatsSection />
      <SolutionsSection />
      <ContactSection />
    </>
  );
}
