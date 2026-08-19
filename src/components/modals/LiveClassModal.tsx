import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Mic, MicOff, Video, VideoOff, Hand, MessageSquare, Users, Send, Radio, Sparkles } from 'lucide-react';

export const LiveClassModal: React.FC = () => {
  const { showLiveClassModal, setShowLiveClassModal, brand, showToast } = useApp();
  const [micOn, setMicOn] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string; isTeacher?: boolean }>>([
    { sender: 'Instructor Alex', text: 'Welcome everyone! Today we are discussing building full-stack reactive components with Node & Express APIs.', time: '6:00 PM', isTeacher: true },
    { sender: 'Rohan Verma', text: 'Good evening sir, is the assignment due tonight?', time: '6:02 PM' },
    { sender: 'Instructor Alex', text: 'No Rohan, due date is August 22. Let us start by looking at DOM events.', time: '6:03 PM', isTeacher: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'chat' | 'participants'>('chat');

  if (!showLiveClassModal) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    const newMsg = {
      sender: brand.studentName,
      text: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages([...chatMessages, newMsg]);
    setInputMessage('');
  };

  const toggleHand = () => {
    setHandRaised(!handRaised);
    showToast(handRaised ? 'Lowered hand' : 'Raised hand ✋ — Instructor notified');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 text-white rounded-2xl max-w-2xl w-full max-h-[95vh] flex flex-col shadow-2xl border border-slate-800 overflow-hidden">
        {/* Live Top Bar */}
        <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold animate-pulse">
              <Radio className="w-3.5 h-3.5" />
              <span>LIVE CLASS</span>
            </div>
            <span className="text-sm font-semibold truncate">Full Stack Development — Evening Session</span>
          </div>
          <button
            onClick={() => setShowLiveClassModal(false)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas & Instructor Presentation Stream */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6wmtKY-pWxTch-5sb6p3BR1nWIS8Q0CRLxyp_wHh7XgVk8hzssoAvspKR99XYXBb2H4rDfw-hNVfW5cvdXy-qMMc84E2q1at4fOCUmZRo6Lo_ZnRP6phFiFYuxWxZZPt-kKRhndMS7UptSqq8bBAip7RJ1cN6vlNFYFMHnru_CY6Qe2VSV155ZKlF9VF8LlOAAxQ3Eot3Wmfu9e5W5DKbB_cI72gDpfmU8P6RWu5m2asbVtne8byzkA"
            alt="Live Stream"
            className="w-full h-full object-cover opacity-90"
          />

          {/* Instructor PIP Badge */}
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
            <span className="text-xs font-semibold">Alex Mercer (Instructor)</span>
          </div>

          {/* Student PIP avatar */}
          <div className="absolute bottom-3 right-3 w-28 h-20 bg-slate-900/90 rounded-xl border border-slate-700 overflow-hidden shadow-lg flex items-center justify-center">
            {cameraOn ? (
              <img src={brand.studentAvatar} alt={brand.studentName} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-1">
                <div className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 mx-auto flex items-center justify-center text-[10px] font-bold">
                  {brand.studentName.charAt(0)}
                </div>
                <p className="text-[9px] text-slate-400 mt-1 truncate max-w-[80px]">You (Cam Off)</p>
              </div>
            )}
          </div>
        </div>

        {/* Live Controls */}
        <div className="px-4 py-2.5 bg-slate-950 border-y border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMicOn(!micOn)}
              className={`p-2.5 rounded-xl border transition-colors ${
                micOn ? 'bg-slate-800 border-slate-700 text-white' : 'bg-rose-500/20 border-rose-500/40 text-rose-400'
              }`}
              title={micOn ? 'Mute Mic' : 'Unmute Mic'}
            >
              {micOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setCameraOn(!cameraOn)}
              className={`p-2.5 rounded-xl border transition-colors ${
                cameraOn ? 'bg-slate-800 border-slate-700 text-white' : 'bg-rose-500/20 border-rose-500/40 text-rose-400'
              }`}
              title={cameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
            >
              {cameraOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </button>
            <button
              onClick={toggleHand}
              className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                handRaised ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              <Hand className="w-4 h-4" />
              <span className="hidden sm:inline">{handRaised ? 'Hand Raised' : 'Raise Hand'}</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                activeTab === 'chat' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat ({chatMessages.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('participants')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                activeTab === 'participants' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>28 Online</span>
            </button>
          </div>
        </div>

        {/* Tab content (Chat & Participants) */}
        <div className="h-44 flex flex-col bg-slate-900">
          {activeTab === 'chat' ? (
            <>
              <div className="flex-1 p-3 overflow-y-auto space-y-2 text-xs">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${msg.isTeacher ? 'text-amber-400' : 'text-blue-400'}`}>
                        {msg.sender}
                      </span>
                      <span className="text-[10px] text-slate-500">{msg.time}</span>
                    </div>
                    <p className="text-slate-300 mt-0.5">{msg.text}</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="p-2 bg-slate-950 border-t border-slate-800 flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type a message or question..."
                  className="flex-1 bg-slate-800 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          ) : (
            <div className="p-3 overflow-y-auto space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="font-bold text-amber-400">Alex Mercer (Host / Instructor)</span>
                <span className="text-emerald-400 text-[10px]">Speaking</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800">
                <span className="font-semibold text-white">{brand.studentName} (You)</span>
                <span className="text-slate-400 text-[10px]">{handRaised ? '✋ Hand Raised' : 'Active'}</span>
              </div>
              {['Rohan Verma', 'Ananya Iyer', 'Vikram Singh', 'Sneha Patel', 'Tanmay Roy'].map((name, i) => (
                <div key={i} className="flex items-center justify-between py-1 text-slate-300">
                  <span>{name}</span>
                  <span className="text-slate-500 text-[10px]">Student</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
