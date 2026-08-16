import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Play, Users, Copy, Check, Sparkles, Crown, UserPlus, Shield, Clock, Shuffle } from 'lucide-react';
import { playClick, playFanfare } from '../utils/audio';

const Lobby: React.FC = () => {
  const { lang, roomPin, playerName: initialPlayerName, setPlayerName, players, addPlayer, setCurrentScreen, activeQuiz, resetGameState } = useGame();
  const [playerName, setPlayerNameState] = useState(initialPlayerName);
  const [selectedAvatar, setSelectedAvatar] = useState('😎');
  const [copied, setCopied] = useState(false);

  const avatars = [
    '😎', '🦊', '🐱', '🐶', '🦄', '🐼', '🦁', '🐯',
    '🐸', '🐙', '🦋', '🐢', '🦉', '🦜', '🐳', '🦈',
    '🐲', '🦖', '🦕', '🦔', '🐹', '🐰', '🐻', '🐨',
    '🐼', '🦘', '🐵', '🦒', '🐔', '🐧', '🦆', '🦢',
    '🦉', '🦜', '🦚', '🦩', '🐸', '🐊', '🐢', '🦎',
    '🐍', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀'
  ];

  useEffect(() => {
    // Add current player when they enter name
    if (playerName && !players.some(p => p.name === playerName)) {
      addPlayer({
        id: 'user',
        name: playerName,
        avatar: selectedAvatar,
        score: 0,
        isHost: true,
      });
    }
  }, [playerName, selectedAvatar, players, addPlayer]);

  const handlePlayerNameChange = (value: string) => {
    setPlayerNameState(value);
    setPlayerName(value);
  };

  const randomizeAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    setSelectedAvatar(avatars[randomIndex]);
    playClick();
  };

  const copyPin = () => {
    navigator.clipboard.writeText(roomPin);
    setCopied(true);
    playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const startGame = () => {
    playFanfare();
    resetGameState();
    setCurrentScreen('GAME');
  };

  const allPlayers = [
    ...(playerName ? [{ id: 'user', name: playerName, avatar: selectedAvatar, score: 0, isHost: true }] : []),
    ...players.filter(p => !p.isHost),
  ].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Static Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Quiz Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 border border-white/10 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-white/80 text-xs sm:text-sm font-medium">
              {lang === 'en' ? 'Game Lobby' : 'O\'yin Zali'}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3">{activeQuiz?.title}</h1>
          <p className="text-white/60 text-base sm:text-lg">{activeQuiz?.description}</p>
        </motion.div>

        {/* Game PIN */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 border border-white/10 mb-6 sm:mb-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
              <h2 className="text-white/80 text-sm sm:text-base font-medium">
                {lang === 'en' ? 'Game PIN' : 'O\'yin PIN'}
              </h2>
            </div>
            <div className="flex items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="relative">
                <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-widest font-mono bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                  {roomPin}
                </div>
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-xl -z-10" />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyPin}
                className="p-3 sm:p-4 bg-white/10 hover:bg-white/20 rounded-xl sm:rounded-2xl transition-all border border-white/10"
              >
                {copied ? <Check className="w-5 h-5 sm:w-6 sm:h-6 text-success-400" /> : <Copy className="w-5 h-5 sm:w-6 sm:h-6 text-white" />}
              </motion.button>
            </div>
            <p className="text-white/40 text-xs sm:text-sm mb-2 sm:mb-3">
              {lang === 'en' ? 'Share this PIN with players to join' : 'O\'yinchilar qo\'shilishi uchun bu PINni ulashing'}
            </p>
            <div className="flex items-center justify-center gap-2 text-accent-400 text-xs bg-accent-500/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-accent-500/20">
              <Clock className="w-3 h-3" />
              <span className="hidden sm:inline">{lang === 'en' ? 'Note: For real multiplayer, you need a backend server' : 'Eslatma: Haqiqiy ko\'p o\'yinchi uchun backend server kerak'}</span>
              <span className="sm:hidden">{lang === 'en' ? 'Note: Backend needed for multiplayer' : 'Eslatma: Ko\'p o\'yinchi uchun backend kerak'}</span>
            </div>
          </div>
        </motion.div>

        {/* Player Name Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10 mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
            <label className="block text-white/80 text-sm sm:text-base font-medium">
              {lang === 'en' ? 'Your Name' : 'Sizning Ismingiz'}
            </label>
          </div>
          <input
            type="text"
            value={playerName}
            onChange={(e) => handlePlayerNameChange(e.target.value)}
            placeholder={lang === 'en' ? 'Enter your name' : 'Ismingizni kiriting'}
            maxLength={15}
            className="w-full bg-white/10 border border-white/20 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-white placeholder-white/30 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 text-center text-lg sm:text-xl font-medium transition-all mb-4"
          />
          
          {/* Avatar Selection */}
          <div className="flex items-center justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
              <label className="block text-white/80 text-sm sm:text-base font-medium">
                {lang === 'en' ? 'Choose Your Avatar' : 'Avataringizni Tanlang'}
              </label>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={randomizeAvatar}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-all"
              title={lang === 'en' ? 'Random Avatar' : 'Tasodifiy Avatar'}
            >
              <Shuffle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </motion.button>
          </div>
          
          <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 gap-2 mb-4">
            {avatars.map((avatar, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                onClick={() => {
                  setSelectedAvatar(avatar);
                  playClick();
                }}
                className={`text-2xl sm:text-3xl p-2 rounded-xl transition-all ${
                  selectedAvatar === avatar
                    ? 'bg-primary-500/30 border-2 border-primary-500 shadow-neon'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                {avatar}
              </motion.button>
            ))}
          </div>
          
          {/* Avatar Preview */}
          <div className="flex items-center justify-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
            <span className="text-white/60 text-xs sm:text-sm">
              {lang === 'en' ? 'Your avatar:' : 'Sizning avataringiz:'}
            </span>
            <motion.div
              key={selectedAvatar}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-4xl sm:text-5xl"
            >
              {selectedAvatar}
            </motion.div>
          </div>
        </motion.div>

        {/* Players Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-white/10 mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {lang === 'en' ? 'Players' : 'O\'yinchilar'}
              </h2>
            </div>
            <div className="bg-primary-500/20 text-primary-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm border border-primary-500/30">
              {allPlayers.length}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            <AnimatePresence>
              {allPlayers.map((player, index) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center border transition-all group hover:scale-[1.02] ${
                    player.isHost 
                      ? 'border-primary-500/30 bg-primary-500/10 shadow-neon' 
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {player.isHost && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-neon">
                      <Crown className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  )}
                  <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">{player.avatar}</div>
                  <p className="text-white font-medium text-xs sm:text-sm truncate">{player.name}</p>
                  {player.isHost && (
                    <div className="mt-1.5 sm:mt-2 text-xs text-primary-400 font-medium">
                      {lang === 'en' ? 'Host' : 'Moderator'}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {allPlayers.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-white/50 text-xs sm:text-sm py-6 sm:py-8"
            >
              {lang === 'en' ? 'Enter your name to join the game' : 'O\'yinga qo\'shilish uchun ismingizni kiriting'}
            </motion.p>
          )}
        </motion.div>

        {/* Start Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(168, 85, 247, 0.6)" }}
          whileTap={{ scale: 0.95 }}
          onClick={startGame}
          disabled={allPlayers.length === 0}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white py-6 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-purple-500/30 overflow-hidden relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
          <div className="relative flex items-center justify-center gap-3">
            <Play className="w-7 h-7" />
            {lang === 'en' ? 'Start Game' : 'O\'yinni Boshlash'}
            <Sparkles className="w-6 h-6" />
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default Lobby;
