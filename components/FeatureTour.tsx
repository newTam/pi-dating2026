
import React from 'react';
import { Info, Sparkles, CreditCard, ShieldCheck, Globe, Server, UserCheck } from 'lucide-react';
import { AppScreen } from '../types';

interface FeatureTourProps {
  screen: AppScreen;
}

const FeatureTour: React.FC<FeatureTourProps> = ({ screen }) => {
  const guideContent = {
    [AppScreen.DISCOVER]: {
      title: "AI Matchmaking",
      desc: "Gemini 3 Flash analyzes interests to predict compatibility scores. Integrated with Pi for visibility boosts.",
      icon: <Sparkles className="text-yellow-400" size={18} />,
      badge: "Gemini 3 Pro"
    },
    [AppScreen.MATCHES]: {
      title: "Social Networking",
      desc: "Real-time chat with fellow Pioneers. AI generates personalized icebreakers based on profile data.",
      icon: <UserCheck className="text-blue-400" size={18} />,
      badge: "Real-time Chat"
    },
    [AppScreen.MARKET]: {
      title: "Pi Commerce",
      desc: "Trade goods and services using Pi. Integrated with Pi Mainnet for seamless decentralized payments.",
      icon: <Globe className="text-green-400" size={18} />,
      badge: "Mainnet SDK"
    },
    [AppScreen.SHOP]: {
      title: "Premium Ecosystem",
      desc: "Support the app and unlock elitist features by subscribing with Pi via official payment flows.",
      icon: <CreditCard className="text-purple-400" size={18} />,
      badge: "Subscription API"
    },
    [AppScreen.WALLET]: {
      title: "Wallet Management",
      desc: "Manage your local app balance and view Mainnet transactions in one unified dashboard.",
      icon: <ShieldCheck className="text-emerald-400" size={18} />,
      badge: "Secure Storage"
    },
    [AppScreen.SETTINGS]: {
      title: "Server Sync",
      desc: "Unique feature: Link your personal QNAP NAS to store private data and sync regional market listings.",
      icon: <Server className="text-indigo-400" size={18} />,
      badge: "QNAP Integration"
    },
    [AppScreen.PROFILE]: {
      title: "Pioneer Identity",
      desc: "Your verifiable profile. Update your bio and interests to improve your AI compatibility results.",
      icon: <Info className="text-white" size={18} />,
      badge: "Pi Auth"
    },
  };

  const current = guideContent[screen as keyof typeof guideContent];
  if (!current) return null;

  return (
    <div className="fixed top-24 left-6 right-6 z-[160] pointer-events-none animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="glass p-4 rounded-3xl border-white/20 bg-black/60 backdrop-blur-3xl shadow-2xl flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 mt-1">
          {current.icon}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-black text-white uppercase tracking-widest">{current.title}</h4>
            <span className="text-[8px] font-black px-2 py-0.5 rounded-full bg-white/10 text-white/60 border border-white/5 uppercase tracking-tighter">
              {current.badge}
            </span>
          </div>
          <p className="text-[10px] text-white/50 leading-relaxed font-medium">
            {current.desc}
          </p>
        </div>
      </div>
      
      {/* Showcase Indicator at bottom */}
      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 glass rounded-full border-purple-500/30 bg-purple-500/10 text-purple-300">
         <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
         <span className="text-[8px] font-black uppercase tracking-[0.2em]">Showcase Mode Active</span>
      </div>
    </div>
  );
};

export default FeatureTour;
