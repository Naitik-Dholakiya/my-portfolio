import { createElement, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Download,
  Layers3,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import {
  FaGithub,
  FaLaravel,
  FaLinkedin,
  FaNodeJs,
  FaReact,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
} from 'react-icons/si';
import gitGithub from '../assets/certificates/git_github.png';
import promptEngineering from '../assets/certificates/prompt_engineering.png';
import mongoDbBasics from '../assets/certificates/mongodb_basics.png';
import cloudComputing from '../assets/certificates/cloud_computing.png';
import machineLearning from '../assets/certificates/machine_learning.png';

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionP = motion.p;
const MotionArticle = motion.article;

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
];

const socials = [
  {
    href: 'https://github.com/Naitik-Dholakiya',
    label: 'GitHub',
    icon: FaGithub,
  },
  {
    href: 'https://www.linkedin.com/in/naitik-dholakiya/',
    label: 'LinkedIn',
    icon: FaLinkedin,
  },
];

const skills = [
  { label: 'JavaScript', icon: SiJavascript },
  { label: 'React', icon: FaReact },
  { label: 'Node.js', icon: FaNodeJs },
  { label: 'Laravel', icon: FaLaravel },
  { label: 'MongoDB', icon: SiMongodb },
  { label: 'MySQL', icon: SiMysql },
  { label: 'Tailwind CSS', icon: SiTailwindcss },
];

const projects = [
  {
    name: 'bill-generator',
    title: 'Bill Generator & Inventory',
    imagePath: 'assets/projects/bill-generator.png',
    description:
      'A Laravel billing and inventory system for managing customers, suppliers, products, invoices, stock, and sales insights.',
    tags: ['Laravel', 'PHP', 'MySQL', 'PDF Export'],
    href: 'https://github.com/Naitik-Dholakiya/bill-generator',
    motif: 'invoice',
  },
  {
    name: 'mern-ecommerce',
    title: 'MERN E-Commerce',
    imagePath: 'assets/projects/mern-ecommerce.png',
    description:
      'A full-stack shop with product browsing, a dynamic cart, JWT authentication, and admin product and order management.',
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    href: 'https://github.com/Naitik-Dholakiya/mern-ecommerce',
    motif: 'shop',
  },
  {
    name: 'Face-Recogination',
    title: 'Face Recognition System',
    imagePath: 'assets/projects/face-recognition.png',
    description:
      'A computer-vision project with dedicated face capture, model training, and recognition workflows.',
    tags: ['Python', 'OpenCV', 'Computer Vision'],
    href: 'https://github.com/Naitik-Dholakiya/Face-Recogination',
    motif: 'vision',
  },
  {
    name: 'resume-builder',
    title: 'Resume Builder',
    imagePath: 'assets/projects/resume-builder.png',
    description:
      'A React app for creating and customizing resumes with a clean, approachable editing experience.',
    tags: ['React', 'JavaScript', 'Bootstrap'],
    href: 'https://github.com/Naitik-Dholakiya/resume-builder',
    motif: 'resume',
  },
  {
    name: 'password-manager',
    title: 'Password Manager',
    imagePath: 'assets/projects/password-manager.png',
    description:
      'A focused password-management project built with a modern JavaScript frontend.',
    tags: ['JavaScript', 'Password Management'],
    href: 'https://github.com/Naitik-Dholakiya/password-manager',
    motif: 'password',
  },
  {
    name: 'Portfolio',
    title: 'Portfolio Website',
    imagePath: 'assets/projects/portfolio.png',
    description:
      'An earlier personal portfolio built with a responsive interface and custom styling.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    href: 'https://github.com/Naitik-Dholakiya/Portfolio',
    motif: 'portfolio',
  },
];

const experience = [
  {
    period: 'May 2024 — Apr 2025',
    role: 'Software Development Intern · Laravel',
    organization: 'Parthvitech Innovatives LLP',
    description:
      'Contributed to a real-world ERP system using Laravel and React, collaborating on responsive interfaces, database design, and team workflows.',
  },
  {
    period: 'Jan 2024 — Apr 2024',
    role: 'Full-Stack Developer',
    organization: 'Freelance Projects',
    description:
      'Built web projects with Laravel, Bootstrap, and jQuery while developing practical experience in Git, databases, and delivery.',
  },
];

