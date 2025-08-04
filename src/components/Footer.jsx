export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Naitik Dholakiya. All rights reserved.
        </p>

        <div className="flex space-x-5 mt-4 md:mt-0">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
            title="GitHub"
          >
            <i className="fab fa-github text-xl"></i>
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow-400 transition"
            title="LinkedIn"
          >
            <i className="fab fa-linkedin text-xl"></i>
          </a>
          <a
            href="mailto:your@email.com"
            className="hover:text-yellow-400 transition"
            title="Email"
          >
            <i className="fas fa-envelope text-xl"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
