import React, { useState, useEffect } from 'react';
import { singaporeTowns } from '../data/mockData';

interface RadarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const radarFrames = [
  { time: '08:30 AM', label: '-75 min', rainCenterOffset: { x: 30, y: 0 } },
  { time: '08:45 AM', label: '-60 min', rainCenterOffset: { x: 20, y: 5 } },
  { time: '09:00 AM', label: '-45 min', rainCenterOffset: { x: 10, y: 10 } },
  { time: '09:15 AM', label: '-30 min', rainCenterOffset: { x: 5, y: 15 } },
  { time: '09:30 AM', label: '-15 min', rainCenterOffset: { x: 0, y: 20 } },
  { time: '09:45 AM', label: 'Current', rainCenterOffset: { x: -5, y: 25 } },
];

export const RadarModal: React.FC<RadarModalProps> = ({ isOpen, onClose }) => {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(5);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1000);
  const [layerType, setLayerType] = useState<'radar' | 'satellite' | 'lightning'>('radar');

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % radarFrames.length);
    }, playbackSpeed);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, playbackSpeed]);

  if (!isOpen) return null;

  const currentFrame = radarFrames[currentFrameIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#001e30] text-white w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#024b71]">
        {/* Header */}
        <div className="bg-[#00334e] px-6 py-4 flex items-center justify-between border-b border-[#024b71]">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-[#8cc63f]">radar</span>
            <div>
              <h2 className="font-['Manrope'] text-xl font-bold">
                Singapore High-Resolution Doppler Weather Radar
              </h2>
              <p className="font-['Hanken_Grotesk'] text-xs text-[#85b9e5]">
                Meteorological Service Singapore • 240km Dual-Polarization Radar
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Radar Stage */}
        <div className="flex-1 relative bg-[#001424] overflow-hidden flex items-center justify-center">
          {/* Radar Map Graphics */}
          <svg viewBox="0 0 900 500" className="w-full h-full object-contain">
            <defs>
              <linearGradient id="oceanDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#041f33" />
                <stop offset="100%" stopColor="#021422" />
              </linearGradient>
              <linearGradient id="landDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#093554" />
                <stop offset="100%" stopColor="#06253c" />
              </linearGradient>

              {/* Rain Cell Radar Color Scales */}
              <radialGradient id="heavyCell" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#6b3f98" stopOpacity="0.95" />
                <stop offset="35%" stopColor="#d8001d" stopOpacity="0.85" />
                <stop offset="60%" stopColor="#f85900" stopOpacity="0.75" />
                <stop offset="85%" stopColor="#8cc63f" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#8cc63f" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ocean */}
            <rect width="900" height="500" fill="url(#oceanDark)" />

            {/* Range Rings (50km, 100km, 150km) */}
            <circle cx="450" cy="260" r="80" fill="none" stroke="#004a70" strokeWidth="1" strokeDasharray="4,4" />
            <circle cx="450" cy="260" r="160" fill="none" stroke="#004a70" strokeWidth="1" strokeDasharray="4,4" />
            <circle cx="450" cy="260" r="240" fill="none" stroke="#004a70" strokeWidth="1" strokeDasharray="4,4" />

            {/* Singapore Mainland */}
            <path
              d="M 170,270 
                 Q 210,230 310,210 
                 Q 420,190 530,190 
                 Q 630,200 730,230 
                 Q 770,250 800,270 
                 Q 810,300 750,320 
                 Q 670,340 590,330 
                 Q 510,350 430,345 
                 Q 340,340 250,330 
                 Q 170,320 170,270 Z"
              fill="url(#landDark)"
              stroke="#0ea5e9"
              strokeWidth="2"
              strokeOpacity="0.6"
            />

            {/* Islands */}
            <ellipse cx="280" cy="360" rx="40" ry="18" fill="url(#landDark)" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.6" />
            <ellipse cx="500" cy="370" rx="35" ry="12" fill="url(#landDark)" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.6" />
            <ellipse cx="730" cy="200" rx="40" ry="15" fill="url(#landDark)" stroke="#0ea5e9" strokeWidth="1.5" strokeOpacity="0.6" />

            {/* Animated Rain Echo Clusters based on active frame */}
            {layerType === 'radar' && (
              <g className="transition-all duration-700 ease-out">
                <ellipse
                  cx={480 + currentFrame.rainCenterOffset.x}
                  cy={270 + currentFrame.rainCenterOffset.y}
                  rx="110"
                  ry="75"
                  fill="url(#heavyCell)"
                  className="filter blur-[1px]"
                />
                <ellipse
                  cx={310 + currentFrame.rainCenterOffset.x * 0.8}
                  cy={260 + currentFrame.rainCenterOffset.y * 0.8}
                  rx="80"
                  ry="50"
                  fill="url(#heavyCell)"
                  className="filter blur-[1px]"
                />
              </g>
            )}

            {/* Town Labels */}
            {singaporeTowns.map((town) => {
              const posX = (town.coordinates.x / 100) * 650 + 120;
              const posY = (town.coordinates.y / 100) * 280 + 120;
              return (
                <g key={town.name}>
                  <circle cx={posX} cy={posY} r="4" fill="#38bdf8" />
                  <text
                    x={posX}
                    y={posY - 7}
                    textAnchor="middle"
                    className="text-[10px] font-['Hanken_Grotesk'] font-bold fill-[#94a3b8]"
                  >
                    {town.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Overlay Status Badge */}
          <div className="absolute top-4 left-4 bg-[#001e30]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#024b71] flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-[#8cc63f] animate-pulse"></span>
            <div>
              <div className="font-['Manrope'] font-bold text-sm text-white">
                Frame Time: {currentFrame.time} ({currentFrame.label})
              </div>
              <div className="text-xs text-[#85b9e5]">Doppler Velocity & Reflectivity</div>
            </div>
          </div>

          {/* Intensity Legend on bottom left */}
          <div className="absolute bottom-4 left-4 bg-[#001e30]/80 backdrop-blur-md p-3 rounded-xl border border-[#024b71]">
            <div className="text-[11px] font-bold text-[#85b9e5] uppercase mb-1.5">
              Rain Rate (mm/hr)
            </div>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="w-4 h-3 bg-[#8cc63f] rounded-sm"></span> Light (0.2-2)
              <span className="w-4 h-3 bg-[#f85900] rounded-sm ml-2"></span> Mod (2-10)
              <span className="w-4 h-3 bg-[#d8001d] rounded-sm ml-2"></span> Heavy (10-30)
              <span className="w-4 h-3 bg-[#6b3f98] rounded-sm ml-2"></span> Very Heavy (&gt;30)
            </div>
          </div>
        </div>

        {/* Playback Controls & Scrubber Footer */}
        <div className="bg-[#00273f] p-4 border-t border-[#024b71] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-[#8cc63f] text-[#001e30] flex items-center justify-center font-bold hover:bg-[#7cb435] transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-2xl">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <div className="flex items-center gap-1 bg-[#001e30] p-1 rounded-lg border border-[#024b71]">
              {[
                { label: '0.5x', speed: 1800 },
                { label: '1.0x', speed: 1000 },
                { label: '2.0x', speed: 500 },
              ].map((s) => (
                <button
                  key={s.label}
                  onClick={() => setPlaybackSpeed(s.speed)}
                  className={`px-2.5 py-1 rounded text-xs font-bold ${
                    playbackSpeed === s.speed
                      ? 'bg-[#004a70] text-[#85b9e5]'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline Step Buttons */}
          <div className="flex items-center gap-2 flex-grow max-w-md justify-center">
            {radarFrames.map((frame, idx) => (
              <button
                key={frame.time}
                onClick={() => {
                  setCurrentFrameIndex(idx);
                  setIsPlaying(false);
                }}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  currentFrameIndex === idx
                    ? 'bg-[#8cc63f] text-[#001e30] shadow-md scale-105'
                    : 'bg-[#001e30] text-white/70 hover:text-white border border-[#024b71]'
                }`}
              >
                {frame.time}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLayerType(layerType === 'radar' ? 'satellite' : 'radar')}
              className="text-xs bg-[#004a70] text-[#85b9e5] px-3 py-2 rounded-lg font-bold hover:bg-[#005f90] transition-colors"
            >
              Layer: {layerType.toUpperCase()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
