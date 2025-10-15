import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaInstagram, FaReact, FaNodeJs, FaLaravel, FaDownload, FaBars, FaTimes, FaArrowUp } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiMysql } from 'react-icons/si';
import { ChevronDown, ExternalLink, ArrowRight, MessageCircle, UploadCloud, Sun, Moon } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import CountUp from 'react-countup';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
// import resumePDF from "/public/assets/Naitik-Resume.pdf";

function Home() {
  const [activeTab, setActiveTab] = useState('Projects');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [commentData, setCommentData] = useState({ name: '', message: '', photo: null });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactRef = useRef(null);

  const { scrollYProgress } = useScroll();

  const themes = {
    dark: {
      bg: '#0f172a',
      text: '#e2e8f0',
      accent: '#8b5cf6',
      glass: 'rgba(255, 255, 255, 0.1)',
      shadow: '0 6px 24px rgba(0, 0, 0, 0.6)',
      secondary: '#94a3b8',
      particleColor: '#8b5cf6',
    },
    light: {
      bg: '#f8fafc',
      text: '#1f2937',
      accent: '#6d28d9',
      glass: 'rgba(0, 0, 0, 0.05)',
      shadow: '0 6px 24px rgba(0, 0, 0, 0.15)',
      secondary: '#6b7280',
      particleColor: '#6d28d9',
    },
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    Object.entries(themes[theme]).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [theme]);

  useEffect(() => {
    const sections = [
      { id: 'home', ref: homeRef },
      { id: 'about', ref: aboutRef },
      { id: 'portfolio', ref: portfolioRef },
      { id: 'contact', ref: contactRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );

    sections.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => sections.forEach(({ ref }) => {
      if (ref.current) observer.unobserve(ref.current);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateForm = (data, isComment = false) => {
    const errors = {};
    if (!data.name.trim()) errors.name = 'Name is required';
    if (isComment) {
      if (!data.message.trim()) errors.message = 'Message is required';
    } else {
      if (!data.email.trim()) errors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(data.email)) errors.email = 'Email is invalid';
      if (!data.message.trim()) errors.message = 'Message is required';
    }
    return errors;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setNotification({ type: 'success', message: 'Message sent successfully!' });
        setFormData({ name: '', email: '', message: '' });
        setFormErrors({});
      } catch {
        setNotification({ type: 'error', message: 'Failed to send message. Try again.' });
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setNotification(null), 3000);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(commentData, true);
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setComments([
          { name: commentData.name, message: commentData.message, date: 'Just now', photo: commentData.photo },
          ...comments,
        ]);
        setNotification({ type: 'success', message: 'Comment posted!' });
        setCommentData({ name: '', message: '', photo: null });
        setFormErrors({});
      } catch {
        setNotification({ type: 'error', message: 'Failed to post comment.' });
      } finally {
        setIsSubmitting(false);
        setTimeout(() => setNotification(null), 3000);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = () => setCommentData((prev) => ({ ...prev, photo: reader.result }));
      reader.readAsDataURL(file);
      setFormErrors((prev) => ({ ...prev, photo: undefined }));
    } else {
      setFormErrors((prev) => ({ ...prev, photo: 'File size exceeds 5MB' }));
    }
  };

  const [comments, setComments] = useState([
    { name: 'Ekizr', message: 'Thanks for visiting! Contact me if you need anything', role: 'Admin', date: 'Jun 2, 2025', pinned: true },
    { name: 'asdas', message: 'sosogosks', date: '2h ago' },
    { name: 'aisgyuasfiug', message: '<a href="#">aoiusdfgalsufkbfjk</a>', date: '1d ago' },
  ]);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const portfolioData = useMemo(
    () => ({
      Projects: [
        {
          title: 'Aritmatika Solver',
          description: 'Program ini dirancang untuk mempermudah pengguna dalam menyelesaikan soal-soal Aritmatika secara otomatis.',
          image: 'https://via.placeholder.com/400x300?text=Aritmatika+Solver',
          demoLink: '#',
          tech: ['JavaScript', 'React'],
        },
        {
          title: 'AutoChat-Discord',
          description: 'AutoChat adalah solusi otomatisasi untuk mengirim pesan ke saluran Discord secara terjadwal.',
          image: 'https://via.placeholder.com/400x300?text=AutoChat',
          demoLink: '#',
          tech: ['Node.js', 'JavaScript'],
        },
        {
          title: 'Buku Catatan',
          description: 'Website untuk membuat, menyimpan, dan mengelola catatan secara efisien dan fleksibel.',
          image: 'https://via.placeholder.com/400x300?text=Buku+Catatan',
          demoLink: '#',
          tech: ['Laravel', 'MySQL'],
        },
      ].sort((a, b) => a.title.localeCompare(b.title)),
      Certificates: [
        {
          title: 'React Professional Certification',
          issuer: 'Coursera',
          date: 'Jan 2024',
          description: 'Advanced React and Redux for building scalable web applications.',
          image: 'https://via.placeholder.com/400x300?text=React+Certification',
          link: '#',
        },
        // {
        //   title: 'Node.js Backend Developer',
        //   issuer: 'Udemy',
        //   date: 'Mar 2023',
        //   description: 'Mastered Node.js for building RESTful APIs and microservices.',
        //   image: 'https://via.placeholder.com/400x300?text=Node.js+Certification',
        //   link: '#',
        // },
        // {
        //   title: 'Full-Stack Web Development',
        //   issuer: 'FreeCodeCamp',
        //   date: 'Aug 2022',
        //   description: 'Comprehensive training in MERN stack development.',
        //   image: 'https://via.placeholder.com/400x300?text=Full-Stack+Certification',
        //   link: '#',
        // },
      ].sort((a, b) => a.title.localeCompare(b.title)),
      'Tech Stack': [
        {
          name: 'JavaScript',
          description: 'Proficient in ES6+ for dynamic and interactive web applications.',
          icon: <SiJavascript className="text-yellow-400 text-2xl sm:text-3xl" />,
        },
        {
          name: 'React',
          description: 'Expert in building reusable UI components and SPAs with React.',
          icon: <FaReact className="text-cyan-500 text-2xl sm:text-3xl" />,
        },
        {
          name: 'Node.js',
          description: 'Skilled in server-side development with Express and Node.js.',
          icon: <FaNodeJs className="text-green-500 text-2xl sm:text-3xl" />,
        },
        {
          name: 'Laravel',
          description: 'Experienced in building robust backend systems with Laravel.',
          icon: <FaLaravel className="text-red-600 text-2xl sm:text-3xl" />,
        },
        {
          name: 'MySQL',
          description: 'Proficient in designing and optimizing relational databases.',
          icon: <SiMysql className="text-blue-600 text-2xl sm:text-3xl" />,
        },
        {
          name: 'Tailwind CSS',
          description: 'Expert in rapid UI development with utility-first CSS.',
          icon: <SiTailwindcss className="text-sky-500 text-2xl sm:text-3xl" />,
        },
      ].sort((a, b) => a.name.localeCompare(b.name)),
    }),
    []
  );

  const socials = [
    { href: 'https://github.com/Naitik-Dholakiya', icon: <FaGithub className="text-xl sm:text-2xl" />, label: 'GitHub', color: 'hover:text-gray-600 dark:hover:text-gray-200' },
    { href: 'https://instagram.com/your-profile', icon: <FaInstagram className="text-xl sm:text-2xl" />, label: 'Instagram', color: 'hover:text-pink-600' },
    { href: 'https://www.linkedin.com/in/naitik-dholakiya/', icon: <FaLinkedin className="text-xl sm:text-2xl" />, label: 'LinkedIn', color: 'hover:text-blue-600' },
  ].sort((a, b) => a.label.localeCompare(b.label));

  const contactIcons = [
    { label: 'GitHub', icon: '💻', color: 'bg-gray-600' },
    { label: 'Instagram', icon: '📸', color: 'bg-pink-600' },
    { label: 'LinkedIn', icon: '🔗', color: 'bg-blue-600' },
    { label: 'TikTok', icon: '🎵', color: 'bg-black' },
    { label: 'YouTube', icon: '▶️', color: 'bg-red-600' },
  ].sort((a, b) => a.label.localeCompare(b.label));

  const navLinks = [
    { href: '#home', label: 'Home', ref: homeRef },
    { href: '#about', label: 'About', ref: aboutRef },
    { href: '#portfolio', label: 'Portfolio', ref: portfolioRef },
    { href: '#contact', label: 'Contact', ref: contactRef },
  ];

  return (
    <>
      <style>
        {`
          :root {
            --bg: ${themes.dark.bg};
            --text: ${themes.dark.text};
            --accent: ${themes.dark.accent};
            --glass: ${themes.dark.glass};
            --shadow: ${themes.dark.shadow};
            --secondary: ${themes.dark.secondary};
            --particle-color: ${themes.dark.particleColor};
            --transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .dark { --bg: ${themes.dark.bg}; --text: ${themes.dark.text}; --accent: ${themes.dark.accent}; --glass: ${themes.dark.glass}; --shadow: ${themes.dark.shadow}; --secondary: ${themes.dark.secondary}; --particle-color: ${themes.dark.particleColor}; }
          .light { --bg: ${themes.light.bg}; --text: ${themes.light.text}; --accent: ${themes.light.accent}; --glass: ${themes.light.glass}; --shadow: ${themes.light.shadow}; --secondary: ${themes.light.secondary}; --particle-color: ${themes.light.particleColor}; }
          
          html { scroll-behavior: smooth; }
          body { transition: var(--transition); }
          .text-shadow { text-shadow: 0 3px 8px rgba(0, 0, 0, 0.5); }
          .animate-text-shimmer {
            background: linear-gradient(90deg, var(--accent), #3b82f6, var(--accent));
            background-size: 300% 100%;
            animation: shimmer 6s linear infinite;
          }
          @keyframes shimmer {
            0% { background-position: 300% 0; }
            100% { background-position: -300% 0; }
          }
          .skeleton {
            background: linear-gradient(90deg, var(--glass) 25%, rgba(255,255,255,0.2) 50%, var(--glass) 75%);
            background-size: 200% 100%;
            animation: skeleton-loading 1.5s infinite;
          }
          @keyframes skeleton-loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(to right, var(--accent), #3b82f6);
            transform-origin: left;
            z-index: 1000;
            transition: var(--transition);
          }
          .glass-effect {
            background: var(--glass);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: var(--transition);
            position: relative;
            overflow: hidden;
          }
          .glass-effect::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            transition: left 0.6s ease;
          }
          .glass-effect:hover::before {
            left: 100%;
          }
          .glass-effect:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow);
          }
          .gradient-text {
            background: linear-gradient(to right, var(--accent), #3b82f6);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
          
          /* Fluid Typography */
          html { font-size: clamp(14px, 1.5vw + 12px, 16px); }
          @media (max-width: 640px) {
            .text-5xl { font-size: clamp(1.8rem, 5vw + 1rem, 2.5rem); }
            .text-4xl { font-size: clamp(1.5rem, 4vw + 0.8rem, 2rem); }
            .text-3xl { font-size: clamp(1.2rem, 3vw + 0.6rem, 1.5rem); }
            .text-2xl { font-size: clamp(1rem, 2.5vw + 0.5rem, 1.25rem); }
            .text-xl { font-size: clamp(0.9rem, 2vw + 0.4rem, 1.125rem); }
            .text-lg { font-size: clamp(0.8rem, 1.8vw + 0.3rem, 1rem); }
            .text-base { font-size: clamp(0.7rem, 1.5vw + 0.2rem, 0.875rem); }
            .text-sm { font-size: clamp(0.65rem, 1.2vw + 0.2rem, 0.75rem); }
            .text-xs { font-size: clamp(0.6rem, 1vw + 0.15rem, 0.7rem); }
          }
          @media (min-width: 641px) and (max-width: 1024px) {
            .text-5xl { font-size: clamp(2.5rem, 4vw + 1rem, 3.5rem); }
            .text-4xl { font-size: clamp(2rem, 3vw + 0.8rem, 2.5rem); }
            .text-3xl { font-size: clamp(1.5rem, 2.5vw + 0.6rem, 2rem); }
            .text-2xl { font-size: clamp(1.25rem, 2vw + 0.5rem, 1.5rem); }
            .text-xl { font-size: clamp(1rem, 1.5vw + 0.4rem, 1.25rem); }
            .text-lg { font-size: clamp(0.875rem, 1.2vw + 0.3rem, 1.125rem); }
          }
          
          /* Accessibility Enhancements */
          [role="button"]:focus, button:focus, a:focus {
            outline: 3px solid var(--accent);
            outline-offset: 3px;
          }
          @media (prefers-reduced-motion: reduce) {
            .glass-effect, .animate-text-shimmer, .scroll-progress, .skeleton, .animate-bounce {
              animation: none;
              transition: none;
            }
            .glass-effect::before { display: none; }
          }
          
          /* Particle Background */
          .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
          }
          
          /* Navbar Styles */
          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            backdrop-filter: blur(20px);
            background: var(--glass);
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            transition: var(--transition), box-shadow 0.3s ease;
          }
          .navbar.scrolled {
            box-shadow: var(--shadow);
          }
          .navbar a {
            position: relative;
            transition: color 0.3s ease;
          }
          .navbar a:hover, .navbar a.active {
            color: var(--accent);
          }
          .navbar a.active::after {
            content: '';
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(to right, var(--accent), #3b82f6);
          }
          .mobile-menu {
            position: fixed;
            top: 0;
            right: 0;
            height: 100vh;
            width: 75%;
            max-width: 300px;
            background: var(--glass);
            backdrop-filter: blur(20px);
            border-left: 1px solid rgba(255, 255, 255, 0.3);
            z-index: 200;
            padding: 1rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .mobile-menu-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            z-index: 199;
          }
          .mobile-menu-enter {
            transform: translateX(100%);
            opacity: 0;
          }
          .mobile-menu-enter-active {
            transform: translateX(0);
            opacity: 1;
            transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
          }
          .mobile-menu-exit {
            transform: translateX(0);
            opacity: 1;
          }
          .mobile-menu-exit-active {
            transform: translateX(100%);
            opacity: 0;
            transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
          }
          .scroll-top-button {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 150;
            background: var(--glass);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            padding: 0.75rem;
            cursor: pointer;
            transition: var(--transition), opacity 0.3s ease;
          }
          .scroll-top-button:hover {
            transform: scale(1.1);
            box-shadow: var(--shadow);
          }
          @media (min-width: 768px) {
            .mobile-menu-button, .mobile-menu-backdrop {
              display: none;
            }
            .desktop-nav {
              display: flex;
            }
          }
          @media (max-width: 767px) {
            .desktop-nav {
              display: none;
            }
            .mobile-menu-button {
              display: block;
            }
          }
        `}
      </style>
      <main className="min-h-screen relative overflow-hidden font-sans" style={{ background: 'var(--bg)', color: 'var(--text)', transition: 'var(--transition)' }} ref={homeRef}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          className="particles"
          options={{
            particles: {
              number: { value: 50, density: { enable: true, value_area: 800 } },
              color: { value: 'var(--particle-color)' },
              shape: { type: 'circle' },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              move: { enable: true, speed: 0.5, direction: 'none', random: true, out_mode: 'out' },
            },
            interactivity: {
              events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
              modes: { repulse: { distance: 100 }, push: { quantity: 4 } },
            },
            retina_detect: true,
          }}
        />
        {/* <div className="scroll-progress" style={{ transform: `scaleX(${scrollYProgress.get()})` }} /> */}

        {/* Fixed Responsive Navbar */}
        <motion.nav
          className={`navbar px-4 sm:px-6 md:px-8 lg:px-12 py-4 flex justify-between items-center ${showScrollTop ? 'scrolled' : ''}`}
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="text-lg sm:text-xl font-bold gradient-text">Naitik Dholakiya</div>
          <div className="flex items-center gap-4 sm:gap-6">
            <motion.div className="desktop-nav flex gap-4 sm:gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className={`text-sm sm:text-base fo
                    nt-medium text-[var(--secondary)] ${activeSection === link.href.slice(1) ? 'active gradient-text' : ''}`}
                  aria-label={`Go to ${link.label} section`}
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.button
                className="glass-effect p-2 rounded-full focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </motion.button>
            </motion.div>
            <motion.button
              className="mobile-menu-button p-2 rounded-full focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </motion.button>
          </div>
        </motion.nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.div
                className="mobile-menu-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={toggleMenu}
              />
              <motion.div
                className="mobile-menu"
                initial="mobile-menu-enter"
                animate="mobile-menu-enter-active"
                exit="mobile-menu-exit"
                transition={{ duration: 0.4 }}
              >
                <motion.button
                  className="self-end p-2 rounded-full focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTimes size={20} />
                </motion.button>
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`text-base font-medium text-[var(--secondary)] ${activeSection === link.href.slice(1) ? 'gradient-text' : ''} py-2`}
                    aria-label={`Go to ${link.label} section`}
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.button
                  className="glass-effect p-2 rounded-full focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 flex items-center gap-2"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              className="scroll-top-button"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={scrollToTop}
              aria-label="Scroll to top"
            >
              <FaArrowUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {notification && (
            <motion.div
              className={`fixed top-20 right-4 p-3 sm:p-4 rounded-lg ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white text-sm sm:text-base z-50 shadow-[var(--shadow)]`}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {notification.message}
            </motion.div>
          )}
        </AnimatePresence>

        <section id="home" className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 pt-8" ref={homeRef}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg)]/20"
            style={{ y: scrollYProgress }}
            transition={{ type: 'tween', duration: 0.5 }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 items-center z-10 w-full max-w-7xl gap-6 sm:gap-8 lg:gap-12">
            <motion.div
              className={`space-y-4 sm:space-y-6 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              {!isLoaded ? (
                <>
                  <div className="h-6 sm:h-8 w-32 sm:w-40 rounded-full skeleton" />
                  <div className="h-16 sm:h-20 w-3/4 rounded-lg skeleton" />
                  <div className="h-6 sm:h-8 w-1/2 rounded-lg skeleton" />
                  <div className="h-12 sm:h-16 w-full max-w-md rounded-lg skeleton" />
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-8 sm:h-10 w-20 sm:w-24 rounded-full skeleton" />
                    ))}
                  </div>
                  <div className="flex gap-3 sm:gap-4">
                    <div className="h-10 sm:h-12 w-32 sm:w-40 rounded-full skeleton" />
                    <div className="h-10 sm:h-12 w-28 sm:w-32 rounded-full skeleton" />
                  </div>
                  <div className="flex gap-4 sm:gap-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-6 sm:h-8 w-6 sm:w-8 rounded-full skeleton" />
                    ))}
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <div
                    className="glass-effect text-sm sm:text-base font-medium gradient-text px-3 sm:px-4 py-1 sm:py-2 inline-block rounded-full text-shadow"
                  >
                    ✨ Ready to Innovate
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
                    <span className="block">Hi, I’m</span>
                    <span className="block gradient-text animate-text-shimmer text-shadow">Naitik Dholakiya</span>
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl">
                    <TypeAnimation
                      sequence={['Tech Enthusiast', 2000, 'Creative Coder', 2000, 'Problem Solver', 2000, 'UI/UX Lover', 2000]}
                      wrapper="span"
                      speed={40}
                      repeat={Infinity}
                      className="gradient-text text-shadow"
                    />
                  </p>

                  <p className="text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg lg:max-w-xl">
                    I craft digital experiences that are fast, responsive, and visually stunning. With expertise in both frontend and backend, I create seamless solutions that captivate users.
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4">
                    {portfolioData['Tech Stack'].map((tech) => (
                      <motion.div
                        key={tech.name}
                        className={`glass-effect flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-semibold cursor-pointer ${tech.color}`}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && e.target.click()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech.icon}
                        {tech.name}
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-6">
                    <motion.a
                      href="#projects"
                      className="bg-gradient-to-r from-[var(--accent)] to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                      role="button"
                      aria-label="Explore Projects"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🚀 Explore Projects
                    </motion.a>
                    <motion.a
                      href="#contact"
                      className="glass-effect px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base hover:bg-[var(--glass)]/80 focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                      role="button"
                      aria-label="Contact Me"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      📞 Contact Me
                    </motion.a>
                  </div>

                  <div className="flex gap-4 sm:gap-6 mt-4 sm:mt-6">
                    {socials.map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`text-[var(--secondary)] ${social.color} focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2`}
                        aria-label={social.label}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            <div className="flex justify-center md:justify-end mt-6 md:mt-0">
              <Tilt
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                perspective={1200}
                transitionSpeed={600}
                scale={1.05}
                glareEnable={true}
                glareMaxOpacity={0.4}
                glareColor="#ffffff"
                className="rounded-xl w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[500px]"
              >
                {!isLoaded ? (
                  <div className="w-full h-64 sm:h-80 md:h-96 rounded-xl skeleton" />
                ) : (
                  <motion.img
                    src="/my-portfolio/assets/hero-image.svg"
                    alt="Hero"
                    className="glass-effect w-full h-auto rounded-xl object-cover"
                    loading="lazy"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    gyroscope="true"
                  />
                )}
              </Tilt>
            </div>
          </div>

          <div
            className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 text-[var(--accent)] animate-bounce"
            aria-hidden="true"
          >
            <ChevronDown size={24} sm:size={36} strokeWidth={2} />
          </div>
        </section>

        <section id="about" className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 relative" ref={aboutRef}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg)]/10"
            style={{ y: scrollYProgress }}
            transition={{ type: 'tween', duration: 0.5 }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center z-10 relative">
            <motion.div
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.h2
                className="gradient-text text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-shadow"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                About Me
              </motion.h2>

              <p className="text-sm sm:text-base md:text-lg gradient-text font-medium text-shadow">
                ✨ Crafting the Future of Web
              </p>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold">
                Hello, I'm <span className="gradient-text text-shadow">Naitik Dholakiya</span>
              </h3>

              <p className="leading-relaxed max-w-md sm:max-w-lg lg:max-w-xl text-sm sm:text-base md:text-lg">
                A Computer Engineering graduate passionate about Front-End development. I specialize in creating interactive digital experiences, always pushing the boundaries of what's possible.
              </p>

              <blockquote className="glass-effect p-3 sm:p-4 rounded-xl italic text-sm sm:text-base text-shadow">
                “Technology is best when it brings people together.”
              </blockquote>

              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                <motion.a
                  href="/my-portfolio/assets/Naitik-Resume.pdf"
                  download
                  className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white px-4 sm:px-6 py-2 rounded-xl font-semibold text-sm sm:text-base flex items-center gap-2 focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                  role="button"
                  aria-label="Download CV"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaDownload />
                  Download Resume
                </motion.a>

                <motion.a
                  href="#projects"
                  className="glass-effect px-4 sm:px-6 py-2 rounded-xl font-semibold text-sm sm:text-base hover:bg-[var(--glass)]/80 focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                  role="button"
                  aria-label="View Projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.a>
              </div>
            </motion.div>

            <Tilt
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              perspective={1200}
              transitionSpeed={600}
              scale={1.05}
              gyroscope={true}
              className="w-full flex justify-center"
            >
              {!isLoaded ? (
                <div className="w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72 rounded-full skeleton" />
              ) : (
                <motion.div
                  className="glass-effect rounded-full overflow-hidden w-48 sm:w-64 md:w-72 h-48 sm:h-64 md:h-72"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <img
                    src="/my-portfolio/assets/Hero.jpg"
                    alt="Your Profile"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </motion.div>
              )}
            </Tilt>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
                {[
                  { label: 'Certificates', value: 7, desc: 'Skills validated' },
                  { label: 'Total Projects', value: 13, desc: 'Innovative web solutions' },
                  { label: 'Years Experience', value: 3, desc: 'Continuous journey' },
                ]
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((item) => (
                    <motion.div
                      key={item.label}
                      className="glass-effect p-3 sm:p-4 rounded-xl text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && e.target.click()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-lg sm:text-xl md:text-2xl font-extrabold">
                        <CountUp end={item.value} duration={2} />
                      </div>
                      <div className="text-sm sm:text-base gradient-text mt-1 sm:mt-2">{item.label}</div>
                      <p className="text-xs sm:text-sm text-[var(--secondary)] mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
              </div>
        </section>

        <section id="portfolio" className="min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 relative" ref={portfolioRef}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg)]/10"
            style={{ y: scrollYProgress }}
            transition={{ type: 'tween', duration: 0.5 }}
          />
          <motion.div
            className="text-center mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="gradient-text text-xl sm:text-2xl md:text-3xl font-extrabold text-shadow">Portfolio Showcase</h2>
            <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">Explore my journey through innovative projects, certifications, and technical expertise.</p>
          </motion.div>

          <div className="flex justify-center gap-2 sm:gap-3 flex-wrap mb-6 sm:mb-8">
            {Object.keys(portfolioData)
              .sort((a, b) => a.localeCompare(b))
              .map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`glass-effect px-3 sm:px-5 py-1 sm:py-2 rounded-xl font-medium text-sm sm:text-base ${
                    activeTab === tab
                      ? 'bg-gradient-to-tr from-[var(--accent)] to-blue-600 text-white'
                      : 'hover:bg-[var(--glass)]/80'
                  } focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2`}
                  role="tab"
                  aria-selected={activeTab === tab}
                  aria-controls={`panel-${tab}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab}
                </motion.button>
              ))}
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.2 }}
          >
            {portfolioData[activeTab].map((item) => (
              <motion.div
                key={item.title || item.name}
                className="glass-effect p-3 sm:p-4 rounded-2xl hover:shadow-[var(--shadow)] transition duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && e.target.click()}
              >
                {activeTab === 'Tech Stack' ? (
                  <>
                    <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                      {item.icon}
                      <h3 className="text-base sm:text-lg font-semibold">{item.name}</h3>
                    </div>
                    <p className="text-sm sm:text-base mt-1 sm:mt-2 line-clamp-3">{item.description}</p>
                  </>
                ) : (
                  <>
                    <div className="overflow-hidden rounded-xl mb-3 sm:mb-4 h-40 sm:h-48 bg-[var(--bg)]/20">
                      <motion.img
                        src={item.image}
                        alt={item.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                        initial={{ scale: 1.1 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm sm:text-base mt-1 sm:mt-2 line-clamp-3">{item.description}</p>
                    {activeTab === 'Projects' && (
                      <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                        {item.tech.map((tech) => (
                          <span
                            key={tech}
                            className="glass-effect px-2 py-1 text-xs sm:text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {activeTab === 'Certificates' && (
                      <p className="text-xs sm:text-sm text-[var(--secondary)] mt-1">Issued by {item.issuer} on {item.date}</p>
                    )}
                    <div className="flex justify-between items-center mt-3 sm:mt-4">
                      <motion.a
                        href={item.demoLink || item.link}
                        className="text-xs sm:text-sm text-blue-400 hover:underline flex items-center gap-1 focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                        aria-label={`View ${activeTab === 'Certificates' ? 'certificate' : 'live demo'} of ${item.title}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {activeTab === 'Certificates' ? 'View Certificate' : 'Live Demo'} <ExternalLink size={12} sm:size={14} />
                      </motion.a>
                      <motion.button
                        className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm hover:gradient-text focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                        aria-label={`View details of ${item.title}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Details <ArrowRight size={14} sm:size={16} />
                      </motion.button>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="contact" className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 min-h-screen relative" ref={contactRef}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg)]/10"
            style={{ y: scrollYProgress }}
            transition={{ type: 'tween', duration: 0.5 }}
          />
          <motion.div
            className="text-center mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="gradient-text text-xl sm:text-2xl md:text-3xl font-extrabold mb-2 sm:mb-4 text-shadow">Get in Touch</h2>
            <p className="text-sm sm:text-base md:text-lg">Have a question or project in mind? Let's connect and create something amazing.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <motion.div
              className="glass-effect p-3 sm:p-4 rounded-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h3 className="gradient-text text-base sm:text-lg md:text-xl font-bold mb-2 text-shadow">Contact</h3>
              <p className="text-xs sm:text-sm text-[var(--secondary)] mb-4 sm:mb-6">Let's discuss your next big idea.</p>

              <form className="flex flex-col gap-3 sm:gap-4" onSubmit={handleContactSubmit}>
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`glass-effect rounded-lg px-3 sm:px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 ${
                      formErrors.name ? 'border-red-500' : ''
                    }`}
                    aria-label="Your Name"
                    aria-invalid={!!formErrors.name}
                  />
                  {formErrors.name && <p className="text-red-600 text-xs sm:text-sm mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`glass-effect rounded-lg px-3 sm:px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 ${
                      formErrors.email ? 'border-red-500' : ''
                    }`}
                    aria-label="Your Email"
                    aria-invalid={!!formErrors.email}
                  />
                  {formErrors.email && <p className="text-red-600 text-xs sm:text-sm mt-1">{formErrors.email}</p>}
                </div>
                <div>
                  <textarea
                    rows="4"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`glass-effect rounded-lg px-3 sm:px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 ${
                      formErrors.message ? 'border-red-500' : ''
                    }`}
                    aria-label="Your Message"
                    aria-invalid={!!formErrors.message}
                  />
                  {formErrors.message && <p className="text-red-600 text-xs sm:text-sm mt-1">{formErrors.message}</p>}
                </div>
                <motion.button
                  type="submit"
                  className={`bg-gradient-to-r from-[var(--accent)] to-blue-600 text-white font-medium py-2 rounded-lg text-sm sm:text-base ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  } focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2`}
                  disabled={isSubmitting}
                  aria-label="Send Message"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </form>

              <div className="mt-4 sm:mt-6">
                <h4 className="text-base sm:text-lg mb-3 sm:mb-4 text-shadow">Connect With Me</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {contactIcons.map((item, i) => (
                    <motion.div
                      key={i}
                      className={`${item.color} p-2 sm:p-3 text-xs sm:text-sm rounded-lg text-white flex items-center justify-center cursor-pointer focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2`}
                      role="button"
                      tabIndex={0}
                      aria-label={`Connect on ${item.label}`}
                      onKeyDown={(e) => e.key === 'Enter' && e.target.click()}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.icon} {item.label}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              className="glass-effect p-3 sm:p-4 rounded-2xl"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h3 className="gradient-text text-base sm:text-lg md:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 text-shadow">
                <MessageCircle className="w-4 sm:w-5 h-4 sm:h-5" /> Comments ({comments.length})
              </h3>

              <form className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6" onSubmit={handleCommentSubmit}>
                <div>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={commentData.name}
                    onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                    className={`glass-effect rounded-lg px-3 sm:px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 ${
                      formErrors.name ? 'border-red-500' : ''
                    }`}
                    aria-label="Your Name for Comment"
                    aria-invalid={!!formErrors.name}
                  />
                  {formErrors.name && <p className="text-red-600 text-xs sm:text-sm mt-1">{formErrors.name}</p>}
                </div>
                <div>
                  <textarea
                    placeholder="Write your message here..."
                    value={commentData.message}
                    onChange={(e) => setCommentData({ ...commentData, message: e.target.value })}
                    className={`glass-effect rounded-lg px-3 sm:px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 ${
                      formErrors.message ? 'border-red-500' : ''
                    }`}
                    rows={3}
                    aria-label="Your Comment"
                    aria-invalid={!!formErrors.message}
                  />
                  {formErrors.message && <p className="text-red-600 text-xs sm:text-sm mt-1">{formErrors.message}</p>}
                </div>
                <div
                  className="glass-effect rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm flex items-center cursor-pointer relative focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                  role="button"
                  tabIndex={0}
                  aria-label="Upload Profile Photo"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    aria-label="Upload Profile Photo"
                  />
                  <UploadCloud className="inline-block mr-2" size={16} sm:size={18} />
                  {commentData.photo ? 'Photo Selected' : 'Choose Profile Photo'} <span className="ml-2 text-xs text-[var(--secondary)]">(Max file size: 5MB)</span>
                </div>
                {formErrors.photo && <p className="text-red-600 text-xs sm:text-sm mt-1">{formErrors.photo}</p>}
                {commentData.photo && (
                  <div className="relative w-12 sm:w-16 h-12 sm:h-16 rounded-full overflow-hidden">
                    <img src={commentData.photo} alt="Preview" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                )}
                <motion.button
                  type="submit"
                  className={`bg-gradient-to-r from-[var(--accent)] to-blue-600 text-white font-medium py-2 rounded-lg text-sm sm:text-base ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  } focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2`}
                  disabled={isSubmitting}
                  aria-label="Post Comment"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSubmitting ? 'Posting...' : 'Post Comment'}
                </motion.button>
              </form>

              <div className="flex flex-col gap-3 sm:gap-4 max-h-56 sm:max-h-60 overflow-y-auto pr-1 sm:pr-2">
                {comments.map((comment, index) => (
                  <motion.div
                    key={index}
                    className="glass-effect rounded-lg p-3 sm:p-4 text-xs sm:text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        {comment.photo && (
                          <img src={comment.photo} alt={`${comment.name}'s photo`} className="w-6 sm:w-8 h-6 sm:h-8 rounded-full object-cover" loading="lazy" />
                        )}
                        <div className="font-semibold">
                          {comment.name}
                          {comment.role && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-[var(--accent)] text-white rounded">Admin</span>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-[var(--secondary)]">{comment.date}</div>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: comment.message }}></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;