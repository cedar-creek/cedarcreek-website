import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Helmet, HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Helmet>
      <title>Cedar Creek Solutions - Legacy Modernization & AI Integration</title>
      <meta name="description" content="Expert legacy system modernization and AI integration services. Transform ColdFusion and PHP systems to Go microservices, Svelte frontends, and Ionic mobile apps." />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Open Graph / Social Media */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Cedar Creek Solutions - Legacy Modernization & AI Integration" />
      <meta property="og:description" content="Expert legacy system modernization and AI integration services. Transform ColdFusion and PHP systems to Go microservices, Svelte frontends, and Ionic mobile apps." />
      <meta property="og:url" content="https://cedarcreeksolutions.com" />
    </Helmet>
    <App />
  </HelmetProvider>
);
