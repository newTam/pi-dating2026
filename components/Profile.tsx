
import React, { useState, useRef, useEffect } from 'react';
import { UserProfile } from '../types';
import { 
  ChevronLeft, 
  Edit3, 
  ChevronRight, 
  Shield, 
  FileText, 
  Lock, 
  LogOut, 
  X, 
  Plus, 
  Save, 
  Server, 
  Camera, 
  Upload, 
  Sparkles,
  CheckCircle2,
  Loader2
} from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  onLogout: () => void;
  onBack: () => void;
  onUpdateUser: (updatedUser: UserProfile) => void;
  onOpenSettings: () => void;
  isShowcase?: boolean;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80',
];

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onBack, onUpdateUser, onOpenSettings, isShowcase }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProfile>({ ...user });
  const [newInterest, setNewInterest] = useState('');
  const [showImagePicker, setShowImagePicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync editedUser if user prop changes externally
  useEffect(() => {
    if (!isEditing) {
      setEditedUser({ ...user });
    }
  }, [user, isEditing]);

  const settingsItems = [
    { label: 'QNAP Server Sync', icon: <Server size={20} />, action: onOpenSettings },
    { label: 'Subscription', icon: <Shield size={20} /> },
    { label: 'Terms of Use', icon: <FileText size={20} /> },
    { label: 'Privacy Policy', icon: <Lock size={20} /> },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate network delay for that "real app" feel
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    onUpdateUser(editedUser);
    setIsSaving(false);
    setSaveSuccess(true);
    
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditing(false);
    }, 1500);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
    setShowImagePicker(false);
  };

  const handleAddInterest = () => {
    const trimmed = newInterest.trim();
    if (trimmed && !editedUser.interests.includes(trimmed)) {
      setEditedUser({
        ...editedUser,
        interests: [...editedUser.interests, trimmed]
      });
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (interest: string) => {
    setEditedUser({
      ...editedUser,
      interests: editedUser.interests.filter(i => i !== interest)
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser({
          ...editedUser,
          images: [reader.result as string, ...editedUser.images.slice(1)]
        });
        setShowImagePicker(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full bg-[#0f0511] flex flex-col relative overflow-y-auto scrollbar-hide">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-5%] right-[-10%] w-[70%] h-[50%] bg-purple-600/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[40%] bg-pink-600/5 blur-[80px] rounded-full"></div>
      </div>

      <div className="p-6 space-y-8 relative z-10 pb-40">
        <header className="flex items-center justify-between sticky top-0 bg-[#0f0511]/60 backdrop-blur-lg py-2 -mx-6 px-6 z-50">
          <button 
            onClick={isEditing ? handleCancel : onBack}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center border-white/10 hover:bg-white/10 active:scale-90 transition-all"
          >
            {isEditing ? <X size={20} className="text-white/70" /> : <ChevronLeft size={24} className="text-white" />}
          </button>
          <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white/80">
            {isEditing ? 'Edit Pioneer' : 'Pioneer Profile'}
          </h2>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="w-10 h-10 glass rounded-xl flex items-center justify-center border-white/10 text-white/60 hover:text-white transition-colors"
            >
              <Edit3 size={18} />
            </button>
          ) : (
            <div className="w-10" /> // Spacer for alignment
          )}
        </header>

        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className={`w-36 h-36 rounded-[2.5rem] border-[3px] p-1.5 transition-all duration-700 ${
              isEditing ? 'border-purple-500 scale-105 shadow-[0_0_40px_rgba(168,85,247,0.4)]' : 'border-white/10'
            }`}>
              <div className="w-full h-full rounded-[2.2rem] overflow-hidden relative bg-white/5">
                <img 
                  src={isEditing ? editedUser.images[0] : user.images[0]} 
                  className={`w-full h-full object-cover shadow-2xl transition-transform duration-700 ${isEditing ? 'scale-110' : 'scale-100'}`} 
                  alt="Avatar" 
                />
                
                {isEditing && (
                  <button 
                    onClick={() => setShowImagePicker(true)}
                    className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 opacity-0 hover:opacity-100 transition-opacity animate-in fade-in"
                  >
                    <Camera size={28} className="text-white" />
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">Update Photo</span>
                  </button>
                )}
              </div>
            </div>
            {user.isPremium && !isEditing && (
              <div className="absolute -top-2 -right-2 bg-yellow-400 p-2 rounded-full text-black shadow-xl ring-4 ring-[#0f0511] animate-bounce">
                <Sparkles size={16} fill="currentColor" />
              </div>
            )}
          </div>
          
          <div className="text-center space-y-4 w-full">
            {isEditing ? (
              <div className="space-y-5 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Image Picker */}
                {showImagePicker && (
                  <div className="glass p-5 rounded-[2.5rem] border-purple-500/30 bg-purple-500/5 space-y-4 animate-in zoom-in duration-300 mb-4">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Gallery Presets</span>
                      <button onClick={() => setShowImagePicker(false)} className="text-white/30 hover:text-white"><X size={14} /></button>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {PRESET_AVATARS.map((url, i) => (
                        <button 
                          key={i}
                          onClick={() => {
                            setEditedUser({ ...editedUser, images: [url, ...editedUser.images.slice(1)] });
                            setShowImagePicker(false);
                          }}
                          className={`w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all ${editedUser.images[0] === url ? 'border-purple-500 scale-105 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                          <img src={url} className="w-full h-full object-cover" alt={`Preset ${i}`} />
                        </button>
                      ))}
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full aspect-square rounded-2xl glass border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-1 text-white/40 hover:text-white hover:border-white/20 transition-all"
                      >
                        <Upload size={20} />
                        <span className="text-[8px] font-black uppercase tracking-tighter">Custom</span>
                      </button>
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Full Name</label>
                    <input
                      type="text"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                      className="w-full glass py-3.5 px-4 rounded-2xl text-white font-bold tracking-tight italic border-white/10 focus:border-purple-500/50 focus:bg-white/5 focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Age</label>
                    <input
                      type="number"
                      value={editedUser.age}
                      onChange={(e) => setEditedUser({ ...editedUser, age: parseInt(e.target.value) || 18 })}
                      className="w-full glass py-3.5 px-4 rounded-2xl text-white font-bold tracking-tight border-white/10 focus:border-purple-500/50 focus:bg-white/5 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Occupation / Job Title</label>
                  <input
                    type="text"
                    value={editedUser.jobTitle}
                    onChange={(e) => setEditedUser({ ...editedUser, jobTitle: e.target.value })}
                    className="w-full glass py-3.5 px-4 rounded-2xl text-white font-medium border-white/10 focus:border-purple-500/50 focus:bg-white/5 focus:outline-none transition-all"
                    placeholder="e.g. Node Runner"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Bio / About Me</label>
                  <textarea
                    value={editedUser.bio}
                    onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                    className="w-full glass py-4 px-4 rounded-2xl text-white text-sm font-medium border-white/10 focus:border-purple-500/50 focus:bg-white/5 focus:outline-none transition-all h-28 resize-none leading-relaxed"
                    placeholder="Tell your story..."
                  />
                </div>

                <div className="space-y-3 pt-2">
                  <label className="text-[9px] font-black text-white/30 uppercase tracking-widest ml-1">Interests & Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {editedUser.interests.map((interest, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 px-4 py-2 rounded-full glass border-purple-500/30 text-purple-300 text-[10px] font-black uppercase tracking-widest animate-in zoom-in"
                      >
                        {interest}
                        <button onClick={() => handleRemoveInterest(interest)} className="text-purple-300/50 hover:text-red-400 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                      placeholder="Add tag (e.g. Crypto)"
                      className="flex-1 glass py-3 px-5 rounded-full text-[10px] font-black text-white placeholder:text-white/20 uppercase tracking-widest border-white/5 focus:outline-none focus:border-purple-500/30 transition-all"
                    />
                    <button 
                      onClick={handleAddInterest}
                      className="w-12 h-12 glass rounded-full flex items-center justify-center border-purple-500/30 text-purple-400 active:scale-90 transition-all"
                    >
                      <Plus size={22} />
                    </button>
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={handleSave}
                    disabled={isSaving || saveSuccess}
                    className={`w-full py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${
                      saveSuccess 
                        ? 'bg-green-500 text-white shadow-green-500/20' 
                        : 'gradient-btn text-white shadow-purple-500/30 hover:opacity-90'
                    }`}
                  >
                    {isSaving ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : saveSuccess ? (
                      <><CheckCircle2 size={20} /> Updated Successfully</>
                    ) : (
                      <><Save size={20} /> Save Changes</>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-top-4 duration-700">
                <h3 className="text-4xl font-black tracking-tighter text-white italic">{user.name}, {user.age}</h3>
                <p className="text-purple-400 text-[10px] font-black uppercase tracking-[0.25em] mt-1">{user.jobTitle || 'Verified Pioneer'}</p>
                <p className="text-white/50 text-sm font-medium tracking-wide leading-relaxed mt-4 px-6 mx-auto max-w-xs">{user.bio}</p>
                
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {user.interests.map((interest, i) => (
                    <span key={i} className="px-5 py-2.5 glass border-white/5 bg-white/[0.03] rounded-full text-[9px] font-black text-white/40 uppercase tracking-[0.15em]">
                      {interest}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 mt-10">
                  {[
                    { label: 'ACTIVITIES', value: user.stats.activities },
                    { label: 'LIKES', value: user.stats.likes },
                    { label: 'MOMENTS', value: user.stats.moments },
                  ].map((stat, i) => (
                    <div key={i} className="glass py-6 rounded-[2rem] flex flex-col items-center justify-center gap-1.5 border-white/5 bg-white/[0.02]">
                      <span className="text-2xl font-black text-white">{stat.value}</span>
                      <span className="text-[8px] text-white/30 font-black uppercase tracking-[0.1em]">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mt-10 text-left">
                  {settingsItems.map((item, i) => (
                    <button 
                      key={i} 
                      onClick={item.action}
                      className="w-full glass p-5 rounded-[1.8rem] flex items-center justify-between group border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center text-white/30 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-all">
                          {item.icon}
                        </div>
                        <span className="text-sm font-bold text-white/70 tracking-tight group-hover:text-white">{item.label}</span>
                      </div>
                      <ChevronRight size={18} className="text-white/10 group-hover:text-white/40 transition-colors" />
                    </button>
                  ))}
                  
                  <button 
                    onClick={onLogout}
                    className="w-full glass p-5 rounded-[1.8rem] flex items-center justify-between group border-red-500/10 bg-red-500/[0.01] hover:bg-red-500/10 transition-colors mt-8"
                  >
                    <div className="flex items-center gap-4 text-red-400/60 group-hover:text-red-400 transition-colors">
                      <div className="w-10 h-10 rounded-2xl bg-red-500/5 flex items-center justify-center">
                        <LogOut size={20} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sign Out Session</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Bottom padding for navigation */}
      {!isEditing && <div className="h-32"></div>}
    </div>
  );
};

export default Profile;
