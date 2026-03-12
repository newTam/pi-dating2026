
import React, { useState, useEffect } from 'react';
import { Search, Tag, ArrowUpRight, Filter, Plus, Globe, Smartphone, Heart, TrendingUp, Trophy, RefreshCw, Server } from 'lucide-react';
import { ServerConfig, MarketListing } from '../types';

interface MarketplaceProps {
  serverConfig?: ServerConfig;
}

const Marketplace: React.FC<MarketplaceProps> = ({ serverConfig }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [tickerIndex, setTickerIndex] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [listings, setListings] = useState<MarketListing[]>([
    { 
      id: 'g1', 
      title: 'Romantic Surprise Gift Box', 
      seller: 'GiftMaster', 
      price: 25.0, 
      category: 'Gifts 🎁',
      description: 'Luxury packaging with chocolates and roses. Perfect for a match!',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&q=80',
      regions: ['Global']
    },
    { 
      id: 'c1', 
      title: 'Modern Barong Tagalog', 
      seller: 'LoomManila', 
      price: 45.0, 
      category: 'Clothing 👕',
      description: 'Handcrafted pineapple silk barong for the modern Pioneer gentleman.',
      image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=500&q=80',
      regions: ['Philippines']
    },
    { 
      id: 'c2', 
      title: 'Premium Batik Shirt', 
      seller: 'IndoDesign', 
      price: 30.0, 
      category: 'Clothing 👕',
      description: 'Authentic Solo Batik. Breathable and stylish for Jakarta evenings.',
      image: 'https://images.unsplash.com/photo-1598454444233-9dc334394ed3?w=500&q=80',
      regions: ['Indonesia']
    },
    { 
      id: 's1', 
      title: 'Smart/Globe 20GB Load', 
      seller: 'TelcoPH', 
      price: 12.0, 
      category: 'Sim Load 📱',
      description: 'High-speed data for social and dating in the Philippines.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
      regions: ['Philippines']
    }
  ]);

  const promos = [
    "FLASH SALE: GLOBAL SHIPPING NOW 50% CHEAP",
    "TOP BUYER: @pioneer_alex - 5,200π traded this week!",
    "SPECIAL OFFER: 15% OFF on all Gift Boxes for the next 2 hours!"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % promos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSync = async () => {
    if (!serverConfig?.baseUrl) {
      alert("Please configure your QNAP server in Settings first!");
      return;
    }

    setIsSyncing(true);
    try {
      // Simulate real fetch from QNAP
      // In a real scenario: const res = await fetch(`${serverConfig.baseUrl}/inventory`);
      setTimeout(() => {
        // Add one more item from "server" for demo
        const newItem: MarketListing = {
          id: 'server-item-' + Date.now(),
          title: 'QNAP NAS Storage',
          seller: 'Alex_Server',
          price: 150.0,
          category: 'Regional 🌏',
          description: 'High-speed storage from my personal QNAP server.',
          image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=500&q=80',
          regions: ['Personal Server']
        };
        setListings(prev => [newItem, ...prev]);
        setIsSyncing(false);
      }, 1500);
    } catch (err) {
      alert("Failed to sync with QNAP server.");
      setIsSyncing(false);
    }
  };

  const categories = ['All', 'Gifts 🎁', 'Clothing 👕', 'Sim Load 📱', 'Regional 🌏'];

  const handlePurchase = (item: any) => {
    if (!(window as any).Pi) return;
    (window as any).Pi.createPayment({
      amount: item.price,
      memo: `Purchase ${item.title} from ${item.seller}`,
      metadata: { itemId: item.id, type: 'MARKET_PURCHASE' },
    }, {
      onReadyForServerApproval: (paymentId: string) => alert(`Processing Payment: ${paymentId}`),
      onReadyForServerCompletion: () => alert(`Success! You bought ${item.title}.`),
      onCancel: () => {},
      onError: (err: Error) => alert(`Error: ${err.message}`),
    });
  };

  return (
    <div className="p-6 pb-40 max-w-md mx-auto space-y-6 min-h-screen bg-[#0f0511] overflow-y-auto scrollbar-hide">
      <div className="flex justify-between items-start pt-4">
        <div className="space-y-0.5">
          <h1 className="text-3xl font-black text-white tracking-tighter italic flex items-center gap-2">
             GiftMarket 📦
          </h1>
          <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em] mt-1 ml-1">Global Pioneer Exchange</p>
        </div>
        
        {/* Server Sync Status Indicator */}
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className={`flex items-center gap-2 px-3 py-2 glass border-white/10 rounded-xl transition-all ${
            serverConfig?.isConnected ? 'text-green-400' : 'text-white/30'
          }`}
        >
          {isSyncing ? <RefreshCw size={14} className="animate-spin" /> : <Server size={14} />}
          <span className="text-[9px] font-black uppercase tracking-widest">{isSyncing ? 'Syncing...' : serverConfig?.isConnected ? 'Online' : 'Link Server'}</span>
        </button>
      </div>

      <div className="glass rounded-2xl p-4 border-purple-500/20 bg-purple-500/10 overflow-hidden flex items-center gap-4">
        <div className="bg-purple-500/20 p-2 rounded-xl text-purple-400">
          <TrendingUp size={18} strokeWidth={3} />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-[11px] font-black text-white/90 uppercase tracking-widest whitespace-nowrap">
            {promos[tickerIndex]}
          </p>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
        <input 
          type="text" 
          placeholder="Search items for your match..." 
          className="w-full pl-12 pr-12 py-4 glass border-white/5 rounded-[1.5rem] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 text-white placeholder:text-white/20 transition-all"
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/5 rounded-xl text-white/40">
          <Filter size={16} />
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              activeCategory === cat 
              ? 'bg-white text-[#0f0511] shadow-lg shadow-white/10' 
              : 'glass text-white/40 border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        {listings.filter(l => activeCategory === 'All' || l.category === activeCategory).map((item) => (
          <div key={item.id} className="glass rounded-[2.5rem] overflow-hidden group border-white/5 bg-white/[0.02] hover:border-white/10 transition-all">
            <div className="h-72 relative overflow-hidden">
              <img src={item.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={item.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0511]/80 via-transparent to-transparent"></div>
              
              <div className="absolute top-5 left-5">
                <div className="px-4 py-1.5 glass rounded-full flex items-center gap-2 border-white/20 bg-black/40 backdrop-blur-md">
                  <Tag size={12} className="text-purple-400" />
                  <span className="text-[10px] font-black uppercase text-white tracking-widest">{item.category}</span>
                </div>
              </div>

              {item.regions && item.regions.length > 0 && (
                <div className="absolute top-5 right-5">
                  <div className="px-4 py-1.5 bg-white text-[#0f0511] rounded-full flex items-center gap-2 border border-white/20 shadow-xl">
                    <Globe size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">{item.regions[0]}</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-7 space-y-5">
              <div className="flex justify-between items-start">
                <div className="space-y-1.5">
                  <h3 className="font-black text-white text-2xl tracking-tighter leading-none italic">{item.title}</h3>
                  <p className="text-[11px] text-white/40 font-medium leading-relaxed max-w-[80%]">{item.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-white flex items-center gap-1 justify-end tracking-tighter">
                    {item.price.toFixed(0)} <span className="text-purple-500 font-bold text-lg">π</span>
                  </div>
                  <p className="text-[8px] text-white/30 font-black uppercase tracking-[0.25em] mt-1.5">Direct Ship</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button className="p-4 glass border-white/10 rounded-2xl text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90">
                  <Heart size={22} />
                </button>
                <button 
                  onClick={() => handlePurchase(item)}
                  className="flex-1 py-4 bg-white text-[#0f0511] rounded-2xl text-[12px] font-black uppercase tracking-[0.15em] shadow-2xl shadow-white/10 flex items-center justify-center gap-3 active:scale-95 transition-all hover:bg-gray-100"
                >
                  Confirm Trade <ArrowUpRight size={18} strokeWidth={3} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
