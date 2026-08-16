import React, { lazy, Suspense } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import Navbar from './components/Navbar';

// Lazy load components for better performance
const HomeScreen = lazy(() => import('./components/HomeScreen'));
const CreatorStudio = lazy(() => import('./components/CreatorStudio'));
const AnalyticsDashboard = lazy(() => import('./components/AnalyticsDashboard'));
const Lobby = lazy(() => import('./components/Lobby'));
const GameScreen = lazy(() => import('./components/GameScreen'));
const Results = lazy(() => import('./components/Results'));

// Loading component
const LoadingScreen: React.FC = () => (
  <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-white/60">Loading...</p>
    </div>
  </div>
);

const AppContent: React.FC = () => {
  const { currentScreen } = useGame();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'HOME':
        return <HomeScreen />;
      case 'CREATOR':
        return <CreatorStudio />;
      case 'ANALYTICS':
        return <AnalyticsDashboard />;
      case 'LOBBY':
        return <Lobby />;
      case 'GAME':
        return <GameScreen />;
      case 'RESULTS':
        return <Results />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Suspense fallback={<LoadingScreen />}>
        {renderScreen()}
      </Suspense>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
};

export default App;
