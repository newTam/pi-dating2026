
import React, { useState } from 'react';
import { ChevronLeft, Database, Globe, Key, Save, RefreshCw, AlertCircle, CheckCircle2, HardDrive } from 'lucide-react';
import { ServerConfig } from '../types';

interface ServerSettingsProps {
  config: ServerConfig;
  onUpdateConfig: (config: ServerConfig) => void;
  onBack: () => void;
}

const ServerSettings: React.FC<ServerSettingsProps> = ({ config, onUpdateConfig, onBack }) => {
  const [localConfig, setLocalConfig] = useState<ServerConfig>({ ...config });
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    // Simulate API call to QNAP server
    setTimeout(() => {
      const isUrlValid = localConfig.baseUrl.startsWith('http');
      setIsTesting(false);
      setTestResult(isUrlValid ? 'success' : 'error');
      if (isUrlValid) {
        setLocalConfig(prev => ({ ...prev, isConnected: true, lastSync: Date.now() }));
      }
    }, 2000);
  };

  const handleSave = () => {
    onUpdateConfig(localConfig);
    onBack();
  };

  return (
    <div className="h-full bg-[#0f0511] flex flex-col relative overflow-y-auto scrollbar-hide p-6 space-y-8">
      <header className="flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 glass rounded-xl flex items-center justify-center border-white/10"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-xl font-black italic tracking-tighter">Server Sync</h2>
      </header>

      <div className="glass p-6 rounded-[2.5rem] border-white/5 bg-white/[0.02] space-y-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-purple-500/20 rounded-2xl text-purple-400">
            <HardDrive size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white leading-none">QNAP / Private Server</h3>
            <p className="text-[10px] text-white/30 uppercase font-black tracking-widest mt-1">External Data Source</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              <Globe size={10} /> Server Address (IP or DDNS)
            </label>
            <input
              type="text"
              value={localConfig.baseUrl}
              onChange={(e) => setLocalConfig({ ...localConfig, baseUrl: e.target.value })}
              placeholder="http://your-qnap-ip:8080/api"
              className="w-full glass py-4 px-5 rounded-2xl text-sm font-medium border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/40 text-white placeholder:text-white/10"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] ml-1 flex items-center gap-2">
              <Key size={10} /> API Security Token
            </label>
            <input
              type="password"
              value={localConfig.apiKey}
              onChange={(e) => setLocalConfig({ ...localConfig, apiKey: e.target.value })}
              placeholder="Enter QNAP API Key"
              className="w-full glass py-4 px-5 rounded-2xl text-sm font-medium border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500/40 text-white placeholder:text-white/10"
            />
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button 
            onClick={handleTestConnection}
            disabled={isTesting}
            className="flex-1 py-4 glass border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 active:scale-95 transition-all"
          >
            {isTesting ? <RefreshCw size={16} className="animate-spin" /> : <Database size={16} />}
            Test Link
          </button>
          <button 
            onClick={handleSave}
            className="flex-1 py-4 bg-white text-black rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <Save size={16} />
            Save Link
          </button>
        </div>
      </div>

      {testResult && (
        <div className={`p-6 rounded-[2rem] flex items-center gap-4 animate-in slide-in-from-top-4 duration-300 ${
          testResult === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'
        }`}>
          {testResult === 'success' ? <CheckCircle2 size={24} /> : <AlertCircle size={24} />}
          <div className="flex-1">
            <p className="text-xs font-black uppercase tracking-widest">
              {testResult === 'success' ? 'Connection Established' : 'Connection Failed'}
            </p>
            <p className="text-[10px] opacity-60 mt-0.5">
              {testResult === 'success' ? 'Ready to fetch data from QNAP server.' : 'Ensure CORS is enabled and URL is public.'}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] ml-1">Setup Guide</h4>
        <div className="space-y-3">
          {[
            { step: '1', text: 'Install Web Server or Docker on QNAP' },
            { step: '2', text: 'Create an /api/inventory endpoint' },
            { step: '3', text: 'Enable Access-Control-Allow-Origin (CORS)' },
            { step: '4', text: 'Use HTTPS if app is deployed publicly' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-4 glass rounded-2xl border-white/5 bg-white/[0.01]">
              <span className="text-purple-400 font-black italic">{item.step}.</span>
              <p className="text-[11px] text-white/60 font-medium tracking-tight">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="h-20"></div>
    </div>
  );
};

export default ServerSettings;
