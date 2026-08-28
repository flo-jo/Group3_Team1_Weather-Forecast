import React from 'react';
import { initial24HourWeather, singaporeTowns, fourDayOutlook } from '../data/mockData';

interface ForecastModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const hourlyTimeline = [
  { time: '06:00', temp: 26, condition: 'Fair', icon: 'wb_sunny', rainChance: 10 },
  { time: '08:00', temp: 28, condition: 'Partly Cloudy', icon: 'partly_cloudy_day', rainChance: 15 },
  { time: '10:00', temp: 31, condition: 'Partly Cloudy', icon: 'partly_cloudy_day', rainChance: 25 },
  { time: '12:00', temp: 33, condition: 'Hot & Humid', icon: 'sunny', rainChance: 30 },
  { time: '14:00', temp: 34, condition: 'Scattered Showers', icon: 'rainy', rainChance: 65 },
  { time: '16:00', temp: 29, condition: 'Light Rain', icon: 'rainy', rainChance: 70 },
  { time: '18:00', temp: 28, condition: 'Passing Showers', icon: 'partly_cloudy_day', rainChance: 40 },
  { time: '20:00', temp: 27, condition: 'Partly Cloudy', icon: 'nights_stay', rainChance: 15 },
  { time: '22:00', temp: 26, condition: 'Fair', icon: 'nights_stay', rainChance: 10 },
  { time: '00:00', temp: 26, condition: 'Fair', icon: 'nights_stay', rainChance: 10 },
];

export const ForecastModal: React.FC<ForecastModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#c1c7cf]">
        {/* Modal Header */}
        <div className="bg-[#00334e] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl text-[#b7f568]">
              partly_cloudy_day
            </span>
            <div>
              <h2 className="font-['Manrope'] text-xl font-bold">
                Singapore 24-Hour Detailed Meteorological Forecast
              </h2>
              <p className="font-['Hanken_Grotesk'] text-xs text-[#85b9e5]">
                Issued by Meteorological Service Singapore (MSS) • Updated 28 Aug
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Summary Box */}
          <div className="bg-[#b7f568]/20 border border-[#b7f568] p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-[#102000]">
            <div>
              <div className="font-['Hanken_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#304f00]">
                Synoptic Situation
              </div>
              <p className="font-['Hanken_Grotesk'] text-sm font-medium mt-1 leading-relaxed">
                {initial24HourWeather.summary}
              </p>
            </div>
            <div className="text-right flex-shrink-0 bg-white/80 px-4 py-2 rounded-lg border border-[#b7f568]">
              <div className="text-xs font-bold text-[#304f00]">Temperature Band</div>
              <div className="font-['Manrope'] text-2xl font-bold text-[#102000]">
                26°C - 34°C
              </div>
            </div>
          </div>

          {/* Hourly Timeline */}
          <div>
            <h3 className="font-['Manrope'] text-lg font-bold text-[#00334e] mb-3">
              Hourly Progression & Precipitation Probability
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-3 pt-1">
              {hourlyTimeline.map((item) => (
                <div
                  key={item.time}
                  className="flex-shrink-0 w-24 bg-[#f8f9fa] border border-[#e1e3e4] rounded-xl p-3 text-center flex flex-col items-center justify-between shadow-sm hover:border-[#004a70] transition-colors"
                >
                  <span className="font-['Hanken_Grotesk'] text-xs font-bold text-[#71787f]">
                    {item.time}
                  </span>
                  <span className="material-symbols-outlined text-2xl text-[#004a70] my-2">
                    {item.icon}
                  </span>
                  <span className="font-['Manrope'] text-base font-bold text-[#191c1d]">
                    {item.temp}°C
                  </span>
                  <div className="mt-2 w-full">
                    <span className="text-[10px] text-[#41474e] font-semibold block mb-0.5">
                      {item.rainChance}% rain
                    </span>
                    <div className="w-full bg-[#e1e3e4] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#2a638a] h-full"
                        style={{ width: `${item.rainChance}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Town Micro-Climate Table */}
          <div>
            <h3 className="font-['Manrope'] text-lg font-bold text-[#00334e] mb-3">
              Regional Weather Stations & Micro-Climates
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {singaporeTowns.map((town) => (
                <div
                  key={town.name}
                  className="bg-[#f8f9fa] border border-[#e1e3e4] p-3.5 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-2xl text-[#2a638a]">
                      {town.icon}
                    </span>
                    <div>
                      <div className="font-['Manrope'] font-bold text-sm text-[#00334e]">
                        {town.name}
                      </div>
                      <div className="text-xs text-[#71787f]">{town.region} • {town.condition}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-['Manrope'] font-bold text-base text-[#191c1d]">
                      {town.temp}°C
                    </div>
                    <div className="text-[11px] text-[#55ba47] font-semibold">
                      {town.rainfall > 0 ? `${town.rainfall} mm/h` : '0 mm'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#f8f9fa] border-t border-[#e1e3e4] p-4 flex justify-between items-center text-xs text-[#71787f]">
          <span>Data refreshed in real time from NEA Meteorological Observation Stations</span>
          <button
            onClick={onClose}
            className="bg-[#00334e] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#004a70] transition-colors"
          >
            Close Forecast
          </button>
        </div>
      </div>
    </div>
  );
};
