import React, { useState } from 'react';

interface AlphaAccessProps {
  onClose: () => void;
  onAuthorize: (name: string, email: string) => void;
}

const AlphaAccess: React.FC<AlphaAccessProps> = ({ onClose, onAuthorize }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onAuthorize(name.trim(), email.trim());
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl">
      <div className="bg-slate-900 w-full max-w-lg rounded-[48px] shadow-[0_0_80px_-15px_rgba(79,70,229,0.3)] p-12 md:p-16 border border-white/10 relative animate-in zoom-in-95">
        <button 
          onClick={onClose}
          className="absolute top-10 right-10 text-slate-500 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-indigo-600 rounded-[24px] mx-auto mb-8 flex items-center justify-center shadow-lg shadow-indigo-500/30">
             <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <h2 className="text-4xl font-black text-white uppercase italic mb-2 tracking-tighter">
            ALPHA <span className="text-indigo-500">ACCESS</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">
            IDENTITY VERIFICATION
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Callsign</label>
            <input 
              type="text" 
              placeholder="YOUR NAME" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700"
              required 
            />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-bold text-slate-500 uppercase tracking-widest ml-1">Secure Email</label>
            <input 
              type="email" 
              placeholder="ALPHA@STUDENT.FIT" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold focus:border-indigo-500 outline-none transition-all placeholder:text-slate-700"
              required 
            />
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-500/20 transition-all hover:-translate-y-1 mt-4"
          >
            INITIATE SYSTEM_
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlphaAccess;
