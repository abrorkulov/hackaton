import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react';
import { Quiz, initialQuizzes, initialAnalytics } from '../data/quizData';

type Screen = 'HOME' | 'CREATOR' | 'ANALYTICS' | 'LOBBY' | 'GAME' | 'RESULTS';
type Language = 'en' | 'uz';

interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  isHost: boolean;
}

interface Reaction {
  id: string;
  emoji: string;
  xPosition: number;
}

interface GameState {
  currentQuestionIndex: number;
  score: number;
  streak: number;
  timeLeft: number;
  answers: Array<{ questionId: string; answer: number; isCorrect: boolean; timeTaken: number }>;
}

interface GameContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;
  quizzes: Quiz[];
  activeQuiz: Quiz | null;
  setActiveQuiz: (quiz: Quiz | null) => void;
  playerName: string;
  setPlayerName: (name: string) => void;
  roomPin: string;
  setRoomPin: (pin: string) => void;
  gameState: GameState;
  setGameState: (state: Partial<GameState>) => void;
  resetGameState: () => void;
  players: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (id: string) => void;
  updatePlayer: (id: string, updates: Partial<Player>) => void;
  reactions: Reaction[];
  addReaction: (emoji: string) => void;
  removeReaction: (id: string) => void;
  customQuizzes: Quiz[];
  addCustomQuiz: (quiz: Quiz) => void;
  deleteCustomQuiz: (id: string) => void;
  analytics: typeof initialAnalytics;
  updateAnalytics: (updates: Partial<typeof initialAnalytics>) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const generateRoomPin = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const initialGameState: GameState = {
  currentQuestionIndex: 0,
  score: 0,
  streak: 0,
  timeLeft: 20,
  answers: [],
};

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('en');
  const [currentScreen, setCurrentScreen] = useState<Screen>('HOME');
  const [quizzes] = useState<Quiz[]>(initialQuizzes);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [roomPin, setRoomPin] = useState(generateRoomPin());
  const [gameState, setGameStateState] = useState<GameState>(initialGameState);
  const [players, setPlayers] = useState<Player[]>([]);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [customQuizzes, setCustomQuizzes] = useState<Quiz[]>([]);
  const [analytics, setAnalytics] = useState(initialAnalytics);

  // Load custom quizzes from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('quizvibe-custom-quizzes');
    if (saved) {
      try {
        setCustomQuizzes(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading custom quizzes:', error);
      }
    }
  }, []);

  // Save custom quizzes to localStorage when they change
  useEffect(() => {
    localStorage.setItem('quizvibe-custom-quizzes', JSON.stringify(customQuizzes));
  }, [customQuizzes]);

  const setGameState = useCallback((updates: Partial<GameState>) => {
    setGameStateState(prev => ({ ...prev, ...updates }));
  }, []);

  const resetGameState = useCallback(() => {
    setGameStateState(initialGameState);
    setRoomPin(generateRoomPin());
    setPlayers([]);
  }, []);

  const addPlayer = useCallback((player: Player) => {
    setPlayers(prev => {
      if (prev.some(p => p.id === player.id)) return prev;
      return [...prev, player];
    });
  }, []);

  const removePlayer = useCallback((id: string) => {
    setPlayers(prev => prev.filter(p => p.id !== id));
  }, []);

  const updatePlayer = useCallback((id: string, updates: Partial<Player>) => {
    setPlayers(prev =>
      prev.map(player => player.id === id ? { ...player, ...updates } : player)
    );
  }, []);

  const addReaction = useCallback((emoji: string) => {
    const newReaction: Reaction = {
      id: `reaction-${Date.now()}-${Math.random()}`,
      emoji,
      xPosition: Math.random() * 80 + 10,
    };
    setReactions(prev => [...prev, newReaction]);

    setTimeout(() => {
      removeReaction(newReaction.id);
    }, 3000);
  }, []);

  const removeReaction = useCallback((id: string) => {
    setReactions(prev => prev.filter(r => r.id !== id));
  }, []);

  const addCustomQuiz = useCallback((quiz: Quiz) => {
    setCustomQuizzes(prev => [...prev, quiz]);
  }, []);

  const deleteCustomQuiz = useCallback((id: string) => {
    setCustomQuizzes(prev => prev.filter(q => q.id !== id));
  }, []);

  const updateAnalytics = useCallback((updates: Partial<typeof initialAnalytics>) => {
    setAnalytics(prev => ({ ...prev, ...updates }));
  }, []);

  const value = useMemo<GameContextType>(() => ({
    lang,
    setLang,
    currentScreen,
    setCurrentScreen,
    quizzes,
    activeQuiz,
    setActiveQuiz,
    playerName,
    setPlayerName,
    roomPin,
    setRoomPin,
    gameState,
    setGameState,
    resetGameState,
    players,
    addPlayer,
    removePlayer,
    updatePlayer,
    reactions,
    addReaction,
    removeReaction,
    customQuizzes,
    addCustomQuiz,
    deleteCustomQuiz,
    analytics,
    updateAnalytics,
  }), [
    lang,
    currentScreen,
    quizzes,
    activeQuiz,
    playerName,
    roomPin,
    gameState,
    players,
    reactions,
    customQuizzes,
    analytics,
    setGameState,
    resetGameState,
    addPlayer,
    removePlayer,
    updatePlayer,
    addReaction,
    removeReaction,
    addCustomQuiz,
    deleteCustomQuiz,
    updateAnalytics,
  ]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
