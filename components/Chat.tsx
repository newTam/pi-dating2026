
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Send, Sparkles, Mic, Square, Loader2 } from 'lucide-react';
import { UserProfile, Message } from '../types';
import { generateIcebreaker, transcribeAudio } from '../services/geminiService';

interface ChatProps {
  user: UserProfile;
  onBack: () => void;
}

const Chat: React.FC<ChatProps> = ({ user, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputValue,
      timestamp: Date.now(),
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
    
    // Simulate auto-reply
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: user.id,
        text: "That sounds interesting! Tell me more about your Pi mining journey.",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const handleIcebreaker = async () => {
    setIsGenerating(true);
    const icebreaker = await generateIcebreaker(user.name, user.interests);
    setInputValue(icebreaker);
    setIsGenerating(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType });
        await handleTranscription(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Please allow microphone access to use voice transcription.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleTranscription = async (blob: Blob) => {
    setIsTranscribing(true);
    try {
      const base64Data = await blobToBase64(blob);
      const text = await transcribeAudio(base64Data, blob.type || 'audio/webm');
      if (text) {
        setInputValue(prev => prev ? `${prev} ${text}` : text);
      }
    } catch (err) {
      console.error("Transcription failed:", err);
    } finally {
      setIsTranscribing(false);
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#0f0511] max-w-md mx-auto shadow-xl relative overflow-hidden">
      {/* Background blobs to match theme */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none"></div>

      <header className="flex items-center gap-4 px-4 py-3 border-b border-white/5 sticky top-0 bg-[#0f0511]/80 backdrop-blur-xl z-20">
        <button onClick={onBack} className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/70">
          <ArrowLeft size={24} />
        </button>
        <div className="flex items-center gap-3">
          <img src={user.images[0]} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-purple-500/30" />
          <div>
            <h3 className="font-bold text-white leading-none">{user.name}</h3>
            <span className="text-[10px] text-green-400 font-bold flex items-center gap-1 mt-1 uppercase tracking-widest">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
            </span>
          </div>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10 scrollbar-hide">
        {messages.length === 0 && (
          <div className="text-center py-10 opacity-40">
            <p className="text-sm italic">You matched with {user.name}!</p>
            <p className="text-xs mt-1">Start the conversation with an icebreaker or a voice message.</p>
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-lg ${
                msg.senderId === 'me'
                  ? 'bg-purple-600 text-white rounded-tr-none'
                  : 'glass text-white/90 rounded-tl-none border-white/10'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#0f0511]/90 backdrop-blur-2xl border-t border-white/5 relative z-20">
        <div className="flex items-center gap-2 mb-3">
          <button 
            onClick={handleIcebreaker}
            disabled={isGenerating}
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-[10px] font-bold border border-purple-500/20 hover:bg-purple-500/30 transition-all uppercase tracking-wider"
          >
            <Sparkles size={12} className={isGenerating ? 'animate-spin' : ''} />
            {isGenerating ? 'Analyzing...' : 'AI Icebreaker'}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isTranscribing ? "Transcribing voice..." : "Type a message..."}
              disabled={isTranscribing}
              className="w-full pl-4 pr-12 py-4 bg-white/5 border border-white/10 rounded-[1.5rem] text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/40 text-white placeholder:text-white/20 transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {isTranscribing ? (
                <div className="p-2 text-purple-400">
                  <Loader2 size={20} className="animate-spin" />
                </div>
              ) : (
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`p-2 rounded-full transition-all ${
                    isRecording 
                      ? 'bg-red-500/20 text-red-400 animate-pulse' 
                      : 'text-white/30 hover:text-white/60'
                  }`}
                  title={isRecording ? "Stop Recording" : "Voice Input"}
                >
                  {isRecording ? <Square size={20} /> : <Mic size={20} />}
                </button>
              )}
            </div>
          </div>
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTranscribing}
            className="p-4 gradient-btn text-white rounded-full shadow-xl shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none"
          >
            <Send size={20} />
          </button>
        </div>
        {isRecording && (
          <div className="mt-2 text-[10px] font-bold text-red-400 flex items-center justify-center gap-2 uppercase tracking-[0.2em] animate-pulse">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
            Recording Audio...
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
