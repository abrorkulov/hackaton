import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Users, TrendingUp, AlertCircle, BarChart3, Target, Edit, Play, Trash2 } from 'lucide-react';
import { playClick } from '../utils/audio';

const AnalyticsDashboard: React.FC = () => {
  const { lang, analytics, customQuizzes, deleteCustomQuiz, setActiveQuiz, setCurrentScreen } = useGame();

  const handlePlayQuiz = (quiz: any) => {
    playClick();
    setActiveQuiz(quiz);
    setCurrentScreen('LOBBY');
  };

  const handleEditQuiz = () => {
    playClick();
    // For now, just alert - full edit functionality would require state management
    alert(lang === 'en' ? 'Edit functionality coming soon!' : 'Tahrirlash funksiyasi tez orada!');
  };

  const handleDeleteQuiz = (id: string) => {
    playClick();
    if (confirm(lang === 'en' ? 'Delete this quiz?' : 'Ushbu viktorinani o\'chirmoqchimisiz?')) {
      deleteCustomQuiz(id);
    }
  };

  const stats = [
    {
      icon: Users,
      label: { en: 'Total Plays', uz: 'Jami O\'yinlar' },
      value: analytics.totalPlays.toLocaleString(),
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: TrendingUp,
      label: { en: 'Average Score', uz: 'O\'rtacha Ball' },
      value: analytics.averageScore.toString(),
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      icon: Target,
      label: { en: 'Completion Rate', uz: 'Tugatish Darajasi' },
      value: analytics.completionRate,
      color: 'from-amber-500 to-amber-600',
    },
  ];

  const maxCount = Math.max(...analytics.scoreDistribution.map(d => d.count));

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background depth */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.25) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 sm:gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-2xl shadow-purple-500/30">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              {lang === 'en' ? 'Analytics Dashboard' : 'Tahlil Dashboardi'}
            </h1>
          </div>
          <p className="text-white/60">
            {lang === 'en' 
              ? 'Track your quiz performance and audience insights' 
              : 'Viktorina natijalaringiz va auditoriya tahlillarini kuzating'}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10"
              >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-white/60">{stat.label[lang]}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Score Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              {lang === 'en' ? 'Score Distribution' : 'Ball Taqsimoti'}
            </h2>
            <div className="space-y-4">
              {analytics.scoreDistribution.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/80">{item.range}</span>
                    <span className="text-white font-medium">{item.count}</span>
                  </div>
                  <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(item.count / maxCount) * 100}%` }}
                      transition={{ duration: 1, delay: 0.4 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hardest Questions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {lang === 'en' ? 'Most Missed Questions' : 'Eng Ko\'p Xato Qilingan Savollar'}
            </h2>
            <div className="space-y-4">
              {analytics.hardestQuestions.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-white/5 rounded-xl p-4"
                >
                  <p className="text-white/80 text-sm mb-2 line-clamp-2">{item.question}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-xs">
                      {lang === 'en' ? 'Fail Rate' : 'Xato Darajasi'}
                    </span>
                    <span className="text-accent-500 font-bold">{item.failRate}%</span>
                  </div>
                  <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.failRate}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className="h-full bg-gradient-to-r from-accent-500 to-accent-600 rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Custom Quizzes Management */}
        {customQuizzes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10"
          >
            <h2 className="text-xl font-bold text-white mb-6">
              {lang === 'en' ? 'My Custom Quizzes' : 'Mening Maxsus Viktorinalarim'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customQuizzes.map((quiz) => (
                <motion.div
                  key={quiz.id}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-gradient-to-br from-white/5 to-white/10 rounded-xl p-4 border border-white/10 hover:border-white/30 transition-all group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-bold text-lg">{quiz.title}</h3>
                    <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded-full">
                      {quiz.language === 'en' ? 'EN' : 'UZ'}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm mb-3 line-clamp-2">{quiz.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-white/40">
                      {quiz.questions.length} {lang === 'en' ? 'questions' : 'savol'}
                    </span>
                    <span className="text-xs text-white/40">
                      {quiz.timerPerQuestion}s {lang === 'en' ? 'per question' : 'har bir savol'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePlayQuiz(quiz)}
                      className="flex-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-all"
                    >
                      <Play className="w-4 h-4" />
                      {lang === 'en' ? 'Play' : 'O\'ynash'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEditQuiz}
                      className="flex-1 bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1 transition-all"
                    >
                      <Edit className="w-4 h-4" />
                      {lang === 'en' ? 'Edit' : 'Tahrirlash'}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteQuiz(quiz.id)}
                      className="bg-accent-500/20 hover:bg-accent-500/40 text-accent-400 py-2 px-3 rounded-lg text-sm transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
