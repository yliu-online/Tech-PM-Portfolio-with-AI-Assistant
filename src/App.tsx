/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import emailjs from '@emailjs/browser';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Briefcase, 
  Code, 
  FileText, 
  MessageSquare, 
  Mail, 
  Linkedin, 
  Github, 
  Twitter, 
  ExternalLink, 
  ChevronRight, 
  Send,
  Sparkles,
  ArrowUpRight,
  Menu,
  X,
  Download,
  CheckCircle2,
  BarChart3
} from 'lucide-react';
import Markdown from 'react-markdown';
import { portfolioData } from './data';
import { aiService } from './services/aiService';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Ask AI', href: '#ask-ai' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'bg-navy-950/95 md:bg-white/5 backdrop-blur-md border-b md:border border-white/10 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-navy-950 font-black">PM</div>
          <span className="hidden sm:inline">YANG LIU</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            className="px-4 py-2 bg-white text-navy-950 rounded-full text-sm font-bold hover:bg-accent transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-navy-950/95 backdrop-blur-md border-b border-white/10 p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-slate-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                className="w-full py-3 bg-white text-navy-950 rounded-xl text-center font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
            <span className="gradient-text">Yang Liu</span>
            <br />
            <span className="text-slate-500 text-2xl md:text-3xl block mt-6 font-medium tracking-wide border-l-2 border-accent/30 pl-6">
              Product Leader <br className="hidden md:block" />
              <span className="text-slate-600 text-xl md:text-2xl">Cloud, AI & GenAI Platforms</span>
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-lg leading-relaxed">
            {portfolioData.valueProp}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <a href="#projects" className="px-8 py-4 bg-white text-navy-950 rounded-xl font-bold flex items-center gap-2 hover:bg-accent transition-all group">
              Explore Projects <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a href="#ask-ai" className="px-8 py-4 glass text-white rounded-xl font-bold hover:bg-white/10 transition-all">
              Ask AI
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
            {portfolioData.stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div 
            className="aspect-square rounded-full overflow-hidden relative group border-4 border-white/10"
            style={{
              backgroundColor: '#ffffff',
              backgroundImage: `url(${portfolioData.profileImage || "https://picsum.photos/seed/yang-liu/800/800"})`,
              backgroundSize: '100000% 100000%',
              backgroundPosition: '5% 5%',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <img 
              src={portfolioData.profileImage || "https://picsum.photos/seed/yang-liu/800/800"} 
              alt="Yang Liu" 
              className="w-full h-full object-contain scale-[0.80] translate-y-2"
              referrerPolicy="no-referrer"
            />
          </div>
            
          {/* Floating UI elements */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-4 -right-20 glass p-4 rounded-2xl flex items-center gap-3 z-10"
          >
            <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400">
              <BarChart3 size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase">Growth</div>
              <div className="text-lg font-bold text-white">+150% YoY</div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            className="absolute -bottom-12 left-4 glass p-4 rounded-2xl flex items-center gap-3 z-10"
          >
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-accent">
              <CheckCircle2 size={20} />
            </div>
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase">Launched</div>
              <div className="text-lg font-bold text-white">0→1 Products</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-navy-900/50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <h2 className="text-sm font-black text-accent uppercase tracking-[0.3em] mb-4">About Me</h2>
            <h3 className="text-4xl font-bold leading-tight">Bridging the gap between tech and users</h3>
          </div>
          <div className="lg:col-span-2 space-y-8">
            <p className="text-xl text-slate-400 leading-relaxed">
              {portfolioData.about.bio}
            </p>
            <div className="p-8 rounded-3xl glass border-l-4 border-l-accent">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Sparkles size={20} className="text-accent" /> Product Philosophy
              </h4>
              <p className="text-slate-300 italic text-lg leading-relaxed">
                "{portfolioData.about.philosophy}"
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {portfolioData.about.industries.map((ind) => (
                <span key={ind} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-slate-300">
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-black text-accent uppercase tracking-[0.3em] mb-4">Experience</h2>
          <h3 className="text-4xl font-bold">Professional Journey</h3>
        </div>

        <div className="space-y-12">
          {portfolioData.experience.map((exp: any, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative grid grid-cols-1 md:grid-cols-12 gap-8 p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 border border-transparent hover:border-white/10"
            >
              <div className="md:col-span-4 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="text-3xl font-black text-white group-hover:text-accent transition-colors">{exp.company}</div>
                  <div className="text-slate-300 font-bold text-sm uppercase tracking-widest">{exp.period}</div>
                </div>
              </div>
              <div className="md:col-span-8">
                <h4 className="text-2xl font-bold mb-4 text-slate-200">{exp.role}</h4>
                <ul className="space-y-3 mb-6">
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-400 leading-relaxed">
                      <ChevronRight size={18} className="text-accent shrink-0 mt-1" />
                      {ach}
                    </li>
                  ))}
                </ul>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-sm font-bold">
                  <BarChart3 size={16} /> {exp.metrics}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const handleDeepDive = (projectTitle: string) => {
    const aiSection = document.getElementById('ask-ai');
    if (aiSection) {
      if (window.innerWidth <= 768) {
        const chatContainer = aiSection.querySelector('.glass.rounded-3xl');
        if (chatContainer) {
          chatContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
          aiSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        const chatContainer = aiSection.querySelector('.glass.rounded-3xl');
        if (chatContainer) {
          chatContainer.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
          aiSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      // Small delay to ensure scroll starts before event
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('ai-deep-dive', { detail: projectTitle }));
      }, 100);
    }
  };

  return (
    <section id="projects" className="py-24 bg-navy-900/50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2 className="text-sm font-black text-accent uppercase tracking-[0.3em] mb-4">Featured Projects</h2>
            <h3 className="text-4xl font-bold">Impactful Case Studies</h3>
          </div>
          <p className="text-slate-400 max-w-md">
            A selection of products I've led from ideation to market-leading status.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioData.projects.map((project, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -10 }}
              className="glass rounded-3xl overflow-hidden flex flex-col group"
            >
              <div className="aspect-video bg-navy-800 relative overflow-hidden">
                <img 
                  src={project.imageKeyword?.startsWith('http') ? project.imageKeyword : `https://picsum.photos/seed/${project.imageKeyword || project.title}/600/400`} 
                  alt={project.title}
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 rounded-md bg-navy-950/80 text-[10px] font-black uppercase tracking-wider text-accent border border-accent/20">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h4 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">{project.title}</h4>
                <div className="space-y-4 mb-8 flex-1">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Problem</div>
                    <p className="text-sm text-slate-400 line-clamp-2">{project.problem}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Solution</div>
                    <p className="text-sm text-slate-400 line-clamp-2">{project.solution}</p>
                  </div>
                  <div className="pt-4 border-t border-white/5">
                    <div className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                      <BarChart3 size={16} /> {project.impact}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeepDive(project.title)}
                  className="w-full py-3 rounded-xl border border-white/10 font-bold text-sm hover:bg-white hover:text-navy-950 transition-all flex items-center justify-center gap-2"
                >
                  Ask AI for Deep Dive <Sparkles size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skillCategories = [
    { name: 'Generative AI & LLMs', items: portfolioData.skills.generativeAI, icon: <Sparkles size={20} /> },
    { name: 'Cloud & Infrastructure', items: portfolioData.skills.cloudInfra, icon: <BarChart3 size={20} /> },
    { name: 'Product Leadership', items: portfolioData.skills.leadership, icon: <User size={20} /> },
    { name: 'Technical Background', items: portfolioData.skills.technical, icon: <Code size={20} /> },
  ];

  return (
    <section id="skills" className="py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-sm font-black text-accent uppercase tracking-[0.3em] mb-4">Skills</h2>
          <h3 className="text-4xl font-bold">Core Competencies</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="p-8 rounded-3xl glass hover:border-accent/30 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                {cat.icon}
              </div>
              <h4 className="text-xl font-bold mb-6">{cat.name}</h4>
              <div className="flex flex-col items-start gap-2">
                {cat.items.map(item => (
                  <span key={item} className="px-3 py-1.5 rounded-lg bg-white/5 text-sm font-medium text-slate-400 border border-white/5">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MessageBubble = React.memo(({ content, role, idx }: { content: string, role: 'user' | 'ai', idx: number }) => {
  return (
    <motion.div 
      id={`message-${idx}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`max-w-[85%] p-4 rounded-2xl ${
        role === 'user' 
          ? 'bg-accent text-navy-950 font-medium rounded-tr-none' 
          : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/10'
      }`}>
        <div className="markdown-body text-sm leading-relaxed relative">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </motion.div>
  );
});

const StreamingMessage = React.memo(({ content, idx }: { content: string, idx: number }) => {
  return (
    <motion.div 
      id={`message-${idx}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start"
    >
      <div className="max-w-[85%] p-4 rounded-2xl bg-white/10 text-slate-200 rounded-tl-none border border-white/10 transform-gpu will-change-transform min-h-[120px] transition-[min-height] duration-300 ease-out">
        <div className="markdown-body text-sm leading-relaxed relative">
          {content ? (
            <>
              <pre className="text-sm whitespace-pre-wrap font-sans m-0">
                {content}
              </pre>
              <span className="inline-block w-1.5 h-4 ml-1 bg-accent animate-pulse align-middle" />
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="inline-block w-1.5 h-4 bg-accent animate-pulse" />
              <span className="text-slate-400">Yang's AI assistant is thinking...</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

const AskAI = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: "Hi! I'm Yang's AI assistant. Ask me anything about their experience, skills, or projects." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const handleSendRef = useRef<any>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const activeStreamIdRef = useRef<number>(0);
  const streamBufferRef = useRef<string>('');
  const flushIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentIntervalRef = useRef<number>(80);
  const [streamingContent, setStreamingContent] = useState('');
  const lastRenderedLengthRef = useRef<number>(0);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;
      if (isNearBottom) {
        container.scrollTo({
          top: scrollHeight,
          behavior: 'auto'
        });
      }
    });

    if (chatEndRef.current?.parentElement) {
      observer.observe(chatEndRef.current.parentElement);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (flushIntervalRef.current) clearTimeout(flushIntervalRef.current);
      abortControllerRef.current?.abort();
    };
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMsg = text.trim();
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const streamId = Date.now();
    activeStreamIdRef.current = streamId;
    streamBufferRef.current = '';

    if (flushIntervalRef.current) clearTimeout(flushIntervalRef.current);

    setMessages(prev => {
      const nextMessages = [...prev, { role: 'user' as const, content: userMsg }];
      return [...nextMessages, { role: 'ai' as const, content: '' }];
    });
    
    setIsLoading(true);
    setIsStreaming(true);

    const triggerScroll = () => {
      scrollToBottom();
      const aiSection = document.getElementById('ask-ai');
      const chatContainer = aiSection?.querySelector('.glass.rounded-3xl');
      if (chatContainer) {
        if (window.innerWidth <= 768) {
          chatContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          const rect = chatContainer.getBoundingClientRect();
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          window.scrollTo({
            top: rect.top + scrollTop - 100,
            behavior: 'smooth'
          });
        }
      }
    };

    if (window.visualViewport) {
      let scrollTimeout: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          triggerScroll();
          window.visualViewport?.removeEventListener('resize', onResize);
        }, 100);
      };
      window.visualViewport.addEventListener('resize', onResize);
      setTimeout(() => {
        triggerScroll();
        window.visualViewport?.removeEventListener('resize', onResize);
      }, 300);
    } else {
      setTimeout(triggerScroll, 100);
    }

    const scheduleUpdate = () => {
      if (activeStreamIdRef.current !== streamId) return;
      requestAnimationFrame(() => {
        updateUI();
      });
    };

    const updateUI = () => {
      if (activeStreamIdRef.current === streamId) {
        const newLength = streamBufferRef.current.length;
        const delta = newLength - lastRenderedLengthRef.current;
        const dynamicThreshold = Math.max(30, newLength * 0.05);

        if (delta < dynamicThreshold && !abortController.signal.aborted) {
          flushIntervalRef.current = setTimeout(scheduleUpdate, currentIntervalRef.current);
          return;
        }

        lastRenderedLengthRef.current = newLength;

        const startTime = performance.now();
        let displayContent = streamBufferRef.current;
        const codeBlockCount = (displayContent.match(/```/g) || []).length;
        if (codeBlockCount % 2 !== 0) {
          displayContent += '\n```';
        }
        setStreamingContent(prev => prev !== displayContent ? displayContent : prev);
        
        const executionTime = performance.now() - startTime;
        if (executionTime > 50) {
          currentIntervalRef.current = Math.min(currentIntervalRef.current + 20, 250);
        } else if (executionTime < 20) {
          currentIntervalRef.current = Math.max(currentIntervalRef.current - 10, 150);
        }
        
        flushIntervalRef.current = setTimeout(scheduleUpdate, currentIntervalRef.current);
      }
    };
    currentIntervalRef.current = 180;
    lastRenderedLengthRef.current = 0;
    flushIntervalRef.current = setTimeout(scheduleUpdate, 180);

    try {
      const stream = aiService.askAboutMeStream(userMsg, abortController.signal);
      let isFirstChunk = true;
      
      for await (const chunk of stream) {
        if (abortController.signal.aborted) break;
        if (isFirstChunk) {
          setIsLoading(false);
          isFirstChunk = false;
          if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(10);
          }
        }
        streamBufferRef.current += chunk;
      }
    } catch (error: any) {
      if (error.name === 'AbortError' || abortController.signal.aborted) {
        return;
      }
      console.error(error);
      if (activeStreamIdRef.current === streamId) {
        streamBufferRef.current = "I'm experiencing some technical difficulties. Please try again later.";
      }
    } finally {
      if (activeStreamIdRef.current === streamId) {
        setIsLoading(false);
        setIsStreaming(false);
        setMessages(prev => {
          const nextMessages = [...prev];
          const lastIdx = nextMessages.length - 1;
          if (nextMessages[lastIdx]?.role === 'ai') {
            nextMessages[lastIdx] = { ...nextMessages[lastIdx], content: streamBufferRef.current };
          }
          return nextMessages;
        });
        setStreamingContent('');
        if (flushIntervalRef.current) clearTimeout(flushIntervalRef.current);
      }
    }
  };

  useEffect(() => {
    handleSendRef.current = handleSend;
  }, [handleSend]);

  useEffect(() => {
    const handleDeepDiveEvent = (e: any) => {
      const title = e.detail;
      const prompt = `Tell me more about the "${title}" project. What was your specific role and what were the key technical challenges?`;
      
      if (window.innerWidth <= 768) {
        if (handleSendRef.current) {
          handleSendRef.current(prompt);
        }
      } else {
        if (handleSendRef.current) {
          handleSendRef.current(prompt);
        }
      }
    };
    window.addEventListener('ai-deep-dive', handleDeepDiveEvent);
    return () => window.removeEventListener('ai-deep-dive', handleDeepDiveEvent);
  }, []);

  const suggestedPrompts = [
    "What products has Yang launched?",
    "What are their core strengths?",
    "Summarize their AI experience",
  ];

  return (
    <section id="ask-ai" className="py-24 bg-navy-900/50 scroll-mt-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h3 className="text-4xl font-bold mb-4">Ask AI About Me</h3>
          <p className="text-slate-400">Recruiters: Get instant answers about my professional background.</p>
        </div>

        <div className="glass rounded-3xl overflow-hidden flex flex-col h-[600px] shadow-2xl">
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-navy-950">
                <Sparkles size={16} />
              </div>
              <span className="font-bold text-sm">Yang's AI Assistant</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Online</span>
            </div>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide relative">
            {messages.map((msg, idx) => {
              const isLast = idx === messages.length - 1;
              if (isLast && isStreaming) {
                return <StreamingMessage key={idx} idx={idx} content={streamingContent} />;
              }
              return (
                <MessageBubble
                  key={idx}
                  idx={idx}
                  content={msg.content}
                  role={msg.role}
                />
              );
            })}
            <div ref={chatEndRef} />
          </div>

          <div className="p-6 border-t border-white/10 space-y-4">
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map(prompt => (
                <button 
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="text-sm px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative flex items-end"
            >
              <textarea 
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask about Yang's experience..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-accent transition-colors resize-none overflow-hidden min-h-[54px] max-h-[200px]"
                rows={1}
              />
              <button 
                type="button"
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className={`absolute right-2 bottom-2 w-10 h-10 rounded-lg flex items-center justify-center transition-all disabled:opacity-50 ${
                  input.trim() 
                    ? 'bg-accent text-navy-950 hover:bg-white shadow-[0_0_15px_rgba(52,211,153,0.4)] animate-pulse' 
                    : 'bg-white/10 text-slate-400'
                }`}
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    emailjs.sendForm(
      'service_0xkxfnn', 
      'template_foqvrqc', 
      formRef.current, 
      'w31qZC1spmhbQ0Xo4'
    )
    .then(() => {
      setSubmitStatus('success');
      formRef.current?.reset();
    })
    .catch((error) => {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  return (
    <section id="contact" className="py-24 bg-navy-900/50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-sm font-black text-accent uppercase tracking-[0.3em] mb-4">Contact</h2>
            <h3 className="text-5xl font-bold mb-8">Let's build something great together</h3>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
              I'm always open to discussing new products, growth strategies, or AI innovations.
            </p>
            
            <div className="space-y-6 mb-12">
              <a href={`mailto:${portfolioData.contact.email}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-navy-950 transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">Email</div>
                  <div className="text-lg font-bold text-white">{portfolioData.contact.email}</div>
                </div>
              </a>
              <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-navy-950 transition-all">
                  <Linkedin size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">LinkedIn</div>
                  <div className="text-lg font-bold text-white">linkedin.com/in/yangliuprofile</div>
                </div>
              </a>
              <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-navy-950 transition-all">
                  <Github size={20} />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase">GitHub</div>
                  <div className="text-lg font-bold text-white">gitHub/yliu-online</div>
                </div>
              </a>
            </div>
          </div>

          <div className="glass rounded-3xl p-8 md:p-12">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Name</label>
                  <input type="text" name="user_name" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email</label>
                  <input type="email" name="user_email" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Subject</label>
                <input type="text" name="subject" required className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-accent transition-colors" placeholder="New Project Opportunity" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Message</label>
                <textarea name="message" required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Hello Yang, I'd like to talk about..." />
              </div>
              <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-white text-navy-950 rounded-xl font-bold hover:bg-accent transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? 'Sending...' : 'Send Message'} {!isSubmitting && <Send size={18} />}
              </button>
              
              {submitStatus === 'success' && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm text-center">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
                  Failed to send message. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white font-black">PM</div>
          <span className="text-sm font-bold text-slate-500">© 2026 YANG LIU. ALL RIGHTS RESERVED.</span>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Privacy Policy</a>
          <a href="#" className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  useLayoutEffect(() => {
    // 1. Disable browser's automatic scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // 2. Clear any hash in the URL to prevent jumping to sections
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    
    // 3. Force scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    
    // 4. Use multiple timeouts to catch any delayed browser scroll attempts
    // This is especially needed in React 18 Strict Mode or iframe environments
    const t1 = setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), 10);
    const t2 = setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), 100);
    const t3 = setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' }), 500);
    
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <AskAI />
        <Contact />
      </main>
      <Footer />
      
      {/* Scroll to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-navy-950 transition-all z-40"
      >
        <ArrowUpRight size={20} className="-rotate-45" />
      </button>
    </div>
  );
}
