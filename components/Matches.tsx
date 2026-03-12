
import React from 'react';
import { Search, MessageSquare, Heart, Clock } from 'lucide-react';
import { UserProfile } from '../types';

interface MatchesProps {
  matches: UserProfile[];
  onSelectChat: (user: UserProfile) => void;
}

const Matches: React.FC<MatchesProps> = ({ matches, onSelectChat }) => {
  return (
    <div className="h-full bg-[#0f0511] flex flex-col relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[80%] h-[50%] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="p-6 flex-1 flex flex-col relative z-10 scrollbar-hide overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-black text-white tracking-tighter italic">Your Matches</h1>
          <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mt-1">Connections in the Pi Ecosystem</p>
        </header>
        
        <div className="relative mb-8 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-purple-400 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search matches..."
            className="w-full pl-12 pr-4 py-4 glass border-white/5 rounded-[1.5rem] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 text-white placeholder:text-white/20 transition-all"
          />
        </div>

        {/* New Matches Horizontal Scroll */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">New Pioneers</h2>
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">{matches.length} New</span>
          </div>
          
          <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
            {matches.map((match) => (
              <button
                key={match.id}
                onClick={() => onSelectChat(match)}
                className="flex-shrink-0 flex flex-col items-center gap-2 group"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-2 border-purple-500/50 p-1 group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={match.images[0]}
                      alt={match.name}
                      className="w-full h-full rounded-full object-cover shadow-2xl"
                    />
                  </div>
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-[3px] border-[#0f0511] rounded-full shadow-lg"></div>
                </div>
                <p className="text-[11px] font-black text-white/70 uppercase tracking-tighter group-hover:text-white transition-colors">{match.name.split(' ')[1] || match.name}</p>
              </button>
            ))}
            {matches.length === 0 && (
              <div className="w-full glass py-8 rounded-[2rem] flex flex-col items-center justify-center text-center px-6 border-dashed border-white/10">
                <Heart size={24} className="text-white/10 mb-2" />
                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Swipe to find matches</p>
              </div>
            )}
          </div>
        </div>

        {/* Messages List */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Recent Chats</h2>
          </div>
          
          <div className="space-y-3">
            {matches.map((match) => (
              <button
                key={match.id}
                onClick={() => onSelectChat(match)}
                className="w-full glass p-4 rounded-[1.8rem] flex items-center gap-4 border-white/5 hover:bg-white/5 transition-all active:scale-[0.98] text-left group"
              >
                <div className="relative flex-shrink-0">
                  <img src={match.images[0]} alt={match.name} className="w-16 h-16 rounded-2xl object-cover shadow-xl group-hover:scale-105 transition-transform" />
                  {match.isPremium && (
                    <div className="absolute -top-1 -right-1 bg-yellow-400 w-5 h-5 rounded-full flex items-center justify-center text-black shadow-lg">
                      <Heart size={10} fill="currentColor" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-black text-white tracking-tight italic text-lg">{match.name}</h3>
                    <div className="flex items-center gap-1 text-white/30">
                      <Clock size={10} />
                      <span className="text-[9px] font-black uppercase tracking-widest">12m</span>
                    </div>
                  </div>
                  <p className="text-sm text-white/50 truncate font-medium">Hey! Saw you're into {match.interests[0]} too...</p>
                </div>
              </button>
            ))}
            
            {matches.length === 0 && (
              <div className="py-20 text-center flex flex-col items-center justify-center space-y-4 opacity-20">
                <div className="w-20 h-20 glass rounded-full flex items-center justify-center border-dashed border-white/20">
                  <MessageSquare size={32} />
                </div>
                <p className="text-xs font-black uppercase tracking-[0.3em]">No active chats</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom Padding for Navigation */}
      <div className="h-32"></div>
    </div>
  );
};

export default Matches;
