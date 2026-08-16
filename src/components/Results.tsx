import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Trophy, Target, TrendingUp, Home, Play, Crown, Medal, Award, Star, Flame, Zap, ArrowRight } from 'lucide-react';
import { playFanfare } from '../utils/audio';
import confetti from 'canvas-confetti';

const Results: React.FC = () => {
  const { lang, gameState, players, setCurrentScreen, resetGameState, activeQuiz } = useGame();
  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    playFanfare();
    
    if (confettiRef.current) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ef4444', '#0ea5e9', '#f59e0b', '#22c55e'],
      });
    }
  }, []);

  const allPlayers = [
    { id: 'user', name: 'You', avatar: '😎', score: gameState.score, isHost: true },
    ...players.filter(p => !p.isHost),
  ].sort((a, b) => b.score - a.score);

  const userRank = allPlayers.findIndex(p => p.isHost) + 1;
  const correctAnswers = gameState.answers.filter(a => a.isCorrect).length;
  const totalQuestions = gameState.answers.length;
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const averageTime = totalQuestions > 0 
    ? Math.round(gameState.answers.reduce((sum, a) => sum + a.timeTaken, 0) / totalQuestions * 10) / 10 
    : 0;

  const handlePlayAgain = () => {
    resetGameState();
    setCurrentScreen('HOME');
  };

  const podiumPlayers = allPlayers.slice(0, 3);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Static Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div ref={confettiRef} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6 border border-white/10 backdrop-blur-sm">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-warning-400" />
            <span className="text-white/90 text-xs sm:text-sm font-medium">
              {lang === 'en' ? 'Game Complete!' : 'O\'yin Tugadi!'}
            </span>
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-warning-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-primary-400 via-pink-400 to-accent-400 bg-clip-text text-transparent">
              {lang === 'en' ? 'Results' : 'Natijalar'}
            </span>
          </h1>
          <p className="text-white/60 text-base sm:text-lg">
            {activeQuiz?.title}
          </p>
        </motion.div>

        {/* Podium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-end justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-16 h-48 sm:h-64 md:h-80"
        >
          {/* 2nd Place */}
          {podiumPlayers[1] && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl sm:text-5xl mb-2 sm:mb-4">{podiumPlayers[1].avatar}</div>
              <div className="bg-gradient-to-t from-slate-600 to-slate-500 w-16 sm:w-20 md:w-24 h-24 sm:h-32 md:h-40 rounded-t-xl sm:rounded-t-2xl flex items-center justify-center relative shadow-lg">
                <div className="absolute top-2 sm:top-3 text-white font-bold text-xl sm:text-2xl md:text-3xl">2</div>
                <Medal className="absolute -top-2 sm:-top-3 w-6 h-6 sm:w-8 sm:h-8 bg-slate-400 rounded-full flex items-center justify-center text-white" />
                <div className="text-white font-bold text-lg sm:text-xl md:text-2xl">{podiumPlayers[1].score}</div>
              </div>
              <div className="text-white text-xs sm:text-sm mt-2 sm:mt-3 font-medium truncate w-16 sm:w-20 md:w-24 text-center">
                {podiumPlayers[1].name}
              </div>
            </motion.div>
          )}

          {/* 1st Place */}
          {podiumPlayers[0] && (
            <motion.div
              initial={{ y: 150 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="flex flex-col items-center"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-5xl sm:text-6xl mb-2 sm:mb-4"
              >
                👑
              </motion.div>
              <div className="text-5xl sm:text-6xl mb-2 sm:mb-4">{podiumPlayers[0].avatar}</div>
              <div className="bg-gradient-to-t from-warning-500 to-warning-400 w-20 sm:w-24 md:w-28 h-32 sm:h-48 md:h-56 rounded-t-xl sm:rounded-t-2xl flex items-center justify-center relative shadow-neon">
                <div className="absolute top-3 sm:top-4 text-white font-bold text-2xl sm:text-3xl md:text-4xl">1</div>
                <Crown className="absolute -top-3 sm:-top-4 w-8 h-8 sm:w-10 sm:h-10 bg-warning-500 rounded-full flex items-center justify-center text-white shadow-lg" />
                <div className="text-white font-bold text-xl sm:text-2xl md:text-3xl">{podiumPlayers[0].score}</div>
              </div>
              <div className="text-white text-xs sm:text-sm mt-2 sm:mt-3 font-medium truncate w-20 sm:w-24 md:w-28 text-center">
                {podiumPlayers[0].name}
              </div>
            </motion.div>
          )}

          {/* 3rd Place */}
          {podiumPlayers[2] && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl sm:text-5xl mb-2 sm:mb-4">{podiumPlayers[2].avatar}</div>
              <div className="bg-gradient-to-t from-amber-700 to-amber-600 w-16 sm:w-20 md:w-24 h-20 sm:h-24 md:h-32 rounded-t-xl sm:rounded-t-2xl flex items-center justify-center relative shadow-lg">
                <div className="absolute top-2 sm:top-3 text-white font-bold text-xl sm:text-2xl md:text-3xl">3</div>
                <Medal className="absolute -top-2 sm:-top-3 w-6 h-6 sm:w-8 sm:h-8 bg-amber-700 rounded-full flex items-center justify-center text-white" />
                <div className="text-white font-bold text-lg sm:text-xl md:text-2xl">{podiumPlayers[2].score}</div>
              </div>
              <div className="text-white text-xs sm:text-sm mt-2 sm:mt-3 font-medium truncate w-16 sm:w-20 md:w-24 text-center">
                {podiumPlayers[2].name}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Your Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 mb-6 sm:mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {lang === 'en' ? 'Your Performance' : 'Sizning Natijangiz'}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
              <div className="text-center p-3 sm:p-4 md:p-6 bg-white/5 rounded-xl sm:rounded-2xl">
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-warning-400" />
                  <span className="text-white/60 text-xs sm:text-sm">{lang === 'en' ? 'Rank' : 'O\'rin'}</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1 sm:mb-2">#{userRank}</div>
              </div>
              <div className="text-center p-3 sm:p-4 md:p-6 bg-white/5 rounded-xl sm:rounded-2xl">
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-success-400" />
                  <span className="text-white/60 text-xs sm:text-sm">{lang === 'en' ? 'Points' : 'Ball'}</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-success-400 mb-1 sm:mb-2">{gameState.score}</div>
              </div>
              <div className="text-center p-3 sm:p-4 md:p-6 bg-white/5 rounded-xl sm:rounded-2xl">
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
                  <span className="text-white/60 text-xs sm:text-sm">{lang === 'en' ? 'Accuracy' : 'Aniqlik'}</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-primary-400 mb-1 sm:mb-2">{accuracy}%</div>
              </div>
              <div className="text-center p-3 sm:p-4 md:p-6 bg-white/5 rounded-xl sm:rounded-2xl">
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-warning-400" />
                  <span className="text-white/60 text-xs sm:text-sm">{lang === 'en' ? 'Avg Time' : 'O\'rt Vaqt'}</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-warning-400 mb-1 sm:mb-2">{averageTime}s</div>
              </div>
            </div>

            {/* Question Breakdown */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
                <h3 className="text-white font-bold text-sm sm:text-base">
                  {lang === 'en' ? 'Question Breakdown' : 'Savol Tahlili'}
                </h3>
              </div>
              {gameState.answers.map((answer, index) => {
                const question = activeQuiz?.questions[index];
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-xl transition-all ${
                      answer.isCorrect ? 'bg-success-500/10 border border-success-500/20' : 'bg-accent-500/10 border border-accent-500/20'
                    }`}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center ${
                      answer.isCorrect ? 'bg-success-500' : 'bg-accent-500'
                    }`}>
                      {answer.isCorrect ? '✓' : '✗'}
                    </div>
                    <div className="flex-1">
                      <p className="text-white/90 text-xs sm:text-sm truncate">{question?.text}</p>
                    </div>
                    <div className="text-white/60 text-xs sm:text-sm">{answer.timeTaken}s</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10 mb-6 sm:mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {lang === 'en' ? 'Full Leaderboard' : 'To\'liq Reyting'}
              </h2>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {allPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center gap-2 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-xl transition-all ${
                    player.isHost ? 'bg-primary-500/20 border border-primary-500/30' : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm ${
                    index === 0 ? 'bg-warning-500 text-white' :
                    index === 1 ? 'bg-slate-400 text-white' :
                    index === 2 ? 'bg-amber-700 text-white' :
                    'bg-white/20 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-xl sm:text-2xl">{player.avatar}</span>
                  <div className="flex-1">
                    <p className="text-white font-medium text-xs sm:text-sm">{player.name}</p>
                  </div>
                  <div className="text-white font-bold text-xs sm:text-sm">{player.score}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-5"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(168, 85, 247, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayAgain}
            className="flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white py-6 rounded-3xl font-bold flex items-center justify-center gap-3 shadow-2xl shadow-purple-500/30 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
            <div className="relative flex items-center justify-center gap-3">
              <Home className="w-7 h-7" />
              {lang === 'en' ? 'Back to Home' : 'Bosh Sahifaga'}
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(236, 72, 153, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayAgain}
            className="flex-1 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 text-white py-6 rounded-3xl font-bold flex items-center justify-center gap-3 shadow-2xl shadow-pink-500/30 overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
            <div className="relative flex items-center justify-center gap-3">
              <Play className="w-7 h-7" />
              {lang === 'en' ? 'Play Again' : 'Qayta O\'ynash'}
              <ArrowRight className="w-7 h-7" />
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
