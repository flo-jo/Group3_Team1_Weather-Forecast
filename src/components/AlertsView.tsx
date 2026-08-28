import React from 'react';
import { initialAdvisories } from '../data/mockData';

export const AlertsView: React.FC = () => {
  return (
    <div className="space-y-8 animate-fadeIn max-w-[1200px] mx-auto">
      {/* Top Header Banner */}
      <div className="bg-[#00334e] text-white p-6 md:p-8 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div>
          <div className="flex items-center gap-2 text-[#85b9e5] font-['Hanken_Grotesk'] text-sm font-bold uppercase tracking-wider mb-1.5">
            <span className="w-3 h-3 rounded-full bg-[#55ba47] animate-pulse"></span>
            Singapore Meteorological Monitoring Center
          </div>
          <h1 className="font-['Manrope'] text-3xl md:text-4xl font-extrabold tracking-tight">
            Environmental Warnings & Advisories
          </h1>
          <p className="font-['Hanken_Grotesk'] text-base md:text-lg text-[#cbe6ff] mt-1.5 font-medium">
            Official real-time early warning advisories issued by MSS and NEA.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-xl border border-white/20 text-left md:text-right shrink-0">
          <div className="text-xs md:text-sm text-white/80 font-['Hanken_Grotesk'] font-medium">Current Threat Level</div>
          <div className="text-lg md:text-xl font-['Manrope'] font-extrabold text-[#b7f568]">ALL CLEAR (GREEN)</div>
        </div>
      </div>

      {/* Active Category Cards - Each Panel with a Different Color & Enlarged Typography */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialAdvisories.map((adv, index) => {
          const advisoryThemes = [
            { bg: 'bg-[#eff6ff]', border: 'border-[#bfdbfe]', tagBg: 'bg-[#dbeafe]', tagText: 'text-[#1e40af]', titleColor: 'text-[#1e3a8a]', textColor: 'text-[#1e40af]' }, // Heavy Rain - Blue
            { bg: 'bg-[#fffbeb]', border: 'border-[#fde68a]', tagBg: 'bg-[#fef3c7]', tagText: 'text-[#92400e]', titleColor: 'text-[#78350f]', textColor: 'text-[#92400e]' }, // Earthquake - Amber
            { bg: 'bg-[#fff1f2]', border: 'border-[#fecdd3]', tagBg: 'bg-[#ffe4e6]', tagText: 'text-[#9f1239]', titleColor: 'text-[#881337]', textColor: 'text-[#9f1239]' }, // Volcanic - Rose
            { bg: 'bg-[#ecfdf5]', border: 'border-[#a7f3d0]', tagBg: 'bg-[#d1fae5]', tagText: 'text-[#065f46]', titleColor: 'text-[#064e3b]', textColor: 'text-[#065f46]' }, // Haze - Mint Emerald
            { bg: 'bg-[#eef2ff]', border: 'border-[#c7d2fe]', tagBg: 'bg-[#e0e7ff]', tagText: 'text-[#3730a3]', titleColor: 'text-[#312e81]', textColor: 'text-[#3730a3]' }, // Tropical Cyclone - Indigo
          ];
          const theme = advisoryThemes[index % advisoryThemes.length];

          return (
            <div
              key={adv.id}
              className={`${theme.bg} rounded-2xl p-6 md:p-7 card-shadow border-2 ${theme.border} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`font-['Hanken_Grotesk'] text-sm md:text-base font-extrabold uppercase tracking-wider ${theme.tagText} ${theme.tagBg} px-3 py-1.5 rounded-lg`}>
                    {adv.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-[#15803d] bg-[#dcfce7] px-2.5 py-1 rounded-full shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16a34a]"></span>
                    Normal
                  </span>
                </div>
                <h3 className={`font-['Manrope'] text-xl md:text-2xl font-extrabold ${theme.titleColor} mb-2 tracking-tight`}>
                  {adv.status}
                </h3>
                <p className={`font-['Hanken_Grotesk'] text-base md:text-lg font-medium ${theme.textColor} leading-relaxed`}>
                  {adv.details}
                </p>
              </div>
              <div className={`mt-6 pt-4 border-t ${theme.border} text-xs md:text-sm ${theme.tagText} flex items-center justify-between font-medium`}>
                <span>Updated: {adv.issuedTime}</span>
                <span className="font-bold">NEA Sensor Network</span>
              </div>
            </div>
          );
        })}

        {/* Additional UV Advisory card - Radiant Solar Sun theme */}
        <div className="bg-[#fefce8] rounded-2xl p-6 md:p-7 card-shadow border-2 border-[#fde047] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
              <span className="font-['Hanken_Grotesk'] text-sm md:text-base font-extrabold uppercase tracking-wider text-[#854d0e] bg-[#fef08a] px-3 py-1.5 rounded-lg">
                UV INDEX WATCH
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-[#c2410c] bg-[#ffedd5] px-2.5 py-1 rounded-full shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]"></span>
                Midday Advisory
              </span>
            </div>
            <h3 className="font-['Manrope'] text-xl md:text-2xl font-extrabold text-[#713f12] mb-2 tracking-tight">
              Peak UV 7-8 Expected at Midday
            </h3>
            <p className="font-['Hanken_Grotesk'] text-base md:text-lg font-medium text-[#854d0e] leading-relaxed">
              UV Index will rise sharply between 11:30 AM and 2:30 PM. Use SPF 30+ sunscreen and protective eyewear.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-[#fde047] text-xs md:text-sm text-[#854d0e] flex items-center justify-between font-medium">
            <span>Peak: 12:30 PM - 2:00 PM</span>
            <span className="text-[#a16207] font-bold">MSS Solar Station</span>
          </div>
        </div>
      </div>
    </div>
  );
};
