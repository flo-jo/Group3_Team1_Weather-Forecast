import React from 'react';
import { TabType } from '../types';
import groupLogo from '../assets/images/group3_team1_logo_1787882925027.jpg';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenNotifications,
  unreadNotificationsCount = 2,
}) => {
  return (
    <header className="bg-[#f8f9fa] border-b border-[#c1c7cf] shadow-sm sticky top-0 z-40 transition-all duration-200 ease-in-out">
      <div className="flex justify-between items-center w-full px-4 md:px-8 py-3.5 max-w-[1200px] mx-auto">
        {/* Brand & Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group"
          onClick={() => setActiveTab('dashboard')}
        >
          <img
            alt="Group 3 Team 1 Logo"
            className="h-10 md:h-12 w-auto max-w-[180px] md:max-w-[220px] object-contain rounded-lg border border-[#c1c7cf]/40 shadow-xs transition-transform group-hover:scale-[1.02]"
            src={groupLogo}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden md:flex gap-8 items-center h-full pt-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`font-['Hanken_Grotesk'] text-xs font-bold uppercase tracking-wider pb-1 transition-all border-b-2 ${
              activeTab === 'dashboard'
                ? 'text-[#00334e] border-[#00334e]'
                : 'text-[#41474e] border-transparent hover:text-[#00334e] hover:border-[#c1c7cf]'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('chatbot')}
            className={`font-['Hanken_Grotesk'] text-xs font-bold uppercase tracking-wider pb-1 transition-all border-b-2 ${
              activeTab === 'chatbot'
                ? 'text-[#00334e] border-[#00334e]'
                : 'text-[#41474e] border-transparent hover:text-[#00334e] hover:border-[#c1c7cf]'
            }`}
          >
            Chatbot
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`font-['Hanken_Grotesk'] text-xs font-bold uppercase tracking-wider pb-1 transition-all border-b-2 ${
              activeTab === 'alerts'
                ? 'text-[#00334e] border-[#00334e]'
                : 'text-[#41474e] border-transparent hover:text-[#00334e] hover:border-[#c1c7cf]'
            }`}
          >
            Alerts
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 text-[#00334e]">
          <button
            aria-label="Notifications"
            onClick={onOpenNotifications}
            className="p-2 rounded-full hover:bg-[#edeeef] transition-colors relative"
            title="View Weather Advisories & Alerts"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#e63946] rounded-full ring-2 ring-white"></span>
            )}
          </button>
          <button
            aria-label="Search"
            onClick={onOpenSearch}
            className="p-2 rounded-full hover:bg-[#edeeef] transition-colors"
            title="Search Locations & Forecasts"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>
        </div>
      </div>
    </header>
  );
};
