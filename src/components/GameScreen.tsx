import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { playTick, playCorrect, playWrong, playClick } from '../utils/audio';
import { Flame, Trophy, Clock, Target, Zap, Award, Medal, Timer } from 'lucide-react';

const GameScreen: React.FC = () => {
  const { 
    lang, 
    activeQuiz, 
    gameState, 
    setGameState, 
    players, 
    updatePlayer,
    addReaction,
    reactions,
    setCurrentScreen 
  } = useGame();

  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(activeQuiz?.timerPerQuestion || 20);
  const [questionPhase, setQuestionPhase] = useState<'question' | 'answer' | 'transition'>('question');

  const currentQuestion = activeQuiz?.questions[gameState.currentQuestionIndex];
  const totalQuestions = activeQuiz?.questions.length || 0;

  const answerColors = [
    'bg-accent-500',
    'bg-primary-500', 
    'bg-amber-500',
    'bg-emerald-500'
  ];

  const reactionEmojis = ['🔥', '👏', '😂', '🎯', '🚀', '💪', '🌟', '❤️'];

  const calculatePoints = useCallback((timeRemaining: number, totalTime: number, streak: number): number => {
    const speedBonus = Math.floor(1000 * (timeRemaining / totalTime));
    const streakMultiplier = 1 + (streak * 0.1);
    return Math.floor(speedBonus * streakMultiplier);
  }, []);

  const handleAnswer = useCallback((answerIndex: number) => {
    if (showAnswer || selectedAnswer !== null) return;
    
    playClick();
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
    setQuestionPhase('answer');

    const isCorrect = answerIndex === currentQuestion?.correctOptionIndex;
    const points = isCorrect ? calculatePoints(timeLeft, activeQuiz?.timerPerQuestion || 20, gameState.streak) : 0;
    const newStreak = isCorrect ? gameState.streak + 1 : 0;

    if (isCorrect) {
      playCorrect();
    } else {
      playWrong();
    }

    // Update player score
    updatePlayer('user', { score: gameState.score + points });

    setGameState({
      score: gameState.score + points,
      streak: newStreak,
      answers: [
        ...gameState.answers,
        {
          questionId: currentQuestion?.id || '',
          answer: answerIndex,
          isCorrect,
          timeTaken: (activeQuiz?.timerPerQuestion || 20) - timeLeft,
        }
      ]
    });

    const advanceTimer = setTimeout(() => {
      if (gameState.currentQuestionIndex < totalQuestions - 1) {
        nextQuestion();
      } else {
        setCurrentScreen('RESULTS');
      }
    }, 3000);

    return () => clearTimeout(advanceTimer);
  }, [showAnswer, selectedAnswer, currentQuestion, timeLeft, activeQuiz, gameState, calculatePoints, updatePlayer, setGameState, setCurrentScreen, totalQuestions]);

  const handleTimeUp = useCallback(() => {
    if (showAnswer) return;
    
    setShowAnswer(true);
    setQuestionPhase('answer');
    playWrong();

    setGameState({
      streak: 0,
      answers: [
        ...gameState.answers,
        {
          questionId: currentQuestion?.id || '',
          answer: -1,
          isCorrect: false,
          timeTaken: activeQuiz?.timerPerQuestion || 20,
        }
      ]
    });

    const advanceTimer = setTimeout(() => {
      if (gameState.currentQuestionIndex < totalQuestions - 1) {
        nextQuestion();
      } else {
        setCurrentScreen('RESULTS');
      }
    }, 3000);

    return () => clearTimeout(advanceTimer);
  }, [showAnswer, currentQuestion, activeQuiz, gameState, setGameState, setCurrentScreen, totalQuestions]);

  const nextQuestion = useCallback(() => {
    setQuestionPhase('transition');
    setShowAnswer(false);
    setSelectedAnswer(null);
    setTimeLeft(activeQuiz?.timerPerQuestion || 20);
    
    setTimeout(() => {
      setGameState({
        currentQuestionIndex: gameState.currentQuestionIndex + 1,
      });
      setQuestionPhase('question');
    }, 1000);
  }, [activeQuiz, gameState.currentQuestionIndex, setGameState]);

  const handleReaction = useCallback((emoji: string) => {
    addReaction(emoji);
    playClick();
  }, [addReaction]);

  // Timer countdown
  useEffect(() => {
    if (questionPhase === 'question' && timeLeft > 0 && !showAnswer) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1;
          if (newTime <= 5 && newTime > 0) {
            playTick();
          }
          if (newTime <= 0) {
            handleTimeUp();
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [questionPhase, showAnswer, timeLeft, handleTimeUp]);

  const sortedPlayers = [
    { id: 'user', name: 'You', avatar: '😎', score: gameState.score, isHost: true },
    ...players.filter(p => !p.isHost),
  ].sort((a, b) => b.score - a.score);

  if (!currentQuestion) return null;

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Static Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating Reactions */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {reactions.map((reaction) => (
            <motion.div
              key={reaction.id}
              initial={{ opacity: 0, y: 100, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 1, 0], 
                y: [100, -200],
                scale: [0, 1.5, 1, 0.5],
                rotate: [0, 360]
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3 }}
              style={{ left: `${reaction.xPosition}%` }}
              className="absolute text-4xl"
            >
              {reaction.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="flex justify-between text-white/60 text-xs sm:text-sm mb-2 sm:mb-3">
            <div className="flex items-center gap-1 sm:gap-2">
              <Target className="w-3 h-3 sm:w-4 sm:h-4 text-primary-400" />
              <span>{lang === 'en' ? 'Question' : 'Savol'} {gameState.currentQuestionIndex + 1}/{totalQuestions}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-warning-400" />
              <span>{lang === 'en' ? 'Score' : 'Ball'}: {gameState.score}</span>
            </div>
          </div>
          <div className="h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((gameState.currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.5 }}
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 shadow-neon"
            />
          </div>
        </div>

        {/* Timer */}
        <motion.div
          className={`text-center mb-6 sm:mb-10 ${
            timeLeft <= 5 ? 'text-accent-500' : 'text-white'
          }`}
          animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <Timer className="w-5 h-5 sm:w-6 sm:h-6" />
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
              {timeLeft}
            </div>
          </div>
          <p className="text-white/50 text-xs sm:text-sm">{lang === 'en' ? 'seconds remaining' : 'qolgan soniya'}</p>
        </motion.div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/10 mb-6 sm:mb-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                  {currentQuestion.text}
                </h2>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Answer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctOptionIndex;
            const showResult = showAnswer;

            let bgColor = answerColors[index % 4];
            let shadowClass = '';
            
            if (showResult) {
              if (isCorrect) {
                bgColor = 'bg-success-500';
                shadowClass = 'shadow-neon-green';
              } else if (isSelected && !isCorrect) {
                bgColor = 'bg-accent-500';
                shadowClass = 'shadow-neon-red';
              }
            } else if (isSelected) {
              bgColor = 'bg-white/20';
              shadowClass = 'shadow-neon';
            }

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: showAnswer ? 1 : 1.03, boxShadow: showAnswer ? 'none' : '0 0 30px rgba(168, 85, 247, 0.4)' }}
                whileTap={{ scale: showAnswer ? 1 : 0.97 }}
                onClick={() => handleAnswer(index)}
                disabled={showAnswer}
                aria-label={`Answer option ${index + 1}: ${option}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleAnswer(index);
                  }
                }}
                className={`${bgColor} ${shadowClass} rounded-3xl p-6 sm:p-8 md:p-10 text-left transition-all relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                  !showAnswer ? 'hover:opacity-90 cursor-pointer hover:shadow-2xl' : 'cursor-default'
                }`}
                style={{
                  minHeight: '140px',
                }}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 flex items-center justify-center font-bold text-white text-lg sm:text-xl`}>
                    {index + 1}
                  </div>
                  <span className="text-white font-semibold text-base sm:text-lg md:text-xl">{option}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Answer Reveal */}
        <AnimatePresence>
          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/10 mb-6 sm:mb-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
              <div className="relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
                  <div className="text-center p-3 sm:p-4 md:p-6 bg-white/5 rounded-xl sm:rounded-2xl">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                      {selectedAnswer === currentQuestion.correctOptionIndex ? (
                        <Award className="w-4 h-4 sm:w-5 sm:h-5 sm:w-6 sm:h-6 text-success-400" />
                      ) : (
                        <Target className="w-4 h-4 sm:w-5 sm:h-5 sm:w-6 sm:h-6 text-accent-400" />
                      )}
                      <span className="text-white/60 text-xs sm:text-sm">
                        {selectedAnswer === currentQuestion.correctOptionIndex ? '✓' : '✗'} {lang === 'en' ? 'Correct' : 'To\'g\'ri'}
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
                      {selectedAnswer === currentQuestion.correctOptionIndex 
                        ? calculatePoints(timeLeft, activeQuiz?.timerPerQuestion || 20, gameState.streak)
                        : 0}
                    </div>
                    <div className="text-white/40 text-xs">{lang === 'en' ? 'points' : 'ball'}</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 md:p-6 bg-white/5 rounded-xl sm:rounded-2xl">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                      <Flame className="w-4 h-4 sm:w-5 sm:h-5 sm:w-6 sm:h-6 text-warning-400" />
                      <span className="text-white/60 text-xs sm:text-sm">{lang === 'en' ? 'Streak' : 'Seriya'}</span>
                    </div>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-warning-400 mb-1 sm:mb-2">
                      {selectedAnswer === currentQuestion.correctOptionIndex ? gameState.streak + 1 : 0}
                    </div>
                    <div className="text-white/40 text-xs">{lang === 'en' ? 'in a row' : 'ketma-ket'}</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 md:p-6 bg-white/5 rounded-xl sm:rounded-2xl hidden md:block">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Medal className="w-5 h-5 sm:w-6 sm:h-6 text-primary-400" />
                      <span className="text-white/60 text-sm">{lang === 'en' ? 'Rank' : 'Reyting'}</span>
                    </div>
                    <div className="text-4xl font-bold text-primary-400 mb-2">
                      #{sortedPlayers.findIndex(p => p.isHost) + 1}
                    </div>
                    <div className="text-white/40 text-xs">{lang === 'en' ? 'position' : 'o\'rin'}</div>
                  </div>
                </div>
                {currentQuestion.explanation && (
                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-primary-400" />
                      <p className="text-white/80 text-xs sm:text-sm">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reaction Buttons */}
        {!showAnswer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 bg-white/5 backdrop-blur-xl rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/10"
          >
            {reactionEmojis.slice(0, 5).map((emoji, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => handleReaction(emoji)}
                className="text-xl sm:text-2xl hover:scale-110 transition-transform"
              >
                {emoji}
              </motion.button>
            ))}
          </motion.div>
        )}

        {/* Mini Leaderboard */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed right-2 sm:right-4 top-24 sm:top-28 bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/10 hidden lg:block"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-warning-400" />
            <h3 className="text-white font-bold text-xs sm:text-sm">{lang === 'en' ? 'Leaderboard' : 'Reyting'}</h3>
          </div>
          <div className="space-y-2">
            {sortedPlayers.slice(0, 5).map((player, index) => (
              <div
                key={player.id}
                className={`flex items-center gap-2 sm:gap-3 p-2 rounded-lg sm:rounded-xl ${
                  player.isHost ? 'bg-primary-500/20 border border-primary-500/30' : 'bg-white/5'
                }`}
              >
                <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                  index === 0 ? 'bg-warning-500 text-white' :
                  index === 1 ? 'bg-slate-400 text-white' :
                  index === 2 ? 'bg-amber-700 text-white' :
                  'bg-white/20 text-white'
                }`}>
                  {index + 1}
                </div>
                <span className="text-lg sm:text-xl">{player.avatar}</span>
                <span className="text-white text-xs sm:text-sm flex-1 truncate">{player.name}</span>
                <span className="text-white font-bold text-xs sm:text-sm">{player.score}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GameScreen;
