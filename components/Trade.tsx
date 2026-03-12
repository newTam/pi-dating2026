
import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Loader2, Trophy, ShieldCheck, Crown, Star } from 'lucide-react';

interface ShopProps {
  currentTier?: 'BRONZE' | 'SILVER' | 'GOLD' | null;
  onPurchaseSuccess?: (tier: string) => void;
}

const Shop: React.FC<ShopProps> = ({ currentTier, onPurchaseSuccess }) => {
  const [processingId, setProcessingId] = useState<string | null>(null);

  const tiers = [
    {
      id: 'BRONZE',
      title: 'Bronze Pioneer',
      price: '10.0',
      icon: <Trophy className="text-[#CD7F32]" size={32} />,
      color: 'from-[#3a2211] to-[#CD7F32]',
      accent: '#CD7F32',
      features: ['5 Super Likes per day', 'Bronze profile badge', 'Basic visibility boost', 'Ad-free experience'],
      emoji: '🥉'
    },
    {
      id: 'SILVER',
      title: 'Silver Elite',
      price: '25.0',
      icon: <ShieldCheck className="text-[#C0C0C0]" size={32} />,
      color: 'from-[#2a2a2a] to-[#C0C0C0]',
      accent: '#C0C0C0',
      features: ['Unlimited daily likes', 'Silver profile badge', '10 Super Likes per day', 'Priority chat placement', 'See who liked you (Limited)'],
      emoji: '🥈'
    },
    {
      id: 'GOLD',
      title: 'Gold Legend',
      price: '50.0',
      icon: <Crown className="text-[#FFD700]" size={32} />,
      color: 'from-[#4a3b00] to-[#FFD700]',
      accent: '#FFD700',
      features: ['Global profile visibility', 'Gold profile badge', 'Unlimited Super Likes', 'Full "Who Liked You" access', 'AI Wingman suggestions'],
      emoji: '🥇'
    }
  ];

  const handleSubscribe = (tier: typeof tiers[0]) => {
    if (currentTier === tier.id) return;
    if (!(window as any).Pi) {
      alert("Pi SDK not detected. Please use the Pi Browser.");
      return;
    }
    
    setProcessingId(tier.id);

    // Official Pi SDK Payment Integration
    (window as any).Pi.createPayment({
      amount: parseFloat(tier.price),
      memo: `1 Month ${tier.title} Subscription for Pi Dating`,
      metadata: { 
        tier: tier.id, 
        type: 'SUBSCRIPTION',
        duration: '30_DAYS'
      },
    }, {
      onReadyForServerApproval: (paymentId: string) => {
        console.log("Payment ready for server approval:", paymentId);
        // In a real app, you'd notify your backend here to approve the payment via Pi API
      },
      onReadyForServerCompletion: (paymentId: string) => {
        console.log("Payment ready for completion:", paymentId);
        // Payment is successful on the blockchain
        setProcessingId(null);
        if (onPurchaseSuccess) {
          onPurchaseSuccess(tier.id);
        }
      },
      onCancel: (paymentId: string) => {
        console.log("Payment cancelled by user:", paymentId);
        setProcessingId(null);
      },
      onError: (error: Error, payment?: any) => {
        console.error("Payment error:", error, payment);
        alert("Payment failed: " + error.message);
        setProcessingId(null);
      }
    });
  };

  return (
    <div className="h-full bg-[#0f0511] flex flex-col relative overflow-y-auto scrollbar-hide pb-32">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none opacity-50"></div>
      
      <div className="p-6 space-y-8 relative z-10">
        <header className="text-center space-y-3 pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border-white/10 bg-white/5 mb-2">
            <Star size={14} className="text-yellow-400 fill-yellow-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Premium Access</span>
          </div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter">Upgrade Status</h1>
          <p className="text-sm text-white/50 font-medium px-6 leading-relaxed">
            Enhance your dating experience and support the Pi ecosystem with premium features.
          </p>
        </header>

        <div className="space-y-6">
          {tiers.map((tier) => {
            const isActive = currentTier === tier.id;
            return (
              <div 
                key={tier.id} 
                className={`relative overflow-hidden glass rounded-[2.5rem] border-white/10 transition-all duration-500 ${
                  isActive ? 'ring-2 ring-white/20' : 'hover:scale-[1.02]'
                }`}
              >
                {/* Background Accent Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tier.color} opacity-10`}></div>
                
                <div className="p-8 space-y-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{tier.emoji}</span>
                        <h2 className="text-2xl font-black text-white tracking-tight">{tier.title}</h2>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">{tier.price}</span>
                        <span className="text-sm font-bold text-white/40">π / month</span>
                      </div>
                    </div>
                    <div className="p-4 glass rounded-3xl bg-white/5 border-white/10 shadow-2xl">
                      {tier.icon}
                    </div>
                  </div>

                  <div className="h-px w-full bg-white/5"></div>

                  <ul className="grid grid-cols-1 gap-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[11px] font-bold text-white/70">
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                          <Check size={12} style={{ color: tier.accent }} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handleSubscribe(tier)}
                    disabled={isActive || processingId === tier.id}
                    className={`w-full py-5 rounded-[1.5rem] font-black text-[12px] uppercase tracking-[0.15em] flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl relative overflow-hidden ${
                      isActive 
                      ? 'bg-white/10 text-white/40 cursor-default' 
                      : tier.id === 'GOLD' 
                        ? 'bg-white text-black shadow-white/5' 
                        : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {processingId === tier.id ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : isActive ? (
                      <span className="flex items-center gap-2">
                        <Check size={16} /> Current Plan
                      </span>
                    ) : (
                      <>Select {tier.id} <ArrowRight size={18} /></>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="glass p-8 rounded-[2.5rem] border-white/5 bg-white/[0.02] space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-400/10 rounded-lg text-yellow-400">
              <ShieldCheck size={20} />
            </div>
            <h4 className="text-xs font-black uppercase tracking-widest text-white/90">Secure Payments</h4>
          </div>
          <p className="text-[11px] text-white/40 font-medium leading-relaxed">
            All transactions are handled securely through the official Pi Network Mainnet/Testnet SDK. Your wallet address is never stored directly on our servers without encryption.
          </p>
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-tighter text-purple-400">
            <Check size={10} /> Verified Pi App
            <span className="text-white/10">•</span>
            <Check size={10} /> Fast Mainnet Sync
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
