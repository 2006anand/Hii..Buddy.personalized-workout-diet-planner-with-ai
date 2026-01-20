import React from 'react';

interface HeaderProps {
  onHistoryClick: () => void;
  onEnterGym: () => void;
  userName: string | null;
}

const Header: React.FC<HeaderProps> = ({ onHistoryClick, onEnterGym, userName }) => {
  return (
    <header className="sticky top-0 z-[100] bg-zinc-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={onEnterGym}>
          <div className="bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 2v20h2V2H7zm10 0v20h2V2h-2zM2 11v2h20v-2H2z" />
            </svg>
          </div>
          <span className="text-lg font-black tracking-tighter text-white uppercase italic">
            HII <span className="text-indigo-500">BUDDY</span>
          </span>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={onHistoryClick}
            className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-all items-center gap-2"
          >
            BIO_LOGS
          </button>

          {userName ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
               <span className="text-[10px] font-bold uppercase tracking-widest text-white">{userName}</span>
            </div>
          ) : (
            <button 
              onClick={onEnterGym}
              className="px-6 py-2 bg-white text-black rounded-lg font-bold uppercase text-[10px] tracking-widest hover:bg-zinc-200 transition-all"
            >
              Access_
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
