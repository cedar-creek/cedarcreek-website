import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Helmet>
      <title>CedarCreek.AI - AI Accelerator Blueprint™</title>
      <meta name="description" content="Accelerate your business growth through strategic AI adoption with CedarCreek.AI's proven Accelerator Blueprint methodology." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Open Graph / Social Media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="CedarCreek.AI - AI Accelerator Blueprint™" />
      <meta property="og:description" content="Accelerate your business growth through strategic AI adoption with CedarCreek.AI's proven Accelerator Blueprint methodology." />
      <meta property="og:url" content="https://cedarcreek.ai" />
    </Helmet>
    <App />
  </HelmetProvider>
);
