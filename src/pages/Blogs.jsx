import { useContext } from "react"; // ✅ FIXED
import { motion } from "framer-motion"; // ✅ only animations here
import { ThemeContext } from "../context/ThemeContext";

const blogs = [/* same sample items */];

export default function Blogs() {
  const { theme } = useContext(ThemeContext);
  return (
    <section id="blogs" className={`min-h-screen px-6 py-16 ${
      theme === "dark" ? "bg-slate-900 text-slate-200" : "bg-gray-100 text-gray-900"
    }`}>
      <motion.h2 /* header */>My Blogs</motion.h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((b,i) => (
          <motion.div key={i} className={`rounded-2xl overflow-hidden shadow-lg transition ${
            theme === "dark" ? "bg-slate-800 hover:shadow-sky-500/40" : "bg-white hover:shadow-blue-500/40"
          }`}>
            <img src={b.image} alt={b.title} className="w-full h-48 object-cover" />
            <div className="p-6 space-y-3">
              <h3 className={theme === "dark" ? "text-yellow-400" : "text-yellow-600"}>{b.title}</h3>
              <p className={theme === "dark" ? "text-slate-400" : "text-gray-500"}>{b.date}</p>
              <p className={theme === "dark" ? "text-slate-300" : "text-gray-700"}>{b.summary}</p>
              <a href={b.link} className={theme === "dark" ? "text-sky-400" : "text-blue-600"}>
                Read More →
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
