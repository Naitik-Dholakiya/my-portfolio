import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", to: "home" },
    { name: "About Me", to: "about" },
    { name: "My Projects", to: "projects" },
    { name: "My Blogs", to: "blogs" },
    { name: "Contact Me", to: "contact" },
  ];

  const commonLinkProps = {
    spy: true,
    smooth: true,
    offset: -80,
    duration: 500,
    activeClass: "text-yellow-300",
  };

  return (
    <nav className="fixed w-full z-50 bg-black bg-opacity-60 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-2xl font-bold text-white cursor-pointer">
          <ScrollLink to="home" smooth={true} duration={500}>
            Naitik Dholakiya
          </ScrollLink>
        </div>

        <div className="hidden md:flex items-center gap-6 text-white font-medium">
          {links.map((link) => (
            <ScrollLink
              key={link.name}
              to={link.to}
              {...commonLinkProps}
              className="hover:text-yellow-300 cursor-pointer"
            >
              {link.name}
            </ScrollLink>
          ))}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.ul
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className="md:hidden flex flex-col bg-black text-white px-6 py-4 space-y-4"
        >
          {links.map((link) => (
            <ScrollLink
              key={link.name}
              to={link.to}
              {...commonLinkProps}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-yellow-300 cursor-pointer"
            >
              {link.name}
            </ScrollLink>
          ))}
        </motion.ul>
      )}
    </nav>
  );
}
