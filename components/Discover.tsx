
import React, { useState } from 'react';
import { X, Heart, Info, MapPin, Sparkles, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { UserProfile } from '../types';
import { MOCK_USERS } from '../constants';

interface DiscoverProps {
  onMatch: (user: UserProfile) => void;
  onUpgrade: () => void;
}

const Discover: React.FC<DiscoverProps> = ({ onMatch, onUpgrade }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState<'left' | 'right' | null>(null);
  const [showMatch, setShowMatch] = useState<UserProfile | null>(null);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);

  const isOutOfUsers = currentIndex >= MOCK_USERS.length;
  const currentUser = !isOutOfUsers ? MOCK_USERS[currentIndex] : null;
  const nextUser = (currentIndex + 1 < MOCK_USERS.length) ? MOCK_USERS[currentIndex + 1] : null;

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isOutOfUsers) return;
    setSwipeDir(direction);
    setTimeout(() => {
      if (direction === 'right') {
        // High chance of match for demo
        if (Math.random() > 0.4 && currentUser) {
          setShowMatch(currentUser);
        } else {
          setCurrentIndex(prev => prev + 1);
        }
      } else {
        setCurrentIndex(prev => prev + 1);
      }
      setSwipeDir(null);
      setDragOffset(0);
    }, 400);
  };

  const onTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (isOutOfUsers) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(x);
  };

  const onTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartX === null || isOutOfUsers) return;
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = x - dragStartX;
    setDragOffset(offset);
  };

  const onTouchEnd = () => {
    if (dragOffset > 100) {
      handleSwipe('right');
    } else if (dragOffset < -100) {
      handleSwipe('left');
    } else {
      setDragOffset(0);
    }
    setDragStartX(null);
  };

  if (showMatch) {
    return (
      <div className="fixed inset-0 z-[200] bg-[#0f0511] flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="absolute inset-0 opacity-40">
           <img src={showMatch.images[0]} className="w-full h-full object-cover blur-sm" alt="Match Blur" />
           <div className="absolute inset-0 bg-gradient-to-b from-[#0f0511]/40 via-[#0f0511] to-[#0f0511]"></div>
        </div>

        <div className="relative z-10 space-y-8 max-w-sm">
          <div className="relative inline-block">
            <div className="w-36 h-36 rounded-full border-4 border-purple-500 p-1 bg-gradient-to-tr from-purple-600 to-pink-500">
              <img src={showMatch.images[0]} className="w-full h-full rounded-full object-cover shadow-2xl" alt="Match" />
            </div>
            <div className="absolute -top-2 -right-2 bg-yellow-400 p-2.5 rounded-full text-black shadow-lg animate-bounce">
              <Heart fill="currentColor" size={24} />
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-4xl font-black text-white tracking-tighter italic drop-shadow-lg">BOOM! MATCHED</h2>
            <p className="text-white/70 text-sm font-medium leading-relaxed">
              {showMatch.name} is interested in you too! Start a conversation or boost your profile to stand out.
            </p>
          </div>

          <div className="w-full space-y-3 pt-4">
            <button 
              onClick={() => {
                onMatch(showMatch);
                setShowMatch(null);
                setCurrentIndex(prev => prev + 1);
              }}
              className="w-full gradient-btn py-5 rounded-[2rem] font-black text-white shadow-2xl shadow-purple-500/40 flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              Send Message <ArrowRight size={20} />
            </button>
            
            <button 
              onClick={() => {
                onUpgrade();
                setShowMatch(null);
              }}
              className="w-full py-5 glass border-yellow-500/30 text-yellow-400 font-black rounded-[2rem] flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              <ShieldCheck size={20} /> Upgrade to Premium
            </button>

            <button 
              onClick={() => {
                setShowMatch(null);
                setCurrentIndex(prev => prev + 1);
              }}
              className="w-full py-4 text-white/30 text-xs font-black uppercase tracking-widest"
            >
              Keep Discovering
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0f0511] flex flex-col relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-purple-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[80%] bg-pink-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div 
        className="flex-1 p-4 pt-10 flex flex-col items-center justify-center relative cursor-grab active:cursor-grabbing"
        onMouseDown={onTouchStart}
        onMouseMove={onTouchMove}
        onMouseUp={onTouchEnd}
        onMouseLeave={onTouchEnd}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {isOutOfUsers ? (
          <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="w-32 h-32 glass rounded-full flex items-center justify-center border-dashed border-white/20 relative">
              <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full animate-pulse"></div>
              <MapPin size={48} className="text-white/20 relative z-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white italic tracking-tighter">No more Pioneers</h2>
              <p className="text-sm text-white/40 font-medium px-12 leading-relaxed">
                You've seen everyone in your current area. Try expanding your search or refresh.
              </p>
            </div>
            <button 
              onClick={() => setCurrentIndex(0)}
              className="px-8 py-4 glass border-white/10 rounded-2xl flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-all"
            >
              <RefreshCw size={16} /> Refresh Discover
            </button>
          </div>
        ) : (
          <>
            {nextUser && (
              <div className="absolute w-[90%] h-[64vh] max-w-sm glass rounded-[2.5rem] overflow-hidden opacity-20 scale-95 translate-y-6 transition-all duration-500">
                 <img src={nextUser.images[0]} className="w-full h-full object-cover grayscale" alt="Next User" />
              </div>
            )}

            <div 
              className={`relative w-full h-[66vh] max-w-sm swipe-card rounded-[2.5rem] overflow-hidden border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col ${swipeDir === 'left' ? 'swipe-left' : ''} ${swipeDir === 'right' ? 'swipe-right' : ''}`}
              style={{ 
                transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`,
                opacity: 1 - Math.abs(dragOffset) / 600
              }}
            >
              {currentUser && (
                <>
                  <img src={currentUser.images[0]} className="flex-1 w-full object-cover pointer-events-none" alt={currentUser.name} />
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 pt-24 bg-gradient-to-t from-[#0f0511] via-[#0f0511]/90 to-transparent">
                    <div className="flex justify-between items-end">
                      <div className="space-y-2 flex-1 pr-2">
                        <div className="flex items-center gap-2">
                          <h2 className="text-3xl font-black text-white tracking-tighter leading-none italic">
                            {currentUser.name}, {currentUser.age}
                          </h2>
                          {currentUser.isPremium && (
                            <div className="bg-yellow-400 text-black p-0.5 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]">
                              <Sparkles size={12} fill="currentColor" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 text-purple-400 text-[11px] font-black uppercase tracking-widest">
                          <MapPin size={12} fill="currentColor" /> {currentUser.location}
                        </div>

                        <p className="text-white/60 text-xs font-medium line-clamp-2 leading-relaxed mt-2">
                          {currentUser.bio}
                        </p>

                        <div className="flex flex-wrap gap-2 pt-4">
                          {currentUser.interests.slice(0, 2).map((interest, i) => (
                            <span key={i} className="px-5 py-2.5 glass border-white/5 bg-white/5 rounded-full text-[10px] font-black text-white/50 uppercase tracking-widest">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="p-3.5 glass rounded-full text-white/40 hover:text-white transition-all border-white/20">
                        <Info size={22} />
                      </button>
                    </div>
                  </div>

                  {dragOffset > 80 && (
                    <div className="absolute top-10 left-10 border-4 border-green-500 text-green-500 font-black text-4xl px-6 py-2 rounded-xl rotate-[-15deg] uppercase z-50">LIKE</div>
                  )}
                  {dragOffset < -80 && (
                    <div className="absolute top-10 right-10 border-4 border-red-500 text-red-500 font-black text-4xl px-6 py-2 rounded-xl rotate-[15deg] uppercase z-50">NOPE</div>
                  )}
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="w-full max-w-sm mt-8 px-6 flex items-center justify-center gap-8 z-40">
              <button 
                onClick={() => handleSwipe('left')}
                className="w-16 h-16 glass bg-white/20 border-white/40 rounded-full flex items-center justify-center text-white hover:text-red-400 transition-all active:scale-90 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <X size={38} strokeWidth={3} />
              </button>
              <button 
                onClick={() => handleSwipe('right')}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#0f0511] shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:scale-110 active:scale-95 transition-all group"
              >
                <Heart size={48} strokeWidth={3} fill="currentColor" className="group-hover:text-pink-600 transition-colors" />
              </button>
              <button 
                className="w-16 h-16 glass bg-white/20 border-white/40 rounded-full flex items-center justify-center text-white hover:text-yellow-400 transition-all active:scale-90 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <Sparkles size={36} fill="currentColor" />
              </button>
            </div>
          </>
        )}
      </div>

      <div className="h-28"></div>
    </div>
  );
};

export default Discover;
