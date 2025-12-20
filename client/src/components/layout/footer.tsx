export function Footer() {
  return (
    <footer className="bg-neutral-800 text-neutral-300 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© 1998 – 2025 Cedar Creek Ltd. All rights reserved.</p>
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
