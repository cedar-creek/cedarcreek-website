import { Facebook, Twitter, Github, Dribbble } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-neutral-800 text-neutral-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© {new Date().getFullYear()} CedarCreek.AI. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="#" className="text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
