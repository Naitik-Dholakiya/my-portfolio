import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

export default function Contact() {
  const { theme } = useContext(ThemeContext);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.includes("@")) errs.email = "Valid email required";
    if (!form.message.trim()) errs.message = "Message can't be empty";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert("Message sent!");
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" className={`min-h-screen px-6 py-16 flex items-center justify-center ${
      theme === "dark" ? "bg-slate-900" : "bg-gray-100"
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`w-full max-w-2xl p-8 rounded-2xl shadow-lg ${
          theme === "dark" ? "bg-slate-800 text-slate-200" : "bg-white text-gray-900"
        }`}
      >
        <h2 className={theme === "dark" ? "text-sky-400" : "text-blue-600"}>Contact Me</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className={theme === "dark" ? "text-yellow-400" : "text-yellow-600"}>Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 ${
                theme === "dark" ? "bg-slate-700 focus:ring-sky-500" : "bg-gray-200 focus:ring-blue-500"
              }`} />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>
          {/* Email */}
          <div>
            <label className={theme === "dark" ? "text-yellow-400" : "text-yellow-600"}>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 ${
                theme === "dark" ? "bg-slate-700 focus:ring-sky-500" : "bg-gray-200 focus:ring-blue-500"
              }`} />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          {/* Message */}
          <div>
            <label className={theme === "dark" ? "text-yellow-400" : "text-yellow-600"}>Message</label>
            <textarea name="message" rows="4" value={form.message} onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg focus:ring-2 ${
                theme === "dark" ? "bg-slate-700 focus:ring-sky-500" : "bg-gray-200 focus:ring-blue-500"
              }`} />
            {errors.message && <p className="text-red-500">{errors.message}</p>}
          </div>
          <button type="submit"
            className="w-full py-3 rounded-xl font-semibold transition text-white"
            style={{ backgroundColor: theme === "dark" ? "#3b82f6" : "#2563eb" }}
          >
            Send Message
          </button>
        </form>
      </motion.div>
    </section>
  );
}
