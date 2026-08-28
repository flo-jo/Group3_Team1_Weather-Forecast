import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="docked bottom-0 z-50 md:hidden border-t border-[#c1c7cf] shadow-lg fixed left-0 w-full flex justify-around items-center bg-[#f8f9fa] py-2 pb-safe">
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center justify-center rounded-xl px-5 py-1.5 transition-all ${
          activeTab === 'dashboard'
            ? 'bg-[#004a70] text-white shadow-sm'
            : 'text-[#41474e] hover:bg-[#edeeef]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">dashboard</span>
        <span className="font-['Hanken_Grotesk'] text-[11px] font-bold uppercase tracking-wider mt-0.5">
          Dashboard
        </span>
      </button>

      <button
        onClick={() => setActiveTab('chatbot')}
        className={`flex flex-col items-center justify-center rounded-xl px-5 py-1.5 transition-all ${
          activeTab === 'chatbot'
            ? 'bg-[#004a70] text-white shadow-sm'
            : 'text-[#41474e] hover:bg-[#edeeef]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">forum</span>
        <span className="font-['Hanken_Grotesk'] text-[11px] font-bold uppercase tracking-wider mt-0.5">
          Chatbot
        </span>
      </button>

      <button
        onClick={() => setActiveTab('alerts')}
        className={`flex flex-col items-center justify-center rounded-xl px-5 py-1.5 transition-all ${
          activeTab === 'alerts'
            ? 'bg-[#004a70] text-white shadow-sm'
            : 'text-[#41474e] hover:bg-[#edeeef]'
        }`}
      >
        <span className="material-symbols-outlined text-xl">warning</span>
        <span className="font-['Hanken_Grotesk'] text-[11px] font-bold uppercase tracking-wider mt-0.5">
          Alerts
        </span>
      </button>
    </nav>
  );
};
