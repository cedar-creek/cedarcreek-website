import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-neutral-800 text-neutral-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© {new Date().getFullYear()} CedarCreek.AI. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-x-6 gap-y-2">
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
        <div className="mt-4 pt-4 border-t border-neutral-700 text-center">
          <p className="text-xs text-neutral-500">
            This site is protected by reCAPTCHA and the Google{" "}
            <a 
              href="https://policies.google.com/privacy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white underline"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a 
              href="https://policies.google.com/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white underline"
            >
              Terms of Service
            </a>{" "}
            apply.
          </p>
        </div>
      </div>
    </footer>
  );
}
