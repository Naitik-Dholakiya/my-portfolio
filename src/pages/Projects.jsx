import { useContext } from "react"; // ✅ FIXED
import { motion } from "framer-motion"; // ✅ only animations here
import { ThemeContext } from "../context/ThemeContext";

const projects = [/* same sample items */];

export default function Projects() {
  const { theme } = useContext(ThemeContext);
  return (
    <section id="projects" className={`min-h-screen px-6 py-16 ${
      theme === "dark" ? "bg-slate-900 text-slate-200" : "bg-gray-100 text-gray-900"
    }`}>
      <motion.h2 /* animated header */>My Projects</motion.h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p,i) => (
          <motion.div /* animated card */
            key={i}
            className={`rounded-2xl p-6 shadow-lg hover:scale-105 transition ${
              theme === "dark" ? "bg-slate-800" : "bg-white"
            }`}
          >
            <h3 className={`text-2xl font-semibold mb-2 ${
              theme === "dark" ? "text-yellow-400" : "text-yellow-600"
            }`}>{p.title}</h3>
            <p className="mb-4 text-slate-300">{p.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tags.map((t,i2) => (
                <span key={i2} className={`px-3 py-1 rounded-full text-sm ${
                  theme === "dark" ? "bg-sky-700 text-white" : "bg-blue-200 text-blue-800"
                }`}>{t}</span>
              ))}
            </div>
            <a href={p.link} className={`hover:underline ${
              theme === "dark" ? "text-blue-400" : "text-blue-600"
            }`}>
              View Project →
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
