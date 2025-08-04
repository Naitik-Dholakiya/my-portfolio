import { useContext } from "react"; // ✅ FIXED
import { motion } from "framer-motion"; // ✅ only animations here
import { ThemeContext } from "../context/ThemeContext";

export default function About() {
  const { theme } = useContext(ThemeContext);
  return (
    <section id="about" className={`min-h-screen px-6 py-16 flex items-center justify-center ${
      theme === "dark" ? "bg-slate-900 text-slate-200" : "bg-white text-gray-800"
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl space-y-6 text-center"
      >
        <h2 className={`text-4xl font-bold ${
          theme === "dark" ? "text-sky-400" : "text-blue-600"
        }`}>About Me</h2>
        <p className="text-lg leading-relaxed">
          I'm a passionate front-end developer who enjoys building visually appealing and interactive web experiences.
        </p>
        <p className={theme === "dark" ? "text-yellow-400" : "text-yellow-500"}>
          I love learning new technologies, solving challenges, and delivering polished user interfaces.
        </p>
      </motion.div>
    </section>
  );
}