const certificates = [
  {
    title: 'Getting Started with Git and GitHub',
    issuer: 'Coursera',
    date: '16 October 2025',
    image: gitGithub,
    href: 'https://1drv.ms/b/c/87d5329971bd92f1/Eful4Vvai-FKjghVsabi2J4Ba0BCy7wq352mcXIpNZ8oSw?e=o9Fao4',
  },
  {
    title: 'Prompt Engineering for ChatGPT',
    issuer: 'Coursera',
    date: '1 October 2025',
    image: promptEngineering,
  },
  {
    title: 'MongoDB Basics',
    issuer: 'Coursera',
    date: '7 November 2025',
    image: mongoDbBasics,
  },
  {
    title: 'Introduction to Cloud Computing Semester 1',
    issuer: 'AWS Academy',
    date: '30 October 2023',
    image: cloudComputing,
  },
  {
    title: 'Machine Learning Foundations',
    issuer: 'AWS Academy',
    date: '14 April 2024',
    image: machineLearning,
  },
];

const projectVisuals = {
  invoice: {
    surface: 'bg-teal-950',
    first:
      "h-36 w-56 -rotate-6 rounded-lg border border-white/20 bg-slate-800 shadow-xl before:absolute before:left-4 before:top-5 before:h-1 before:w-10 before:bg-teal-300 before:content-[''] after:absolute after:left-4 after:top-12 after:h-1 after:w-28 after:bg-white/30 after:content-['']",
    second:
      'h-20 w-16 translate-x-28 translate-y-12 rotate-6 rounded-xl border border-white/20 bg-slate-900 shadow-xl',
    third: 'h-3 w-3 -translate-x-28 -translate-y-20 rounded-full bg-cyan-300',
    label: 'BILLING / INVENTORY',
  },
  shop: {
    surface: 'bg-sky-950',
    first:
      'h-36 w-36 -translate-x-5 -rotate-6 rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 shadow-[0_0_80px_rgba(34,211,238,0.25)]',
    second:
      'h-24 w-24 translate-x-16 translate-y-12 rounded-2xl border border-white/30 bg-slate-800/80 shadow-xl',
    third: 'h-4 w-4 -translate-x-24 -translate-y-20 rounded-full bg-white',
    label: 'SHOP / MANAGE',
  },
  vision: {
    surface: 'bg-slate-900',
    first:
      'h-36 w-36 rounded-full border border-teal-200/70 bg-[radial-gradient(circle_at_40%_35%,#99f6e4_0_3px,transparent_4px),#334155] shadow-[0_0_70px_rgba(45,212,191,0.2)]',
    second:
      'h-20 w-20 translate-x-16 -translate-y-14 rounded-full border border-white/50',
    third: 'h-4 w-4 -translate-x-24 translate-y-16 rounded-full bg-cyan-300',
    label: 'VISION / AI',
  },
  resume: {
    surface: 'bg-orange-950',
    first:
      'h-36 w-32 -translate-x-8 -rotate-6 rounded-lg border border-white/30 bg-[linear-gradient(#fdba74_0_10%,#44403c_10%)] shadow-xl',
    second:
      'h-32 w-24 translate-x-12 translate-y-8 rotate-6 rounded-lg border border-white/30 bg-[linear-gradient(#fef3c7_0_10%,#292524_10%)] shadow-xl',
    third: 'h-6 w-6 translate-x-3 -translate-y-16 rounded-full bg-orange-300',
    label: 'BUILD / GROW',
  },
  password: {
    surface: 'bg-emerald-950',
    first:
      "h-36 w-56 -rotate-6 rounded-lg border border-white/20 bg-slate-800 shadow-xl before:absolute before:left-4 before:top-5 before:h-1 before:w-10 before:bg-teal-300 before:content-[''] after:absolute after:left-4 after:top-12 after:h-1 after:w-28 after:bg-white/30 after:content-['']",
    second:
      'h-20 w-16 translate-x-28 translate-y-12 rotate-6 rounded-xl border border-white/20 bg-slate-900 shadow-xl',
    third: 'h-3 w-3 -translate-x-28 -translate-y-20 rounded-full bg-cyan-300',
    label: 'PRIVATE / SAFE',
  },
  portfolio: {
    surface: 'bg-cyan-950',
    first:
      "h-36 w-56 -rotate-6 rounded-lg border border-white/20 bg-slate-800 shadow-xl before:absolute before:left-4 before:top-5 before:h-1 before:w-10 before:bg-teal-300 before:content-[''] after:absolute after:left-4 after:top-12 after:h-1 after:w-28 after:bg-white/30 after:content-['']",
    second:
      'h-20 w-16 translate-x-28 translate-y-12 rotate-6 rounded-xl border border-white/20 bg-slate-900 shadow-xl',
    third: 'h-3 w-3 -translate-x-28 -translate-y-20 rounded-full bg-cyan-300',
    label: 'DESIGN / BUILD',
  },
};

