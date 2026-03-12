
import React, { useState } from 'react';
import { AppScreen, AuthState, UserProfile, ServerConfig } from './types';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Discover from './components/Discover';
import Matches from './components/Matches';
import Chat from './components/Chat';
import Wallet from './components/Wallet';
import Profile from './components/Profile';
import Shop from './components/Trade';
import Marketplace from './components/Marketplace';
import ServerSettings from './components/ServerSettings';
import FeatureTour from './components/FeatureTour';
import { User, Settings, Info } from 'lucide-react';

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>({
    isLoggedIn: false,
    isShowcase: false,
    user: null,
    method: null,
  });
  const [activeScreen, setActiveScreen] = useState<AppScreen>(AppScreen.DISCOVER);
  const [matches, setMatches] = useState<UserProfile[]>([]);
  const [selectedChatUser, setSelectedChatUser] = useState<UserProfile | null>(null);
  
  const [serverConfig, setServerConfig] = useState<ServerConfig>({
    baseUrl: '',
    apiKey: '',
    isConnected: false,
    lastSync: null
  });

  const handleLogin = (method: 'PI' | 'EMAIL' | 'SHOWCASE', piUser?: any) => {
    const isShowcase = method === 'SHOWCASE';
    setAuth({
      isLoggedIn: true,
      isShowcase,
      user: {
        id: piUser?.uid || 'me',
        name: piUser?.username ? `@${piUser.username}` : (isShowcase ? 'Showcase Pioneer' : 'Alex Pioneer'),
        username: piUser?.username || 'alex_web3',
        age: 30,
        jobTitle: 'Pi Ecosystem Pioneer',
        bio: isShowcase ? 'Exploring the Pi Dating Showcase mode!' : 'Building and dating in the Pi Network. Let’s mine together!',
        images: ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80'],
        location: 'Global Network',
        interests: ['Pi Network', 'Trading', 'AI'],
        isPremium: isShowcase,
        premiumTier: isShowcase ? 'GOLD' : null,
        stats: { activities: 45, likes: 120, moments: 89 }
      },
      method,
    });
  };

  const handleUpdateUser = (updatedUser: UserProfile) => {
    setAuth(prev => ({
      ...prev,
      user: updatedUser
    }));
  };

  const handleTierPurchase = (tier: string) => {
    if (auth.user) {
      handleUpdateUser({
        ...auth.user,
        isPremium: true,
        premiumTier: tier as any
      });
      console.log(`User upgraded to ${tier}`);
    }
  };

  const openChat = (user: UserProfile) => {
    setSelectedChatUser(user);
    setActiveScreen(AppScreen.CHAT);
  };

  const FloatingButtons = () => {
    const hideOn = [AppScreen.CHAT, AppScreen.PROFILE, AppScreen.LOGIN, AppScreen.SETTINGS];
    if (hideOn.includes(activeScreen)) return null;

    return (
      <div className="fixed top-8 right-8 z-[150] flex flex-col gap-3">
        <button 
          onClick={() => setActiveScreen(AppScreen.PROFILE)}
          className="w-12 h-12 glass rounded-full flex items-center justify-center border-white/30 hover:bg-white/10 active:scale-90 transition-all overflow-hidden shadow-2xl"
        >
          {auth.user?.images[0] ? (
            <img src={auth.user.images[0]} className="w-full h-full object-cover" alt="Profile" />
          ) : (
            <User size={20} className="text-white/60" />
          )}
        </button>
        <button 
          onClick={() => setActiveScreen(AppScreen.SETTINGS)}
          className="w-12 h-12 glass rounded-full flex items-center justify-center border-white/30 hover:bg-white/10 active:scale-90 transition-all text-white/60 shadow-2xl"
        >
          <Settings size={20} />
        </button>
      </div>
    );
  };

  const renderScreen = () => {
    if (!auth.isLoggedIn) return <Login onLogin={handleLogin} />;

    switch (activeScreen) {
      case AppScreen.DISCOVER:
        return (
          <Discover 
            onMatch={(u) => { setMatches(prev => [...prev, u]); setActiveScreen(AppScreen.MATCHES); }} 
            onUpgrade={() => setActiveScreen(AppScreen.SHOP)}
          />
        );
      case AppScreen.MATCHES:
        return <Matches matches={matches} onSelectChat={openChat} />;
      case AppScreen.CHAT:
        return selectedChatUser ? (
          <Chat user={selectedChatUser} onBack={() => setActiveScreen(AppScreen.MATCHES)} />
        ) : (
          <Discover onMatch={() => {}} onUpgrade={() => {}} />
        );
      case AppScreen.MARKET:
        return <Marketplace serverConfig={serverConfig} />;
      case AppScreen.SHOP:
        return <Shop currentTier={auth.user?.premiumTier} onPurchaseSuccess={handleTierPurchase} />;
      case AppScreen.WALLET:
        return <Wallet />;
      case AppScreen.SETTINGS:
        return <ServerSettings config={serverConfig} onUpdateConfig={setServerConfig} onBack={() => setActiveScreen(AppScreen.PROFILE)} />;
      case AppScreen.PROFILE:
        return auth.user ? (
          <Profile 
            user={auth.user} 
            onBack={() => setActiveScreen(AppScreen.DISCOVER)}
            onLogout={() => setAuth({ isLoggedIn: false, isShowcase: false, user: null, method: null })} 
            onUpdateUser={handleUpdateUser}
            onOpenSettings={() => setActiveScreen(AppScreen.SETTINGS)}
          />
        ) : <Login onLogin={handleLogin} />;
      default:
        return <Discover onMatch={() => {}} onUpgrade={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen relative text-white selection:bg-purple-500/30">
      <div className="max-w-md mx-auto h-screen relative bg-[#0f0511] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        {auth.isLoggedIn && <FloatingButtons />}
        {auth.isShowcase && <FeatureTour screen={activeScreen} />}
        
        <div className="h-full overflow-hidden">
          {renderScreen()}
        </div>

        {auth.isLoggedIn && activeScreen !== AppScreen.CHAT && activeScreen !== AppScreen.PROFILE && activeScreen !== AppScreen.SETTINGS && (
          <Navigation activeScreen={activeScreen} onScreenChange={setActiveScreen} />
        )}
      </div>
    </div>
  );
};

export default App;
