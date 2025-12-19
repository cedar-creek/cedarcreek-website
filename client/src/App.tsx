import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Development from "@/pages/development";
import { Suspense } from "react";
import { Navbar } from "./components/layout/navbar";
import { Footer } from "./components/layout/footer";
import { FloatingCTA } from "./components/floating-cta";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/development" component={Development} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<div>Loading...</div>}>
              <Router />
            </Suspense>
          </main>
          <Footer />
          <FloatingCTA />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
