import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
import DOMPurify from 'dompurify';
import { Github, Linkedin, Mail, Send, Briefcase, Code, User, Home, ChevronsDown, ExternalLink, Server, Smartphone, Brain } from 'lucide-react';
import BirukImg from './assets/Biruk.png';

// Helper component for section titles
const SectionTitle = ({ children }) => (
  <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-cyan-400 tracking-wider">
    {children}
  </h2>
);

// Navigation Component
const Navigation = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', href: '#home', label: 'Home', icon: <Home size={18} /> },
    { id: 'about', href: '#about', label: 'About', icon: <User size={18} /> },
    { id: 'projects', href: '#projects', label: 'Projects', icon: <Code size={18} /> },
    { id: 'experience', href: '#experience', label: 'Experience', icon: <Briefcase size={18} /> },
    { id: 'contact', href: '#contact', label: 'Contact', icon: <Mail size={18} /> },
  ];

  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#home" onClick={(e) => smoothScroll(e, '#home')} className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
          Biruk.
        </a>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => smoothScroll(e, link.href)}
                className={`
                  text-gray-300 transition-all duration-300 flex items-center space-x-2 group
                  ${isActive
                    ? 'text-cyan-300 scale-110 shadow-[0_0_10px_rgba(6,182,212,0.7)] px-2 py-1 rounded-md'
                    : 'hover:text-cyan-400'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.icon}
                <span className={`${isActive ? '' : 'group-hover:underline'}`}>{link.label}</span>
              </a>
            );
          })}
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-300 focus:outline-none" aria-label="Toggle menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900/90 backdrop-blur-md py-2">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => smoothScroll(e, link.href)}
                className={`
                  block px-6 py-3 text-gray-300 transition-colors duration-300 flex items-center space-x-3
                  ${isActive ? 'text-cyan-300 bg-gray-800' : 'hover:text-cyan-400 hover:bg-gray-800'}
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.icon}
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [typedTagline, setTypedTagline] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const taglineParts = ["Aspiring Software Engineer", "Front End Developer"];
  const typingSpeed = 100; // Milliseconds
  const pauseBetweenParts = 1000; // Milliseconds

  useEffect(() => {
    let currentPartIndex = 0;
    let currentCharIndex = 0;
    let currentDisplay = "";
    let timeoutId;

    const type = () => {
      if (currentPartIndex < taglineParts.length) {
        const currentPart = taglineParts[currentPartIndex];
        if (currentCharIndex < currentPart.length) {
          currentDisplay += currentPart[currentCharIndex];
          setTypedTagline(currentDisplay);
          currentCharIndex++;
          timeoutId = setTimeout(type, typingSpeed);
        } else {
          currentPartIndex++;
          currentCharIndex = 0;
          if (currentPartIndex < taglineParts.length) {
            currentDisplay += " | ";
            setTypedTagline(currentDisplay);
            timeoutId = setTimeout(type, pauseBetweenParts);
          } else {
            setIsTypingComplete(true);
          }
        }
      } else {
        setIsTypingComplete(true);
      }
    };

    timeoutId = setTimeout(type, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const smoothScrollToSection = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden px-4">
      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-cyan-500 rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 50 + 10}px`,
              height: `${Math.random() * 50 + 10}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 5 + 5}s`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-900 via-transparent to-gray-900 opacity-50 animate-gradient-xy"></div>
      </div>

      <div className="z-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 animate-text-glow">
            Biruk
          </span>
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-8 font-light tracking-wide h-16 md:h-auto">
          <span className="animate-text-glow-subtle">{typedTagline}</span>
          {!isTypingComplete && <span className="animate-typing-cursor">|</span>}
        </p>
        <div className="space-x-4">
          <a
            href="#projects"
            onClick={(e) => smoothScrollToSection(e, '#projects')}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 inline-block"
          >
            View My Work
          </a>
          <a
            href="#contact"
            onClick={(e) => smoothScrollToSection(e, '#contact')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 inline-block mt-4 sm:mt-0"
          >
            Get In Touch
          </a>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <a href="#about" onClick={(e) => smoothScrollToSection(e, '#about')} aria-label="Scroll to About section">
          <ChevronsDown size={48} className="text-gray-500 animate-bounce hover:text-cyan-400 transition-colors" />
        </a>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  const skills = [
    { name: "JavaScript", icon: <Code size={24} className="text-yellow-400" />, level: "66%" },
    { name: "React", icon: <Code size={24} className="text-blue-400" />, level: "40%" },
    { name: "Node.js", icon: <Server size={24} className="text-green-400" />, level: "30%" },
    { name: "Python", icon: <Code size={24} className="text-blue-500" />, level: "40%" },
    { name: "Java", icon: <Code size={24} className="text-red-500" />, level: "40%" },
    { name: "SQL & NoSQL", icon: <Server size={24} className="text-indigo-400" />, level: "65%" },
    { name: "Tailwind CSS", icon: <Code size={24} className="text-teal-400" />, level: "30%" },
    { name: "Git & GitHub", icon: <Github size={24} className="text-gray-400" />, level: "50%" },
  ];

  const [skillsInView, setSkillsInView] = useState(false);
  const skillsContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.4,
      }
    );

    const currentRef = skillsContainerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 px-4 container mx-auto">
      <SectionTitle>About Me</SectionTitle>
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
          <div className="relative group w-64 h-64 md:w-72 md:h-72">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition duration-1000 group-hover:duration-300 animate-tilt">
            </div>
            <img
              src={BirukImg}
              alt="Biruk"
              className="relative rounded-xl w-full h-full object-cover object-top shadow-2xl border-2 border-gray-700/50"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/320x320/1A202C/718096?text=Image+Error"; }}
            />
          </div>
        </div>
        <div>
          <div className="prose prose-lg text-gray-300 max-w-none leading-relaxed mb-10">
            <p>
              Hello! I'm Biruk, an aspiring software engineer with a passion for developing innovative solutions and impactful web applications. My journey in tech began with an internship at the Ethiopian Federal Civil Service, where I worked on simple to intermediate projects that sparked my interest in software development.
            </p>
            <p>
              I specialize in front-end development, with a strong foundation in modern JavaScript frameworks like React. I enjoy transforming complex ideas into user-friendly, efficient, and visually appealing digital experiences. I'm constantly updating myself to become proficient in specific subjects and am always eager to learn and take on new challenges.
            </p>
            <p>
              When I'm not coding, you might find me exploring new technologies, contributing to open-source projects, or brainstorming my next big idea. I'm always eager to learn, collaborate, and take on new challenges.
            </p>
          </div>
          <div ref={skillsContainerRef}>
            <h3 className="text-2xl font-semibold text-cyan-400 mb-6">My Skills</h3>
            <div className="space-y-5">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-200 font-medium flex items-center">
                      {skill.icon} <span className="ml-2">{skill.name}</span>
                    </span>
                    <span className="text-sm text-gray-400">{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 h-3 rounded-full relative"
                      style={{
                        width: skillsInView ? skill.level : '0%',
                        transition: 'width 1.5s ease-out',
                        transitionDelay: skillsInView ? `${index * 0.15}s` : '0s',
                      }}
                    >
                      {skillsInView && (
                        <span
                          className="absolute top-1/2 -right-0.5 w-2.5 h-2.5 rounded-full bg-yellow-300 animate-sparkle-pulse"
                          style={{
                            transform: 'translateY(-50%)',
                            animationDelay: `${index * 0.15 + 0.1}s`,
                          }}
                        ></span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  const projects = [
    {
      title: "Drawing App",
      description: "A web app for drawing and visualizing complex datasets using D3.js and React, offering interactive charts and graphs.",
      tech: ["React", "Tailwind CSS"],
      imageUrl: "https://cdn.pixabay.com/photo/2023/12/07/11/11/girl-8435339_1280.png", // Image for Drawing App
      projectLink: "https://drawing-sandy.vercel.app/"
    },
    {
      title: "Quiz App",
      description: "A concept quiz app with a focus on UI/UX, built with React and Tailwind CSS.",
      tech: ["React", "Tailwind CSS"],
      imageUrl: "https://media.istockphoto.com/id/2172452640/vector/question-mark-seamless-repeating-tileable-background.webp?s=2048x2048&w=is&k=20&c=FxWCXZE2zc7JgzK4UYtKqW6eTocgihLcXOMXXr052KU=", // Image for Quiz App
      projectLink: "https://quiz-app-inky-psi.vercel.app/"
    },
    {
      title: "Progress Bar Project",
      description: "A project showcasing progress bars with various features, built with React and Tailwind CSS.",
      tech: ["React", "Tailwind CSS"],
      imageUrl: "https://media.istockphoto.com/id/504749876/vector/glowing-colorful-loaders-set.webp?s=2048x2048&w=is&k=20&c=ddo5HE2MaH0SbC0A4clGLnhX1SjyD0_o7O3W5TTRQCw=", // Image for Progress Bar Project
      projectLink: "https://progress-bar-two-xi.vercel.app/"
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 container mx-auto">
      <SectionTitle>My Projects</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform group flex flex-col transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.4),_0_0_10px_rgba(139,92,246,0.3)]"
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-56 object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/1A202C/718096?text=Image+Error"; }}
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold mb-3 text-cyan-400">{project.title}</h3>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed flex-grow">{project.description}</p>
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="bg-gray-700 text-cyan-300 px-3 py-1 rounded-full text-xs font-medium">{t}</span>
                  ))}
                </div>
              </div>
              <div className="mt-auto flex justify-end items-center pt-4 border-t border-gray-700">
                <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 transition-colors duration-300 flex items-center text-sm">
                  <ExternalLink size={18} className="mr-2" /> View Project
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Experience Section Component
const ExperienceSection = () => {
  const experiences = [
    {
      role: "Software Engineer Intern",
      company: "Ethiopian Federal Civil Service",
      duration: "2023",
      description: [
        "Gained experience in a professional work environment.",
        "Worked with SQL and other technologies to manage and analyze data.",
        "Collaborated with teams to develop and maintain internal systems."
      ],
      icon: <Briefcase size={32} className="text-cyan-400" />
    },
    {
      role: "Web Developer",
      company: "Freelance",
      duration: "2023 - Present",
      description: [
        "Collaborated with teams to work on an e-commerce website with delivery features.",
        "Developed and maintained user-friendly interfaces using React and Tailwind CSS.",
        "Worked closely with clients to understand requirements and deliver custom solutions."
      ],
      icon: <Code size={32} className="text-cyan-400" />
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 container mx-auto">
      <SectionTitle>My Experience</SectionTitle>
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-700 hidden md:block transform -translate-x-1/2"></div>

        {experiences.map((exp, index) => (
          <div key={index} className={`mb-12 flex md:items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
            <div className="hidden md:block w-1/2"></div>
            <div className="hidden md:block relative">
              <div className="absolute w-6 h-6 bg-cyan-500 rounded-full z-10 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-gray-900"></div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl w-full md:w-1/2 md:max-w-md transform hover:shadow-cyan-500/30 transition-shadow duration-300">
              <div className="flex items-center mb-3">
                {exp.icon}
                <div className="ml-4">
                  <h3 className="text-2xl font-semibold text-cyan-400">{exp.role}</h3>
                  <p className="text-purple-400 font-medium">{exp.company}</p>
                  <p className="text-gray-500 text-sm">{exp.duration}</p>
                </div>
              </div>
              <ul className="list-disc list-inside text-gray-400 space-y-2 text-sm leading-relaxed">
                {exp.description.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          </div>
        ))}
        {experiences.length === 0 && (
          <p className="text-center text-gray-400 text-lg">Eager to gain professional experience and contribute to exciting projects!</p>
        )}
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const formData = {
      user_name: DOMPurify.sanitize(formRef.current.user_name.value),
      user_email: DOMPurify.sanitize(formRef.current.user_email.value),
      message: DOMPurify.sanitize(formRef.current.message.value),
    };

    console.log('Sending email with data:', formData);

    try {
      const result = await emailjs.send(
        'service_vhfjyip', // Replace with your actual EmailJS service ID
        'template_srhc5vt', // Replace with your actual EmailJS template ID
        formData,
        '6X9IaW7_HdGChYrSt' // Replace with your actual EmailJS user ID
      );
      console.log('Email sent successfully:', result.text);
      setSubmitStatus('success');
      formRef.current.reset();
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 container mx-auto">
      <SectionTitle>Get In Touch</SectionTitle>
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 md:p-12 rounded-xl shadow-2xl">
        <p className="text-center text-gray-400 mb-8">
          Have a project in mind, a question, or just want to connect? Feel free to reach out!
        </p>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="user_name" className="block text-sm font-medium text-cyan-400 mb-1">Full Name</label>
            <input
              type="text"
              name="user_name"
              id="user_name"
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-colors"
              placeholder="Your Name"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="user_email" className="block text-sm font-medium text-cyan-400 mb-1">Email Address</label>
            <input
              type="email"
              name="user_email"
              id="user_email"
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-colors"
              placeholder="your.email@example.com"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-cyan-400 mb-1">Message</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-colors resize-none"
              placeholder="Your message..."
              aria-required="true"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Send size={20} />
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
            </button>
          </div>
          {submitStatus === 'success' && (
            <p className="text-green-500 text-center pt-2">
              Thank you for your message! I will get back to you soon.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-500 text-center pt-2">
              There was an error sending your message. Please try again later.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const socialLinks = [
    { href: "https://github.com/babi127", icon: <Github size={24} />, label: "GitHub" },
    { href: "https://www.linkedin.com/in/biruk-tesfaye-0642b4284/", icon: <Linkedin size={24} />, label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-700 py-12 text-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6 mb-6">
          {socialLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 transform hover:scale-110"
            >
              {link.icon}
            </a>
          ))}
        </div>
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Biruk. All rights reserved.
        </p>
        <p className="text-gray-600 text-xs mt-2">
          Built with React & Tailwind CSS. Designed with a futuristic vision.
        </p>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = {
    home: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    experience: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && document.documentElement) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px 0px 0px',
      threshold: 0.4
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const refs = Object.values(sectionRefs);
    refs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="bg-gray-900 text-gray-100 font-sans leading-normal tracking-normal antialiased">
      <style jsx global>{`
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 5px #06B6D4, 0 0 10px #06B6D4, 0 0 15px #8B5CF6, 0 0 20px #8B5CF6; }
          50% { text-shadow: 0 0 10px #06B6D4, 0 0 20px #06B6D4, 0 0 30px #8B5CF6, 0 0 40px #8B5CF6; }
        }
        .animate-text-glow {
          animation: text-glow 4s ease-in-out infinite alternate;
        }
        @keyframes text-glow-subtle {
          0%, 100% { text-shadow: 0 0 3px rgba(6, 182, 212, 0.5), 0 0 5px rgba(139, 92, 246, 0.4); }
          50% { text-shadow: 0 0 5px rgba(6, 182, 212, 0.7), 0 0 8px rgba(139, 92, 246, 0.6); }
        }
        .animate-text-glow-subtle {
          animation: text-glow-subtle 3s infinite alternate;
        }
        @keyframes gradient-xy {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        .animate-gradient-xy {
            background-size: 200% 200%;
            animation: gradient-xy 15s ease infinite;
        }
        @keyframes sparkle-pulse {
          0%, 100% {
            transform: translateY(-50%) scale(1);
            opacity: 0.7;
            box-shadow: 0 0 5px 1px rgba(250, 204, 21, 0.7);
          }
          50% {
            transform: translateY(-50%) scale(1.3);
            opacity: 1;
            box-shadow: 0 0 8px 3px rgba(250, 204, 21, 0.9);
          }
        }
        .animate-sparkle-pulse {
          animation: sparkle-pulse 1.2s infinite ease-in-out;
        }
        @keyframes tilt {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(0.3deg); }
          75% { transform: rotate(-0.3deg); }
        }
        .animate-tilt {
          animation: tilt 12s infinite linear;
        }
        @keyframes typing-cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-typing-cursor {
          display: inline-block;
          animation: typing-cursor-blink 0.9s infinite;
          margin-left: 2px;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1a202c;
        }
        ::-webkit-scrollbar-thumb {
          background: #4a5568;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #06B6D4;
        }
      `}</style>

      <Navigation activeSection={activeSection} />

      <div id="home" ref={sectionRefs.home}><HeroSection /></div>
      <main>
        <div id="about" ref={sectionRefs.about}><AboutSection /></div>
        <div id="projects" ref={sectionRefs.projects}><ProjectsSection /></div>
        <div id="experience" ref={sectionRefs.experience}><ExperienceSection /></div>
        <div id="contact" ref={sectionRefs.contact}><ContactSection /></div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
