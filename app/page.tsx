"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Code, Sparkles, Zap, Users, Rocket, Send, Github, Facebook } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "StudyFlow – Personal Study Planner",
    stack: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    focus: "Front-end fundamentals and responsive layout.",
    bullets: [
      "Built a responsive layout that works across mobile and desktop.",
      "Handled task creation, prioritization, and filtering with vanilla JavaScript.",
      "Persisted tasks locally so data survives page reloads.",
    ],
  },
  {
    title: "CampusConnect – Mini Community Board",
    stack: ["React", "CSS Modules", "Mock JSON API"],
    focus: "Component-based UI and data fetching in React.",
    bullets: [
      "Designed reusable components for posts, tags, and search.",
      "Managed state for creating and filtering posts.",
      "Integrated a mock API to simulate real data flows.",
    ],
  },
  {
    title: "DevPortfolio v2 – This Portfolio",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    focus: "Production-ready portfolio with modern tooling.",
    bullets: [
      "Built a fast, SEO-friendly site with file-based routing.",
      "Used reusable components for sections and project cards.",
      "Prepared for simple deployment and continuous delivery on Vercel.",
    ],
  },
];

const skills = [
  { name: "HTML/CSS", level: 95},
  { name: "JavaScript", level: 88},
  { name: "React", level: 85},
  { name: "Next.js", level: 80},
  { name: "TypeScript", level: 75},
  { name: "Git & GitHub", level: 85},
];

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully!");
        form.reset();
      } else {
        console.log("Error:", data);
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResult("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setResult(""), 5000);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-2xl mx-auto">
      <input type="hidden" name="access_key" value="baa1a2d6-14ef-4525-bfb8-640c2e917a1a" />
      
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-3 rounded-xl border border-violet-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all outline-none"
            placeholder="Your name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 rounded-xl border border-violet-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all outline-none"
            placeholder="your@email.com"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          className="w-full px-4 py-3 rounded-xl border border-violet-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all outline-none"
          placeholder="What's this about?"
          required
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="w-full px-4 py-3 rounded-xl border border-violet-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all outline-none resize-none"
          placeholder="Tell me about your project or inquiry..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full group flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>

      {result && (
        <div className={`text-center p-4 rounded-xl ${
          result.includes("success") 
            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" 
            : result.includes("Sending")
            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
            : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
        }`}>
          {result}
        </div>
      )}
    </form>
  );
}

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Dynamic background effects */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`,
        }}
      />

      <div className="relative z-10">
        {/* Hero Section (global Navbar is rendered from layout.tsx) */}
        <section className="min-h-screen flex items-center pt-20">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-violet-100 to-fuchsia-100 dark:from-violet-900/30 dark:to-fuchsia-900/30 border border-violet-200 dark:border-violet-800">
                  <Sparkles className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  <span className="text-sm font-medium text-violet-700 dark:text-violet-300">
                    Hello there! I&apos;m
                  </span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="block text-gray-900 dark:text-white">
                    Cresan J.
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 animate-gradient">
                    Cuanan
                  </span>
                </h1>
                
                <h2 className="text-2xl sm:text-3xl text-gray-600 dark:text-gray-300 font-medium">
                  <span className="inline-flex items-center gap-2">
                    Web Developer <Code className="w-6 h-6 text-violet-500" />
                  </span>
                  <span className="block mt-2">
                    & 3rd Year IT Student
                  </span>
                </h2>
                
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed">
                  I build exceptional digital experiences that are fast, accessible, visually appealing, and responsive. 
                  Currently mastering modern web technologies while pursuing my IT degree.
                </p>
                
                <div className="flex flex-wrap gap-4 pt-6">
                  <Link
                    href="/projects"
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-300 hover:scale-105"
                  >
                    <span>View Projects</span>
                    <div className="absolute inset-0 rounded-full animate-shimmer" />
                  </Link>
                  
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 font-semibold hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-all duration-300 hover:scale-105"
                  >
                    <span>Get In Touch</span>
                    <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[28rem] aspect-square rounded-full overflow-hidden border-4 border-white/60 dark:border-gray-800/60 shadow-2xl">
                  <Image
                    src="/cuanan.jpg"
                    alt="Cresan J. Cuanan"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gradient-to-b from-transparent via-violet-50/30 to-transparent dark:via-violet-950/10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                  About Me
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Passionate about creating meaningful digital experiences
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  I&apos;m a 3rd-year IT student with a deep passion for web development and creating 
                  user-friendly digital solutions. My journey in tech has been driven by curiosity and 
                  a constant desire to learn and grow.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  From building simple HTML pages to developing full-stack applications with modern 
                  frameworks, I&apos;ve enjoyed every step of the learning process. I believe in writing 
                  clean, maintainable code and creating experiences that users love.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  When I&apos;m not coding, you can find me exploring new technologies, contributing to 
                  open-source projects, or collaborating with fellow developers to build something amazing.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-violet-200/50 dark:border-gray-800">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-2">
                    3+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Years of Study
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-violet-200/50 dark:border-gray-800">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-2">
                    10+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Projects Built
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-violet-200/50 dark:border-gray-800">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-2">
                    6+
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Technologies
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-violet-200/50 dark:border-gray-800">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-2">
                    100%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Dedication
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                  Technical Skills
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Continuously expanding my toolkit to build better solutions
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group relative p-6 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-violet-200/50 dark:border-gray-800 hover-3d hover:border-violet-300 dark:hover:border-violet-700 transition-all duration-300"
                >
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {skill.name}
                    </span>
                  </div>
                  
                  <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  
                  <div className="mt-2 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Beginner</span>
                    <span className="font-semibold text-violet-600 dark:text-violet-400">
                      {skill.level}%
                    </span>
                    <span>Expert</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Preview */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                  Featured Projects
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Showcasing my journey from fundamentals to modern web development
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8 mb-12">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm hover-3d transition-all duration-500"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />
                  
                  <div className="p-8">
                    <div className="mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center text-white font-bold text-lg mb-4 group-hover:rotate-12 transition-transform">
                        0{index + 1}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {project.focus}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-sm font-medium rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {project.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-gray-600 dark:text-gray-400">
                          <div className="w-5 h-5 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="px-8 pb-8">
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-2 text-violet-600 dark:text-violet-400 font-semibold group/link"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-4 px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-300 hover:scale-105"
              >
                <span>Explore All Projects</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <div className="relative rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10" />
              
              <div className="relative backdrop-blur-sm bg-white/50 dark:bg-gray-900/50 border border-violet-200/50 dark:border-gray-800 rounded-3xl p-12">
                <div className="text-center mb-10">
                  <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                      Get In Touch
                    </span>
                  </h2>
                  
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Have a question or want to work together? Send me a message!
                  </p>
                </div>
                
                <ContactForm />
                
                <div className="flex flex-wrap justify-center gap-6 mt-10 pt-10 border-t border-violet-200 dark:border-gray-700">
                  <a
                    href="https://github.com/Cresancuanan200405"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-8 py-4 rounded-full border-2 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 font-semibold hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-all duration-300 hover:scale-105"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                  
                  <a
                    href="https://www.facebook.com/cresan.cuanan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 px-8 py-4 rounded-full border-2 border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 font-semibold hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-all duration-300 hover:scale-105"
                  >
                    <Facebook className="w-5 h-5" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}