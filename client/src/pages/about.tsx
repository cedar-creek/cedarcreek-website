import { AboutSection } from "@/components/sections/about-section";
import { Helmet } from "react-helmet-async";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | CedarCreek.AI - AI Accelerator Blueprint™</title>
        <meta name="description" content="Learn about CedarCreek.AI's mission to democratize AI technology and make strategic AI implementation accessible to businesses of all sizes." />
      </Helmet>
      <div className="py-12 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 text-center">About CedarCreek.AI</h1>
        </div>
      </div>
      <AboutSection />
    </>
  );
}