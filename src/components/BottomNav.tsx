import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="docked bottom-0 z-50 md:hidden border-t border-[#c1c7cf] shadow-lg fixed left-0 w-full flex justify-around items-center bg-[#f8f9fa] py-2.5 pb-safe">
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center justify-center rounded-xl px-6 py-2 transition-all ${
          activeTab === 'dashboard'
            ? 'bg-[#004a70] text-white shadow-sm'
            : 'text-[#41474e] hover:bg-[#edeeef]'
        }`}
      >
        <span className="material-symbols-outlined text-2xl">dashboard</span>
        <span className="font-['Manrope'] text-sm font-extrabold uppercase tracking-wide mt-0.5">
          Dashboard
        </span>
      </button>

      <button
        onClick={() => setActiveTab('alerts')}
        className={`flex flex-col items-center justify-center rounded-xl px-6 py-2 transition-all ${
          activeTab === 'alerts'
            ? 'bg-[#004a70] text-white shadow-sm'
            : 'text-[#41474e] hover:bg-[#edeeef]'
        }`}
      >
        <span className="material-symbols-outlined text-2xl">warning</span>
        <span className="font-['Manrope'] text-sm font-extrabold uppercase tracking-wide mt-0.5">
          Alerts
        </span>
      </button>
    </nav>
  );
};
