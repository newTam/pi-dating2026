
import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  Scan, 
  MoreHorizontal, 
  CreditCard,
  TrendingUp,
  Gift,
  Coffee,
  Heart,
  UserPlus
} from 'lucide-react';

const Wallet: React.FC = () => {
  const [activeCard, setActiveCard] = useState<'E-Wallet' | 'Mainnet'>('E-Wallet');

  const transactions = [
    { id: 1, type: 'Gift', name: 'Ms. Charlotte', date: '2 min ago', amount: -15.0, icon: <Gift size={18} className="text-pink-400" />, category: 'Dating' },
    { id: 2, type: 'Reward', name: 'Mining Speed Boost', date: '1 hour ago', amount: 2.5, icon: <TrendingUp size={18} className="text-green-400" />, category: 'System' },
    { id: 3, type: 'Match', name: 'Siti Aminah', date: '3 hours ago', amount: 10.0, icon: <UserPlus size={18} className="text-blue-400" />, category: 'Referral' },
    { id: 4, type: 'Tip', name: 'Marcus Chen', date: 'Yesterday', amount: 124.9, icon: <Heart size={18} className="text-red-400" />, category: 'Trading' },
  ];

  const chartData = [15, 45, 25, 60, 35, 80, 55];

  return (
    <div className="flex flex-col min-h-screen bg-[#0f0511] pb-32 overflow-y-auto scrollbar-hide">
      <div className="p-6 flex items-center justify-between sticky top-0 bg-[#0f0511]/80 backdrop-blur-xl z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-sm font-black text-white leading-none tracking-tight italic">My Pi Banking</h2>
            <p className="text-[9px] text-white/40 mt-1 font-black uppercase tracking-[0.2em]">Verified Pioneer</p>
          </div>
        </div>
        <div className="flex gap-2 pr-12">
          <button className="p-2.5 glass rounded-full text-white/60 hover:text-white transition-colors">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      <div className="px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/30">Select Account</h3>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            <div 
              onClick={() => setActiveCard('E-Wallet')}
              className={`flex-shrink-0 w-80 h-48 rounded-[2.5rem] p-8 relative overflow-hidden transition-all duration-500 snap-center cursor-pointer ${
                activeCard === 'E-Wallet' ? 'scale-100 ring-4 ring-blue-500/20 shadow-2xl shadow-blue-900/40' : 'scale-95 opacity-40 grayscale'
              } bg-gradient-to-br from-blue-600 to-indigo-900`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="flex justify-between items-start relative z-10">
                <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">LovrAI E-Wallet</span>
                <CreditCard size={20} className="text-white/40" />
              </div>
              <div className="mt-6 relative z-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white tracking-tighter leading-none italic">1,423.12</span>
                  <span className="text-xl font-bold text-white/60">π</span>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xs font-mono text-white/40 tracking-[0.3em]">•••• 1234</span>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">Active Hub</span>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setActiveCard('Mainnet')}
              className={`flex-shrink-0 w-80 h-48 rounded-[2.5rem] p-8 relative overflow-hidden transition-all duration-500 snap-center cursor-pointer ${
                activeCard === 'Mainnet' ? 'scale-100 ring-4 ring-green-500/20 shadow-2xl shadow-green-900/40' : 'scale-95 opacity-40 grayscale'
              } bg-gradient-to-br from-green-500 to-emerald-800`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="flex justify-between items-start relative z-10">
                <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">Mainnet Balance</span>
                <div className="w-5 h-5 bg-white text-emerald-600 rounded-full flex items-center justify-center font-black text-[10px]">π</div>
              </div>
              <div className="mt-6 relative z-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-white tracking-tighter leading-none italic">3,631.99</span>
                  <span className="text-xl font-bold text-white/60">π</span>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xs font-mono text-white/40 tracking-[0.3em]">•••• 9876</span>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-[8px] font-black uppercase text-white/60 tracking-widest">On-Chain</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[
            { icon: <ArrowUpRight size={22} />, label: 'Send' },
            { icon: <ArrowDownLeft size={22} />, label: 'Receive' },
            { icon: <Scan size={22} />, label: 'Scan' },
            { icon: <Plus size={22} />, label: 'Topup' },
          ].map((action, i) => (
            <button key={i} className="flex flex-col items-center gap-3 group">
              <div className="w-full aspect-square glass rounded-[1.5rem] flex items-center justify-center text-white/70 group-hover:bg-white group-hover:text-[#0f0511] transition-all border-white/5 shadow-xl group-active:scale-90">
                {action.icon}
              </div>
              <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">{action.label}</span>
            </button>
          ))}
        </div>

        <div className="space-y-4 pb-12">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-xs font-black uppercase tracking-[0.25em] text-white/30">Live Transactions</h3>
            <button className="text-[10px] font-black text-purple-400 uppercase tracking-widest">View All</button>
          </div>

          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="glass p-5 rounded-[2rem] flex items-center gap-5 border-white/5 hover:bg-white/5 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 text-white group-hover:scale-110 transition-transform">
                  {tx.icon}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-white leading-none">{tx.name}</h4>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-2">{tx.date} • {tx.category}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-black italic ${tx.amount < 0 ? 'text-white' : 'text-green-400'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(1)}
                    <span className="text-[10px] ml-1 opacity-60 font-bold">π</span>
                  </p>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                    <span className="text-[8px] font-black text-white/20 uppercase">Success</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
