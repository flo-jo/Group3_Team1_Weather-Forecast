import React, { useState } from 'react';
import { AdvisoryItem } from '../types';
import { initialAdvisories } from '../data/mockData';

interface AlertTickerProps {
  onNavigateToAlerts: () => void;
}

export const AlertTicker: React.FC<AlertTickerProps> = ({ onNavigateToAlerts }) => {
  // Check if any advisory has an active warning (level is red or yellow, or status is not 'No warning in force.')
  const activeAdvisories = initialAdvisories.filter(
    (adv) =>
      adv.level === 'red' ||
      adv.level === 'yellow' ||
      (adv.status && !adv.status.toLowerCase().includes('no warning') && !adv.status.toLowerCase().includes('normal'))
  );

  const hasAlerts = activeAdvisories.length > 0;

  // Good weather messages when there are no alerts
  const allClearMessages = [
    '☀️ Life Is Good! No active weather warnings across Singapore.',
    '🌴 Islandwide conditions are fair & calm with gentle tropical breezes.',
    '🌊 Air Quality & 1-hr PM2.5 concentrations remain in the Good band.',
    '🕶️ UV Index is in the safe/moderate range — great day for outdoor strolls!',
    '🇸🇬 Singapore Meteorological Service live monitoring active 24/7.',
  ];

  const alertMessages = activeAdvisories.map(
    (adv) => `⚠️ [${adv.category} ADVISORY]: ${adv.status} - ${adv.details}`
  );

  const tickerItems = hasAlerts
    ? [...alertMessages, ...alertMessages] // duplicate for seamless loop
    : [...allClearMessages, ...allClearMessages];

  return (
    <div
      id="weather-alert-ticker"
      className={`w-full border-b overflow-hidden select-none transition-colors duration-300 ${
        hasAlerts
          ? 'bg-[#ba1a1a] text-white border-[#93000a]'
          : 'bg-[#eef8e4] text-[#1e4620] border-[#c8e6b2]'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 py-2 flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
        {/* Status Badge */}
        <div
          onClick={onNavigateToAlerts}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-['Manrope'] font-bold text-[11px] sm:text-xs uppercase tracking-wider shrink-0 cursor-pointer shadow-xs transition-transform active:scale-95 ${
            hasAlerts
              ? 'bg-white text-[#ba1a1a] animate-pulse'
              : 'bg-[#2e7d32] text-white'
          }`}
        >
          <span className="material-symbols-outlined text-[16px] leading-none">
            {hasAlerts ? 'warning' : 'sunny'}
          </span>
          <span>{hasAlerts ? 'Alert in Force' : 'All Clear'}</span>
        </div>

        {/* Marquee Container */}
        <div className="flex-1 overflow-hidden relative cursor-pointer" onClick={onNavigateToAlerts} title="Click to view warnings & advisories">
          <div className="ticker-track flex items-center whitespace-nowrap">
            {/* Repeated content for seamless marquee scroll */}
            <div className="ticker-content flex items-center gap-8 animate-ticker">
              {tickerItems.map((msg, index) => (
                <span key={index} className="inline-flex items-center gap-2 font-['Hanken_Grotesk'] font-medium">
                  {msg}
                  <span className="opacity-40 text-xs">◆</span>
                </span>
              ))}
            </div>
            <div className="ticker-content flex items-center gap-8 animate-ticker" aria-hidden="true">
              {tickerItems.map((msg, index) => (
                <span key={`dup-${index}`} className="inline-flex items-center gap-2 font-['Hanken_Grotesk'] font-medium">
                  {msg}
                  <span className="opacity-40 text-xs">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Quick link button to view alerts */}
        <button
          onClick={onNavigateToAlerts}
          className={`shrink-0 text-[11px] sm:text-xs font-['Manrope'] font-bold underline underline-offset-2 flex items-center gap-0.5 hover:opacity-80 transition-opacity ${
            hasAlerts ? 'text-white' : 'text-[#2e7d32]'
          }`}
        >
          <span>Advisories</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
