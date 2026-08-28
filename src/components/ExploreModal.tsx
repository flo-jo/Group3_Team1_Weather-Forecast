import React from 'react';
import { ExploreTopic } from '../types';

interface ExploreModalProps {
  topic: ExploreTopic | null;
  onClose: () => void;
}

export const ExploreModal: React.FC<ExploreModalProps> = ({ topic, onClose }) => {
  if (!topic) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#c1c7cf]">
        {/* Modal Banner Image & Header */}
        <div className="relative h-48 sm:h-60 bg-slate-900 overflow-hidden flex-shrink-0">
          <img
            src={topic.imageUrl}
            alt={topic.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00334e] via-[#00334e]/40 to-transparent"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-colors z-10"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex gap-2 mb-2">
              {topic.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#b7f568] text-[#102000] text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h2 className="font-['Manrope'] text-2xl md:text-3xl font-bold tracking-tight text-white">
              {topic.title}
            </h2>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <p className="font-['Hanken_Grotesk'] text-base text-[#41474e] leading-relaxed">
            {topic.description}
          </p>

          {/* Key Stats Grid */}
          <div>
            <h3 className="font-['Manrope'] text-sm font-bold uppercase tracking-wider text-[#00334e] mb-3">
              Key Metrics & Sensor Parameters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {topic.keyStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#f8f9fa] border border-[#e1e3e4] p-4 rounded-xl text-center"
                >
                  <div className="text-xs text-[#71787f] font-semibold">{stat.label}</div>
                  <div className="font-['Manrope'] text-xl font-bold text-[#00334e] mt-1">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Bullet Points */}
          <div>
            <h3 className="font-['Manrope'] text-sm font-bold uppercase tracking-wider text-[#00334e] mb-3">
              Meteorological Intelligence & Public Guidance
            </h3>
            <ul className="space-y-2.5">
              {topic.details.map((detail, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 bg-[#f8f9fa] p-3.5 rounded-xl border border-[#e1e3e4] text-sm text-[#191c1d]"
                >
                  <span className="material-symbols-outlined text-[#8cc63f] text-lg flex-shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#f8f9fa] border-t border-[#e1e3e4] p-4 flex justify-between items-center text-xs text-[#71787f]">
          <span>National Environment Agency • Public Portal Data Feed</span>
          <button
            onClick={onClose}
            className="bg-[#00334e] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#004a70] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
