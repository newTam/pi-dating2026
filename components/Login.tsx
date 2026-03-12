
import React, { useState } from 'react';
import { Mail, ShieldCheck, ArrowRight, Lock, AlertTriangle, Loader2, PlayCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (method: 'PI' | 'EMAIL' | 'SHOWCASE', userData?: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handlePiLogin = async () => {
    if (isAuthenticating) return;
    setAuthError(null);
    
    if (!(window as any).Pi) {
      setAuthError("Pi SDK not found. Please open this app inside the Pi Browser.");
      return;
    }

    setIsAuthenticating(true);

    try {
      const onIncompletePaymentFound = (payment: any) => {
        console.warn("Incomplete payment found:", payment);
      };

      const auth = await (window as any).Pi.authenticate(
        ['username', 'payments', 'wallet_address'], 
        onIncompletePaymentFound
      );
      
      onLogin('PI', auth.user);
    } catch (err: any) {
      console.error("Pi Authentication failed:", err);
      if (err.message && err.message.includes("User cancelled")) {
        setAuthError("Authentication was cancelled.");
      } else {
        setAuthError("Failed to authenticate with Pi Network.");
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0511] flex flex-col items-center justify-center p-6 text-white text-center relative overflow-hidden">
      <div className="absolute top-[5%] left-[-20%] w-[120%] h-[60%] bg-[#6b46c1]/20 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-15%] right-[-10%] w-[90%] h-[60%] bg-[#ff62a1]/15 blur-[120px] rounded-full pointer-events-none"></div>
      
      {!showEmailLogin ? (
        <div className="flex flex-col items-center w-full max-w-xs z-10 animate-in fade-in duration-700">
          <div className="w-24 h-24 mb-10 bg-[#1e1425] rounded-[2.2rem] border border-white/10 flex items-center justify-center shadow-2xl relative">
            <div className="absolute inset-0 bg-white/5 rounded-[2.2rem]"></div>
            <span className="text-4xl font-bold text-white relative z-10">π</span>
          </div>
          
          <div className="mb-12">
            <h1 className="text-4xl font-black tracking-tight mb-2 text-white flex items-center justify-center gap-0.5">
              <span className="text-3xl">π</span>Pi Dating
            </h1>
            <p className="text-white/60 text-sm font-medium">Connect with Pioneers Worldwide</p>
          </div>

          <div className="w-full space-y-4">
            <button
              onClick={handlePiLogin}
              disabled={isAuthenticating}
              className="w-full py-5 bg-[#FFD700] hover:bg-[#FACC15] text-[#1e1425] font-black rounded-[2.5rem] shadow-[0_15px_30px_rgba(255,215,0,0.2)] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-70 group"
            >
              <div className="w-6 h-6 bg-[#4C1D95] text-[#FFD700] rounded-full flex items-center justify-center font-bold text-xs group-active:scale-90 transition-transform">
                {isAuthenticating ? <Loader2 size={12} className="animate-spin" /> : 'π'}
              </div>
              {isAuthenticating ? 'Authenticating...' : 'Continue with Pi Network'}
            </button>
            
            <button
              onClick={() => setShowEmailLogin(true)}
              className="w-full py-5 bg-white/5 border border-white/10 text-white font-bold rounded-[2.5rem] flex items-center justify-center gap-3 transition-all hover:bg-white/10 active:scale-95"
            >
              <Mail size={20} className="text-white/70" />
              Continue with Email
            </button>

            <button
              onClick={() => onLogin('SHOWCASE')}
              className="w-full py-4 text-purple-400 font-bold text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-purple-300 transition-colors mt-4"
            >
              <PlayCircle size={16} /> Explore Features (Showcase)
            </button>
          </div>

          {authError && (
            <div className="mt-6 p-4 glass border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-left animate-in slide-in-from-top-2 duration-300">
              <AlertTriangle size={20} className="flex-shrink-0" />
              <p className="text-[10px] font-bold uppercase tracking-widest leading-tight">{authError}</p>
            </div>
          )}

          <div className="mt-20 space-y-10">
            <p className="text-[10px] text-white/40 leading-relaxed font-bold uppercase tracking-[0.18em]">
              BY JOINING, YOU AGREE TO OUR <br/>
              <span className="text-white/60 underline cursor-pointer px-1 hover:text-white transition-colors">TERMS</span> AND <span className="text-white/60 underline cursor-pointer px-1 hover:text-white transition-colors">PRIVACY</span>. 
            </p>
            
            <div className="flex items-center justify-center gap-2 text-white/30 text-[9px] font-black uppercase tracking-[0.25em] bg-white/[0.03] py-3.5 px-6 rounded-full border border-white/5">
              <ShieldCheck size={14} className="text-purple-400/50" />
              <span>SECURE PI WALLET AUTHENTICATION</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-sm glass p-10 rounded-[3rem] border border-white/10 shadow-2xl animate-in fade-in zoom-in duration-500 relative z-10">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
          <h2 className="text-2xl font-black mb-8 tracking-tight text-white italic">Welcome Back</h2>
          
          <div className="space-y-5 text-left">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-white/40 ml-2 uppercase tracking-widest">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/40 text-sm text-white"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-white/40 ml-2 uppercase tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/40 text-sm text-white"
                />
              </div>
            </div>
          </div>
          
          <button
            onClick={() => onLogin('EMAIL')}
            className="w-full py-5 gradient-btn text-white font-black rounded-2xl mt-10 shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Sign In <ArrowRight size={18} />
          </button>
          
          <button
            onClick={() => setShowEmailLogin(false)}
            className="mt-8 text-[10px] font-bold text-white/40 hover:text-white transition-colors uppercase tracking-[0.2em]"
          >
            Back to Pi Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
