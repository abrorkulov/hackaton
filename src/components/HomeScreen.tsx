import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Play, PlusCircle, BarChart3, Zap, Users, Trophy, Sparkles, Gamepad2, Brain, Target, Flame, Star, ArrowRight, TrendingUp, Clock } from 'lucide-react';
import { playClick } from '../utils/audio';

const HomeScreen: React.FC = () => {
  const { lang, setCurrentScreen, quizzes, customQuizzes, setActiveQuiz } = useGame();
  const [pinInput, setPinInput] = useState('');

  const allQuizzes = [...quizzes, ...customQuizzes];
  const filteredQuizzes = allQuizzes.filter(q => q.language === lang);

  const handleJoinGame = () => {
    if (pinInput.length === 6) {
      playClick();
      // Find quiz by PIN (simplified - in real app would match actual PIN)
      const quiz = filteredQuizzes[0];
      if (quiz) {
        setActiveQuiz(quiz);
        setCurrentScreen('LOBBY');
      }
    }
  };

  const handleStartQuiz = (quiz: any) => {
    playClick();
    setActiveQuiz(quiz);
    setCurrentScreen('LOBBY');
  };

  const stats = [
    { icon: Users, label: { en: 'Active Players', uz: 'Faol O\'yinchilar' }, value: '1,247', color: 'accent' },
    { icon: Trophy, label: { en: 'Quizzes Played', uz: 'O\'yinlar Soni' }, value: '8,532', color: 'primary' },
    { icon: Zap, label: { en: 'Questions', uz: 'Savollar' }, value: '42,156', color: 'success' },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 px-6 py-3 rounded-full mb-8 border border-white/20 backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-white/90 font-medium">
              {lang === 'en' ? 'Interactive Quiz Platform' : 'Interaktiv Viktorina Platformasi'}
            </span>
            <Sparkles className="w-5 h-5 text-pink-400" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-6xl lg:text-8xl font-bold text-white mb-6"
          >
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
              Quizvibe
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {lang === 'en' 
              ? 'Create, play, and share interactive quizzes with friends. Experience the future of learning.' 
              : 'Do\'stlaringiz bilan interaktiv viktorinalarni yarating, o\'ynang va ulashing. O\'rganishning kelajagini tajriba qiling.'}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full px-4"
          >
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: "0 0 50px rgba(168, 85, 247, 0.6), 0 0 100px rgba(236, 72, 153, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playClick();
                setCurrentScreen('CREATOR');
              }}
              className="group relative w-full sm:w-auto px-10 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-3xl font-bold text-white shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="relative flex items-center justify-center gap-3 text-xl">
                <PlusCircle className="w-7 h-7" />
                {lang === 'en' ? 'Create Quiz' : 'Viktorina Yaratish'}
                <ArrowRight className="w-7 h-7 hidden sm:block" />
              </div>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.08, boxShadow: "0 0 50px rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playClick();
                setCurrentScreen('ANALYTICS');
              }}
              className="group relative w-full sm:w-auto px-10 py-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-2 border-purple-400/50 rounded-3xl font-bold text-white hover:bg-purple-500/30 transition-all text-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <div className="relative flex items-center justify-center gap-3">
                <BarChart3 className="w-7 h-7" />
                {lang === 'en' ? 'Analytics' : 'Tahlil'}
              </div>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-12 md:mb-16"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const gradients = [
              'from-pink-500 to-purple-600',
              'from-purple-500 to-blue-600',
              'from-blue-500 to-cyan-600'
            ];
            const icons = [Flame, TrendingUp, Star];
            const iconColors = ['text-accent-400', 'text-primary-400', 'text-success-400'];
            const ExtraIcon = icons[index];
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 overflow-hidden hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20 transition-all"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index]} opacity-0 group-hover:opacity-15 transition-opacity`} />
                <div className={`absolute top-4 right-4 w-14 h-14 rounded-2xl bg-gradient-to-br ${gradients[index]} flex items-center justify-center shadow-2xl shadow-purple-500/30`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <ExtraIcon className={`w-8 h-8 sm:w-10 sm:h-10 mb-4 ${iconColors[index]}`} />
                <p className="text-4xl sm:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-white/60 text-sm">{stat.label[lang]}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12 md:mb-16">
          {/* Join Game */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -8 }}
            className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 overflow-hidden hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-purple-500/30">
                  <Gamepad2 className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {lang === 'en' ? 'Join a Game' : 'O\'yinga Qo\'shiling'}
                  </h2>
                  <p className="text-white/60 text-sm">
                    {lang === 'en' ? 'Enter PIN to play' : 'PIN kiriting va o\'ynang'}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="PIN"
                  className="flex-1 bg-white/10 border-2 border-purple-400/30 rounded-2xl px-6 py-4 text-white text-center text-3xl font-mono tracking-widest placeholder-white/30 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/30 transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(168, 85, 247, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleJoinGame}
                  disabled={pinInput.length !== 6}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-purple-500/30"
                >
                  <Play className="w-7 h-7" />
                </motion.button>
              </div>
              
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Target className="w-4 h-4" />
                {lang === 'en' ? 'Share PIN with friends' : 'PINni do\'stlaringiz bilan baham'}
              </div>
            </div>
          </motion.div>

          {/* Create Game */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            whileHover={{ scale: 1.02, y: -8 }}
            onClick={() => {
              playClick();
              setCurrentScreen('CREATOR');
            }}
            className="group relative bg-gradient-to-br from-pink-500 via-purple-600 to-blue-600 rounded-3xl p-6 sm:p-8 cursor-pointer border border-white/10 overflow-hidden shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/40 transition-all"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {lang === 'en' ? 'Creator Studio' : 'Yaratuvchi Studiyasi'}
                  </h2>
                  <p className="text-white/80 text-sm">
                    {lang === 'en' ? 'Build your quiz' : 'O\'zingizni yarating'}
                  </p>
                </div>
              </div>
              
              <p className="text-white/90 text-base mb-4">
                {lang === 'en' 
                  ? 'Create custom quizzes with questions, images, and explanations' 
                  : 'Savollar, rasmlar va izohlar bilan maxsus viktorinalar yarating'}
              </p>
              
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Sparkles className="w-4 h-4" />
                {lang === 'en' ? 'Unlimited creativity' : 'Cheksiz ijodiylik'}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Available Quizzes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">
              {lang === 'en' ? 'Featured Quizzes' : 'Tanlangan Viktorinalar'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.slice(0, 6).map((quiz, index) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.03, y: -8 }}
                onClick={() => handleStartQuiz(quiz)}
                className="group relative bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 cursor-pointer overflow-hidden hover:border-purple-500/30 hover:shadow-2xl hover:shadow-purple-500/20 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-600/20 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-purple-400" />
                    </div>
                    <span className="text-sm bg-white/10 backdrop-blur-sm text-white/70 px-3 py-1.5 rounded-full border border-white/10">
                      {quiz.questions.length} {lang === 'en' ? 'Qs' : 'Savol'}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{quiz.title}</h3>
                  <p className="text-white/60 text-sm mb-4 line-clamp-2">{quiz.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <Clock className="w-4 h-4" />
                      {quiz.timerPerQuestion}s
                    </div>
                    <div className="flex items-center gap-2 text-purple-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      {lang === 'en' ? 'Play' : 'O\'ynash'}
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeScreen;
