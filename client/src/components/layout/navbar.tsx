import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import logoImage from "@assets/cedarcreek-logo.png";

export function Navbar() {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const scrollToSection = (sectionId: string) => {
    if (location !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuVisible(false);
    }
  };

  return (
    <nav className="bg-neutral-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img
                src={logoImage}
                alt="CedarCreek.AI Logo"
                className="h-10"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("approach")}
              className="text-neutral-300 hover:text-primary font-medium transition-colors"
              data-testid="nav-approach"
            >
              Our Approach
            </button>
            <button
              onClick={() => scrollToSection("expertise")}
              className="text-neutral-300 hover:text-primary font-medium transition-colors"
              data-testid="nav-expertise"
            >
              Expertise
            </button>
            <button
              onClick={() => scrollToSection("solutions")}
              className="text-neutral-300 hover:text-primary font-medium transition-colors"
              data-testid="nav-solutions"
            >
              Solutions
            </button>
            <Link href="/about" className="text-neutral-300 hover:text-primary font-medium transition-colors" data-testid="nav-about">
              About Us
            </Link>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-primary hover:bg-primary/90 text-white"
              data-testid="nav-get-started"
            >
              Get Started
            </Button>
          </div>
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="text-neutral-300 hover:text-white"
              onClick={toggleMobileMenu}
              data-testid="mobile-menu-toggle"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      <div className={`md:hidden bg-neutral-800 shadow-lg ${mobileMenuVisible ? "" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button
            onClick={() => scrollToSection("approach")}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-primary hover:bg-neutral-700 w-full text-left"
          >
            Our Approach
          </button>
          <button
            onClick={() => scrollToSection("expertise")}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-primary hover:bg-neutral-700 w-full text-left"
          >
            Expertise
          </button>
          <button
            onClick={() => scrollToSection("solutions")}
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-primary hover:bg-neutral-700 w-full text-left"
          >
            Solutions
          </button>
          <Link 
            href="/about" 
            className="block px-3 py-2 rounded-md text-base font-medium text-neutral-300 hover:text-primary hover:bg-neutral-700 w-full text-left"
            onClick={() => setMobileMenuVisible(false)}
          >
            About Us
          </Link>
          <button
            onClick={() => scrollToSection("contact")}
            className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-white hover:bg-primary/90 w-full text-left"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
}
