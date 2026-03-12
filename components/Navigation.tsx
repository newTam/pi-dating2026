
import React from 'react';
import { Compass, MessageCircle, CreditCard, Store, Gift } from 'lucide-react';
import { AppScreen } from '../types';

interface NavigationProps {
  activeScreen: AppScreen;
  onScreenChange: (screen: AppScreen) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeScreen, onScreenChange }) => {
  // Reordered according to previous instructions, now updating Market icon to Gift
  const navItems = [
    { icon: <Gift size={24} />, screen: AppScreen.MARKET },
    { icon: <Store size={24} />, screen: AppScreen.SHOP },
    { icon: <Compass size={32} />, screen: AppScreen.DISCOVER, isSpecial: true },
    { icon: <CreditCard size={24} />, screen: AppScreen.WALLET },
    { icon: <MessageCircle size={24} />, screen: AppScreen.MATCHES },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[94%] max-w-sm z-[100]">
      <div className="glass rounded-[3rem] px-4 py-3 flex items-center justify-between shadow-[0_25px_50px_rgba(0,0,0,0.8)] border-white/10">
        {navItems.map((item, idx) => (
          item.isSpecial ? (
            <div key={idx} className="relative -top-5">
              <button
                onClick={() => onScreenChange(item.screen)}
                className={`w-18 h-18 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-110 active:scale-90 border-2 border-white/20 ${
                  activeScreen === item.screen 
                  ? 'bg-gradient-to-tr from-purple-500 to-indigo-600 shadow-[0_0_30px_rgba(168,85,247,0.6)]' 
                  : 'bg-[#1e1425] shadow-xl'
                }`}
              >
                {item.icon}
              </button>
            </div>
          ) : (
            <button
              key={idx}
              onClick={() => onScreenChange(item.screen as AppScreen)}
              className={`w-12 h-12 rounded-full transition-all duration-300 flex flex-col items-center justify-center border border-transparent ${
                activeScreen === item.screen 
                  ? 'text-white bg-white/20 border-white/40 shadow-inner' 
                  : 'text-white/80 hover:text-white'
              }`}
            >
              {item.icon}
            </button>
          )
        ))}
      </div>
    </div>
  );
};

export default Navigation;
