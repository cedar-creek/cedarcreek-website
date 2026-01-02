import { Helmet } from "react-helmet-async";
import { GeneralContactForm } from "@/components/general-contact-form";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact Us | Cedar Creek Solutions</title>
        <meta name="description" content="Get in touch with Cedar Creek Solutions. Tell us about your legacy system modernization needs and we'll help you chart a path forward." />
      </Helmet>
      
      <div className="bg-neutral-900 min-h-screen py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Start a Conversation
            </h1>
            <p className="text-neutral-400 text-lg">
              Tell us about your project and we'll get back to you within one business day.
            </p>
          </div>
          
          <div className="bg-neutral-800 rounded-xl p-6 md:p-8 shadow-lg">
            <GeneralContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
