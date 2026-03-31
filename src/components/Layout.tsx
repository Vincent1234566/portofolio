import { Link, Outlet } from "react-router-dom";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Profil & Pengalaman", path: "/" },
    { name: "Keahlian", path: "/projects" },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-accent selection:text-white">
      <header className="sticky top-0 z-50 bg-paper/80 backdrop-blur-md border-b border-brand/10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-3xl font-black tracking-tighter text-brand hover:text-accent transition-all duration-300">
                VG.
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-[11px] font-black uppercase tracking-[0.2em] text-brand/60 hover:text-accent transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all group-hover:w-full"></span>
                </Link>
              ))}
              <a 
                href="mailto:vincentiussusanto88@gmail.com"
                className="px-6 py-2 border border-brand text-[11px] font-black uppercase tracking-widest hover:bg-brand hover:text-white transition-all"
              >
                Let's Talk
              </a>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-brand"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-paper border-b border-brand/10 overflow-hidden"
            >
              <div className="px-4 pt-4 pb-8 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-2xl font-black tracking-tighter text-brand hover:text-accent"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-brand text-white py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
            <div className="md:col-span-6 space-y-8">
              <h3 className="text-5xl font-black tracking-tighter">VINCENTIUS.</h3>
              <p className="text-white/50 text-lg font-light max-w-sm leading-relaxed">
                Seorang pelajar SMA yang berdedikasi untuk belajar, berorganisasi, dan mengembangkan potensi diri.
              </p>
            </div>
            <div className="md:col-span-3 space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-white/30">Navigasi</h4>
              <ul className="space-y-4">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-sm font-medium hover:text-accent transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3 space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-white/30">Connect</h4>
              <div className="flex gap-6">
                <a href="#" className="hover:text-accent transition-colors"><Github size={20} /></a>
                <a href="#" className="hover:text-accent transition-colors"><Linkedin size={20} /></a>
                <a href="mailto:vincentiussusanto88@gmail.com" className="hover:text-accent transition-colors"><Mail size={20} /></a>
              </div>
              <p className="text-[10px] text-white/30 font-black uppercase tracking-widest pt-8">
                &copy; {new Date().getFullYear()} Vincentius. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
