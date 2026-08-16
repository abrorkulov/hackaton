import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Globe, Home, PlusCircle, BarChart3, LogOut, Sparkles, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { lang, setLang, currentScreen, setCurrentScreen } = useGame();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageToggle = () => {
    setLang(lang === 'en' ? 'uz' : 'en');
  };

  const handleNavigation = (screen: string) => {
    setCurrentScreen(screen as any);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'HOME', icon: Home, label: { en: 'Home', uz: 'Bosh sahifa' } },
    { id: 'CREATOR', icon: PlusCircle, label: { en: 'Create', uz: 'Yaratish' } },
    { id: 'ANALYTICS', icon: BarChart3, label: { en: 'Analytics', uz: 'Tahlil' } },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation('HOME')}
            className="cursor-pointer"
          >
            <img 
              src="/Gemini_Generated_Image_dndbmrdndbmrdndb.jpg" 
              alt="Quizvibe Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover"
            />
          </motion.div>
          {/* Logo Text */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigation('HOME')}
            className="hidden sm:block cursor-pointer"
          >
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Quizvibe
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation(item.id)}
                  className={`relative px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 rounded-xl transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border border-purple-400/50 shadow-lg shadow-purple-500/30'
                      : 'text-white/70 hover:bg-purple-500/20 hover:text-white border border-transparent'
                  }`}
                >
                  <Icon size={16} />
                  <span className="font-medium text-sm">{item.label[lang]}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-600/10 rounded-xl -z-10"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLanguageToggle}
              className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:bg-purple-500/30 text-white border border-purple-400/30 transition-all"
            >
              <Globe size={16} />
              <span className="font-bold text-xs sm:text-sm">{lang.toUpperCase()}</span>
            </motion.button>

            {/* Exit Button */}
            {currentScreen !== 'HOME' && (
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236, 72, 153, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigation('HOME')}
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:bg-pink-500/30 text-pink-400 border border-pink-400/30 transition-all"
              >
                <LogOut size={16} />
                <span className="font-medium text-xs sm:text-sm">{lang === 'en' ? 'Exit' : 'Chiqish'}</span>
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4 sm:pb-6"
            >
              <div className="flex flex-col gap-1 sm:gap-2 pt-3 sm:pt-4 border-t border-white/10">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentScreen === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleNavigation(item.id)}
                      className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-primary-500/20 to-primary-600/20 text-white border border-primary-500/30'
                          : 'text-white/70 hover:bg-white/10 hover:text-white border border-transparent'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium text-sm">{item.label[lang]}</span>
                    </motion.button>
                  );
                })}
                <div className="flex gap-2 pt-2 sm:pt-3">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={handleLanguageToggle}
                    className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-all"
                  >
                    <Globe size={18} />
                    <span className="font-bold text-sm">{lang.toUpperCase()}</span>
                  </motion.button>
                  {currentScreen !== 'HOME' && (
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleNavigation('HOME')}
                      className="flex-1 flex items-center justify-center gap-2 px-3 sm:px-4 py-3 rounded-xl bg-accent-500/10 hover:bg-accent-500/20 text-accent-400 border border-accent-500/20 transition-all"
                    >
                      <LogOut size={18} />
                      <span className="font-medium text-sm">{lang === 'en' ? 'Exit' : 'Chiqish'}</span>
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