function SectionHeading({ eyebrow, title, description, number }) {
  return (
    <div className="mb-9 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-10">
      <div>
        <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300">
          <span className="text-sm text-teal-700 dark:text-teal-300">{number}</span>
          {eyebrow}
        </span>
        <h2 className="mt-4 text-[clamp(2.15rem,8vw,4.5rem)] font-medium leading-[1.02] tracking-[-0.075em] sm:text-[clamp(2.65rem,5.4vw,4.5rem)]">
          {title}
        </h2>
      </div>
      {description && (
        <p className="max-w-sm text-base leading-7 text-slate-600 dark:text-slate-300">
          {description}
        </p>
      )}
    </div>
  );
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#101c2b' : '#f2f8f8');
    window.localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen overflow-x-clip bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-ink-950 dark:text-slate-50">
      <a
        className="fixed left-3 top-3 z-[100] -translate-y-20 rounded-lg bg-teal-700 px-4 py-3 font-semibold text-white focus:translate-y-0 dark:bg-teal-300 dark:text-ink-950"
        href="#main"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-slate-50/90 backdrop-blur-xl dark:border-white/10 dark:bg-ink-950/90">
        <nav
          className="relative mx-auto flex h-[4.5rem] w-[min(1360px,calc(100%-2rem))] items-center justify-between sm:w-[min(1360px,calc(100%-3.5rem))]"
          aria-label="Main navigation"
        >
          <a
            className="inline-flex items-center gap-3 text-sm font-semibold tracking-tight sm:text-base"
            href="#home"
            aria-label="Naitik Dholakiya home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-teal-700 font-serif text-xl font-bold text-white dark:bg-teal-300 dark:text-ink-950">
              N
            </span>
            <span>Naitik Dholakiya</span>
          </a>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div
              className={`${menuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-full flex-col gap-1 border-b border-slate-900/10 bg-slate-50 p-5 shadow-xl dark:border-white/10 dark:bg-ink-950 md:static md:flex md:flex-row md:items-center md:gap-5 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
              id="primary-navigation"
            >
              {navLinks.map((link, index) => (
                <a
                  className="inline-flex min-h-12 items-center gap-2 border-b border-slate-900/5 text-sm text-slate-700 transition-colors hover:text-teal-700 dark:border-white/5 dark:text-slate-200 dark:hover:text-teal-300 md:min-h-0 md:border-0"
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    0{index + 1}
                  </span>
                  {link.label}
                </a>
              ))}
              <a
                className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-teal-700/40 px-4 text-sm font-medium text-teal-800 transition-colors hover:bg-teal-700 hover:text-white dark:border-teal-300/40 dark:text-teal-200 dark:hover:bg-teal-300 dark:hover:text-ink-950 md:mt-0"
                href="#contact"
                onClick={() => setMenuOpen(false)}
              >
                Let&apos;s talk <ArrowUpRight size={16} />
              </a>
            </div>

            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-900/10 bg-white px-3 text-sm text-slate-800 transition-colors hover:border-teal-700 hover:text-teal-800 dark:border-white/15 dark:bg-ink-900 dark:text-slate-100 dark:hover:border-teal-300 dark:hover:text-teal-200"
              type="button"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-pressed={theme === 'light'}
              onClick={() =>
                setTheme((currentTheme) =>
                  currentTheme === 'dark' ? 'light' : 'dark',
                )
              }
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span className="hidden sm:inline">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </button>

            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-900/10 bg-white dark:border-white/15 dark:bg-ink-900 md:hidden"
              type="button"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="primary-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </nav>
      </header>

      <main id="main">
        <section
          className="relative mx-auto grid min-h-[calc(100svh-4.5rem)] w-[min(1200px,calc(100%-2rem))] grid-cols-1 items-center gap-6 py-12 sm:w-[min(1200px,calc(100%-3.5rem))] sm:gap-8 sm:py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-[8%] md:py-20"
          id="home"
        >
          <div className="relative z-10 max-w-2xl">
            <MotionDiv
              className="mb-6 inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.12em] text-slate-600 dark:text-slate-300"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="h-2 w-2 rounded-full bg-teal-700 shadow-[0_0_14px_rgba(8,127,128,0.55)] dark:bg-teal-300" />
              Developer · Designer at heart
            </MotionDiv>

            <MotionH1
              className="text-[clamp(3.15rem,11.5vw,7rem)] font-medium leading-[0.94] tracking-[-0.085em] sm:text-[clamp(4rem,8.5vw,7rem)]"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
            >
              I build for
              <br />
              the <span className="text-sky-700 dark:text-sky-300">human</span>
              <br />
              side of tech.
            </MotionH1>

            <MotionP
              className="mt-6 max-w-md text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
            >
              I&apos;m Naitik, a full-stack developer who enjoys turning
              thoughtful ideas into useful, intuitive digital experiences.
            </MotionP>

            <MotionDiv
              className="mt-7 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
            >
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-teal-700 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-teal-800 dark:bg-teal-300 dark:text-ink-950 dark:hover:bg-teal-200 sm:text-base"
                href="#work"
              >
                Explore my work <ArrowDownRight size={18} />
              </a>
              <a
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-slate-900/15 px-5 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-teal-700 dark:border-white/20 dark:text-slate-100 dark:hover:border-teal-300 sm:text-base"
                href={assetUrl('assets/Naitik-Resume.pdf')}
                download
              >
                <Download size={17} /> Download résumé
              </a>
            </MotionDiv>

            <MotionDiv
              className="mt-9 flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <span className="mr-1 text-sm text-slate-500 dark:text-slate-400">
                Find me elsewhere
              </span>
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  className="grid h-9 w-9 place-items-center rounded-full border border-slate-900/15 text-slate-700 transition hover:-translate-y-0.5 hover:border-teal-700 hover:text-teal-800 dark:border-white/15 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-200"
                  href={href}
                  key={label}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                >
                  {createElement(Icon, { size: 18 })}
                </a>
              ))}
            </MotionDiv>
          </div>

          <MotionDiv
            className="relative isolate grid min-h-[360px] place-items-center sm:min-h-[500px]"
            initial={{ opacity: 0, scale: 0.94, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: 'easeOut' }}
            aria-label="Portrait of Naitik Dholakiya"
            role="img"
          >
            <div className="absolute -z-10 h-[min(84vw,465px)] w-[min(84vw,465px)] rounded-full border border-teal-700/20 dark:border-teal-300/15" />
            <div className="absolute -z-10 h-[min(96vw,545px)] w-[min(96vw,545px)] rounded-full border border-slate-900/10 dark:border-white/10" />
            <span className="absolute right-[11%] top-[8%] text-4xl text-sky-700 dark:text-sky-300">
              ✳
            </span>
            <span className="absolute bottom-[16%] left-[3%] text-2xl text-orange-500 dark:text-orange-300">
              ✳
            </span>
            <div className="relative -z-10 h-[min(90vw,450px)] w-[min(80vw,400px)] overflow-hidden rounded-t-[48%] rounded-b-xl border border-teal-700/25 bg-teal-100 shadow-[22px_22px_0_rgba(8,127,128,0.1)] dark:border-teal-300/25 dark:bg-ink-800 dark:shadow-[22px_22px_0_rgba(112,232,218,0.1)]">
              <img
                className="h-full w-full object-cover object-[center_28%]"
                src={assetUrl('assets/Hero.jpg')}
                alt=""
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent" />
            </div>
            <div className="absolute left-0 top-[16%] flex items-center gap-2 rounded-lg border border-slate-900/10 bg-white/90 px-3.5 py-3 text-sm text-teal-800 shadow-xl backdrop-blur dark:border-white/15 dark:bg-ink-900/90 dark:text-teal-200">
              <Sparkles size={16} />
              Curiosity, always.
            </div>
            <div className="absolute bottom-[14%] right-0 flex items-center gap-3 rounded-lg border border-slate-900/10 bg-white/90 p-3 shadow-xl backdrop-blur dark:border-white/15 dark:bg-ink-900/90">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-teal-700 font-serif text-sm font-bold text-white dark:bg-teal-300 dark:text-ink-950">
                ND
              </span>
              <span>
                <strong className="block text-sm font-semibold">
                  Building with purpose
                </strong>
                <small className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                  One detail at a time
                </small>
              </span>
            </div>
            <span className="absolute bottom-2 right-1 text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
              A little about me — 2026
            </span>
          </MotionDiv>

          <a
            className="absolute bottom-7 left-0 inline-flex items-center gap-2.5 text-xs tracking-wide text-slate-500 dark:text-slate-400"
            href="#about"
          >
            Scroll to explore
            <ArrowDown className="text-teal-700 dark:text-teal-300" size={16} />
          </a>
        </section>

        <div className="border-y border-slate-900/10 bg-white/60 dark:border-white/10 dark:bg-ink-900/40">
          <div
            className="mx-auto flex w-[min(1200px,calc(100%-2.5rem))] flex-wrap items-center justify-center gap-x-7 gap-y-4 py-6 sm:w-[min(1200px,calc(100%-3.5rem))] md:min-h-[5.5rem]"
            aria-label="Technology skills"
          >
            <span className="w-full text-center text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 md:w-auto">
              Tools I work with
            </span>
            {skills.map(({ label, icon: Icon }) => (
              <span
                className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200"
                key={label}
              >
                {createElement(Icon, {
                  className: 'text-teal-700 dark:text-teal-300',
                  'aria-hidden': true,
                })}
                {label}
              </span>
            ))}
          </div>
        </div>

        <section
          className="mx-auto w-[min(1200px,calc(100%-2rem))] py-16 sm:w-[min(1200px,calc(100%-3.5rem))] sm:py-24 md:py-32"
          id="about"
        >
          <SectionHeading
            eyebrow="A bit about me"
            number="01"
            title={
              <>
                Good work starts
                <br />
                with <span className="text-sky-700 dark:text-sky-300">good questions.</span>
              </>
            }
            description="I care about how things work just as much as how they feel."
          />

          <div className="grid items-center gap-8 md:grid-cols-[1.1fr_0.9fr] md:gap-[10%]">
            <MotionDiv
              className="max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55 }}
            >
              <p className="mb-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                With a background in Computer Engineering and hands-on
                experience across frontend and backend development, I bring
                ideas to life with care, curiosity, and a practical mindset.
              </p>
              <p className="mb-5 text-base leading-8 text-slate-600 dark:text-slate-300">
                I enjoy building clean interfaces, learning new tools, and
                working through the little details that make a product feel
                effortless.
              </p>
              <a
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-teal-800 dark:text-teal-200"
                href="#experience"
              >
                More about my journey <ArrowRight size={17} />
              </a>
            </MotionDiv>

            <MotionDiv
              className="relative min-h-[16rem] overflow-hidden rounded-xl border border-slate-900/10 bg-gradient-to-br from-white via-teal-50 to-teal-100 p-8 dark:border-white/10 dark:from-ink-900 dark:via-ink-900 dark:to-teal-950"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              <div className="grid h-11 w-11 place-items-center rounded-lg border border-teal-700/25 text-teal-800 dark:border-teal-300/30 dark:text-teal-200">
                <Layers3 size={22} />
              </div>
              <span className="mt-6 block text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                My approach
              </span>
              <h3 className="relative z-10 mt-2 max-w-xs text-2xl font-semibold tracking-tight">
                From first sketch to final detail.
              </h3>
              <p className="relative z-10 mt-2 max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">
                Thoughtful design, solid engineering, and a little curiosity in
                every build.
              </p>
              <span className="pointer-events-none absolute -bottom-5 right-4 -rotate-6 text-6xl font-black leading-[0.8] tracking-[-0.1em] text-teal-800/10 dark:text-teal-200/10">
                MAKE IT
                <br />
                MATTER
              </span>
            </MotionDiv>
          </div>
        </section>

        <section
          className="mx-auto w-[min(1200px,calc(100%-2rem))] py-12 sm:w-[min(1200px,calc(100%-3.5rem))] sm:py-16 md:py-24"
          id="work"
        >
          <SectionHeading
            eyebrow="Selected work"
            number="02"
            title={
              <>
                A few things I&apos;ve
                <br />
                <span className="text-sky-700 dark:text-sky-300">put into the world.</span>
              </>
            }
            description="All six public project repositories, ordered by scope and technical novelty."
          />

          <div className="grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2">
            {projects.map((project, index) => {
              const visual = projectVisuals[project.motif];
              return (
                <MotionArticle
                  className="overflow-hidden rounded-xl border border-slate-900/10 bg-white transition duration-200 hover:-translate-y-1 hover:border-teal-700/40 hover:shadow-xl dark:border-white/10 dark:bg-ink-900 dark:hover:border-teal-300/40"
                  key={project.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
                >
                  <div
                    className={`relative grid h-56 place-items-center overflow-hidden ${visual.surface} sm:h-64 lg:h-72`}
                  >
                    <img
                      className="absolute inset-0 h-full w-full object-cover"
                      src={assetUrl(project.imagePath)}
                      alt={`${project.title} project preview`}
                      loading="lazy"
                      onError={(event) => event.currentTarget.remove()}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-slate-950/10" />
                    <span className="absolute left-4 top-4 z-10 text-xs tracking-widest text-white/80">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <div className="absolute h-56 w-56 rounded-full border border-white/15 before:absolute before:-inset-10 before:rounded-full before:border before:border-white/10 before:content-['']" />
                    <div className={`relative rounded-full ${visual.first}`} />
                    <div className={`absolute rounded-full ${visual.second}`} />
                    <div className={`absolute ${visual.third}`} />
                    <span className="absolute bottom-4 right-5 text-[11px] tracking-[0.14em] text-white/75">
                      {visual.label}
                    </span>
                    <a
                      className="absolute bottom-4 left-4 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-slate-950/60 text-white transition hover:bg-teal-300 hover:text-ink-950"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title} on GitHub`}
                    >
                      <ArrowUpRight size={19} />
                    </a>
                  </div>
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-3">
                      <h3 className="text-xl font-semibold tracking-tight">
                        {project.title}
                      </h3>
                      <a
                        className="inline-flex items-center gap-1 text-sm font-medium text-sky-800 dark:text-sky-200"
                        href={project.href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View project <ArrowUpRight size={15} />
                      </a>
                    </div>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          className="rounded-md border border-slate-900/10 px-2.5 py-1.5 text-xs text-slate-700 dark:border-white/15 dark:text-slate-200"
                          key={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </MotionArticle>
              );
            })}
          </div>
        </section>

        <section
          className="mx-auto w-[min(1200px,calc(100%-2rem))] py-12 sm:w-[min(1200px,calc(100%-3.5rem))] sm:py-16 md:py-24"
          id="experience"
        >
          <SectionHeading
            eyebrow="The journey so far"
            number="03"
            title={
              <>
                Experience &amp;
                <br />
                <span className="text-sky-700 dark:text-sky-300">learning by doing.</span>
              </>
            }
            description="Every team, project, and new skill has added another layer to the way I build."
          />

          <div className="grid grid-cols-1 items-start gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.86fr)] lg:gap-[9%]">
            <div className="min-w-0 border-t border-slate-900/10 dark:border-white/10">
              {experience.map((item, index) => (
                <MotionArticle
                  className="grid grid-cols-[minmax(5.5rem,7rem)_minmax(0,1fr)] gap-3 border-b border-slate-900/10 py-6 dark:border-white/10 sm:grid-cols-[minmax(6rem,8rem)_minmax(0,1fr)] sm:gap-5 sm:py-7"
                  key={item.organization}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                >
                  <span className="pt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {item.period}
                  </span>
                  <div className="relative border-l border-teal-700/20 pl-4 dark:border-teal-300/20 sm:pl-5">
                    <span className="absolute -left-1 top-1 h-2 w-2 rounded-full border border-teal-700 bg-slate-50 dark:border-teal-300 dark:bg-ink-950" />
                    <h3 className="text-base font-semibold sm:text-lg">
                      {item.role}
                    </h3>
                    <span className="mt-1.5 block text-sm font-medium text-teal-800 dark:text-teal-200">
                      {item.organization}
                    </span>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                </MotionArticle>
              ))}
            </div>

            <aside className="min-w-0 rounded-xl border border-slate-900/10 bg-white p-5 dark:border-white/10 dark:bg-ink-900 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                    Keep learning
                  </span>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight">
                    Curiosity, certified.
                  </h3>
                </div>
                <span className="text-base text-teal-700 dark:text-teal-300">
                  05
                </span>
              </div>
              <div className="border-t border-slate-900/10 dark:border-white/10">
                {certificates.map((certificate) => {
                  const content = (
                    <>
                      <img
                        className="h-10 w-12 shrink-0 rounded bg-slate-100 object-cover dark:bg-ink-800"
                        src={certificate.image}
                        alt=""
                        loading="lazy"
                      />
                      <span className="min-w-0 flex-1">
                        <strong className="block truncate text-sm font-medium">
                          {certificate.title}
                        </strong>
                        <small className="mt-1 block text-xs text-slate-500 dark:text-slate-400">
                          {certificate.issuer} · {certificate.date}
                        </small>
                      </span>
                      {certificate.href && (
                        <ArrowUpRight
                          className="shrink-0 text-slate-500 dark:text-slate-400"
                          size={17}
                        />
                      )}
                    </>
                  );

                  return certificate.href ? (
                    <a
                      className="flex min-h-[4.5rem] items-center gap-3 border-b border-slate-900/10 py-2 transition-colors hover:text-teal-800 dark:border-white/10 dark:hover:text-teal-200"
                      href={certificate.href}
                      key={certificate.title}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View certificate: ${certificate.title}`}
                    >
                      {content}
                    </a>
                  ) : (
                    <div
                      className="flex min-h-[4.5rem] items-center gap-3 border-b border-slate-900/10 py-2 dark:border-white/10"
                      key={certificate.title}
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            </aside>
          </div>
        </section>

        <section
          className="mx-auto w-[min(1200px,calc(100%-2rem))] py-10 sm:w-[min(1200px,calc(100%-3.5rem))] sm:py-12 md:py-24"
          id="contact"
        >
          <div className="relative isolate overflow-hidden rounded-xl bg-teal-200 px-5 py-8 text-teal-950 dark:bg-teal-300 sm:px-10 sm:py-10 md:px-16 md:py-20">
            <div className="absolute -right-24 -top-44 -z-10 h-[35rem] w-[35rem] rounded-full border border-teal-950/15 before:absolute before:inset-10 before:rounded-full before:border before:border-teal-950/15 before:content-[''] after:absolute after:inset-24 after:rounded-full after:border after:border-teal-950/15 after:content-['']" />
            <span className="inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.12em]">
              <span className="text-sm">04</span>
              Have something in mind?
            </span>
            <h2 className="mt-5 text-[clamp(3rem,11vw,6.25rem)] font-medium leading-[0.9] tracking-[-0.09em] sm:text-[clamp(3.6rem,8.4vw,6.25rem)]">
              Let&apos;s make
              <br />
              <span className="text-teal-800 dark:text-teal-900">it happen.</span>
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-teal-950/80">
              I&apos;m always happy to connect, talk through an idea, or hear
              about something interesting you&apos;re working on.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socials.map(({ href, label, icon: Icon }) => (
                <a
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-teal-950/25 px-3.5 text-sm font-medium transition hover:bg-teal-950/5"
                  href={href}
                  key={label}
                  target="_blank"
                  rel="noreferrer"
                >
                  {createElement(Icon, { size: 18 })}
                  Say hello on {label}
                  <ArrowUpRight size={16} />
                </a>
              ))}
            </div>
            <span className="pointer-events-none absolute -bottom-14 right-8 -z-10 font-serif text-[19rem] font-bold leading-none tracking-[-0.15em] text-teal-950/[0.08]">
              ND
            </span>
          </div>
        </section>
      </main>

      <footer className="mx-auto grid min-h-24 w-[min(1200px,calc(100%-2rem))] grid-cols-1 items-center gap-4 border-t border-slate-900/10 py-5 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400 sm:w-[min(1200px,calc(100%-3.5rem))] sm:grid-cols-2 md:grid-cols-4">
        <a className="inline-flex items-center gap-2.5 font-semibold text-slate-900 dark:text-slate-100" href="#home">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-teal-700 font-serif text-lg text-white dark:bg-teal-300 dark:text-ink-950">
            N
          </span>
          Naitik Dholakiya
        </a>
        <span className="hidden md:block">Designed with care. Built for the web.</span>
        <a className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-200 sm:justify-self-end" href="#home">
          Back to top <ArrowUpRight size={15} />
        </a>
        <small className="text-xs sm:col-span-2 md:col-span-1 md:justify-self-end">
          © {new Date().getFullYear()} Naitik Dholakiya
        </small>
      </footer>
    </div>
  );
}

export default Home;
