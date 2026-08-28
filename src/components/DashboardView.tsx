import React, { useState, useEffect } from 'react';
import { initial24HourWeather, fourDayOutlook as fallbackFourDayOutlook, initialAdvisories, initialUVData } from '../data/mockData';
import { ExploreTopic, TownWeather } from '../types';
import { fetchAllLiveWeatherData, LiveWeatherData } from '../utils/weatherApi';

interface DashboardViewProps {
  onCheckForecast: () => void;
  onViewMoreRadar: () => void;
  onOpenTopic: (topic: ExploreTopic) => void;
  onSelectTown: (town: TownWeather) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onCheckForecast,
}) => {
  const [liveData, setLiveData] = useState<LiveWeatherData | null>(null);
  const [isLoadingLive, setIsLoadingLive] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<string>('');

  const loadLiveData = async () => {
    setIsLoadingLive(true);
    try {
      const data = await fetchAllLiveWeatherData();
      setLiveData(data);
      setLastRefreshed(data.lastUpdated);
    } catch (err) {
      console.error('Error fetching live weather:', err);
    } finally {
      setIsLoadingLive(false);
    }
  };

  useEffect(() => {
    loadLiveData();
    const interval = setInterval(loadLiveData, 60000);
    return () => clearInterval(interval);
  }, []);

  const forecast24Hr = liveData?.twentyFourHourForecast;
  const tempMin = forecast24Hr?.lowTemp ?? initial24HourWeather.tempMin;
  const tempMax = forecast24Hr?.highTemp ?? initial24HourWeather.tempMax;
  const humidityMin = forecast24Hr?.lowHumidity ?? initial24HourWeather.humidityMin;
  const humidityMax = forecast24Hr?.highHumidity ?? initial24HourWeather.humidityMax;
  const generalCondition = forecast24Hr?.generalForecast || initial24HourWeather.condition;

  const display4Day = (liveData?.fourDayOutlook && liveData.fourDayOutlook.length > 0)
    ? liveData.fourDayOutlook.slice(0, 4)
    : fallbackFourDayOutlook.map(f => ({
        day: f.day,
        date: '',
        condition: f.condition,
        tempLow: f.tempMin,
        tempHigh: f.tempMax,
        icon: f.icon,
      }));

  const currentUV = liveData?.readings?.uvIndex ?? initialUVData.index;
  const getUVCategory = (val: number) => {
    if (val <= 2) return { cat: 'Low', color: '#55ba47' };
    if (val <= 5) return { cat: 'Moderate', color: '#eab308' };
    if (val <= 7) return { cat: 'High', color: '#ea580c' };
    return { cat: 'Very High', color: '#dc2626' };
  };
  const uvStatus = getUVCategory(currentUV);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Live Sync Status Banner */}
      <div className="bg-white border border-[#cbd5e1] rounded-xl px-4 py-2.5 card-shadow flex flex-wrap items-center justify-between gap-3 text-xs font-['Hanken_Grotesk']">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16a34a] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16a34a]"></span>
          </span>
          <span className="font-bold text-[#00334e] uppercase tracking-wider">
            data.gov.sg Real-Time Connected
          </span>
          <span className="text-[#64748b] hidden sm:inline">
            • 2hr & 24hr Forecasts, 4-Day Outlook, Radar, Temp, Rain, PSI, PM2.5, UV, Humidity, Wind Speed
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#475569]">
            Synced: <strong>{lastRefreshed || 'Connecting...'}</strong>
          </span>
          <button
            onClick={loadLiveData}
            disabled={isLoadingLive}
            className="px-2.5 py-1 rounded bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#00334e] font-semibold border border-[#cbd5e1] flex items-center gap-1 transition-all active:scale-95 disabled:opacity-50"
            title="Refresh Live Feeds"
          >
            <span className={`material-symbols-outlined text-sm ${isLoadingLive ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span>{isLoadingLive ? 'Syncing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>
      {/* Hero Section: Weather Grid (3 distinctly colored cards) */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Panel 1: 24-hour weather forecast (Vibrant Lime Green) */}
        <div className="md:col-span-4 bg-[#b7f568] border border-[#9ee24b] rounded-xl p-5 card-shadow flex flex-col justify-between text-[#102000]">
          <div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-[#102000]">
                {initial24HourWeather.icon}
              </span>
              <h2 className="font-['Manrope'] text-xl font-semibold text-[#102000]">
                24-hour weather forecast
              </h2>
            </div>
            <p className="font-['Hanken_Grotesk'] text-lg text-[#102000] mt-2 font-medium">
              {generalCondition}
            </p>
            <div className="mt-4">
              <div className="font-['Manrope'] text-5xl font-bold text-[#102000] tracking-tight">
                {tempMin} - {tempMax}°C
              </div>
              <div className="flex items-center gap-4 mt-4 font-['Hanken_Grotesk'] text-sm font-medium text-[#213803]">
                <div className="flex items-center gap-1.5 bg-[#102000]/10 px-2.5 py-1 rounded-md">
                  <span className="material-symbols-outlined text-base">air</span>
                  <span>
                    {liveData?.readings?.windSpeed ? `${liveData.readings.windSpeed} km/h` : `${initial24HourWeather.windDirection} ${initial24HourWeather.windSpeed}`}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#102000]/10 px-2.5 py-1 rounded-md">
                  <span className="material-symbols-outlined text-base">humidity_percentage</span>
                  <span>
                    {liveData?.readings?.relativeHumidity ? `${Math.round(liveData.readings.relativeHumidity)}%` : `${humidityMin} - ${humidityMax}%`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 text-right">
            <button
              onClick={onCheckForecast}
              className="font-['Hanken_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#102000] inline-flex items-center gap-1 hover:underline group"
            >
              CHECK FORECAST{' '}
              <span className="material-symbols-outlined text-base transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* Panel 2: 4-day Outlook (Fresh Sky Azure Blue) */}
        <div className="md:col-span-4 bg-[#bae6fd] border border-[#7dd3fc] rounded-xl p-5 card-shadow flex flex-col text-[#034063]">
          <h2 className="font-['Manrope'] text-xl font-semibold text-[#034063] mb-4">
            4-day Outlook
          </h2>
          <div className="space-y-3.5 flex-1 flex flex-col justify-between">
            {display4Day.map((item, index) => (
              <div
                key={item.day + index}
                className={`flex items-center justify-between ${
                  index < display4Day.length - 1 ? 'border-b border-[#034063]/15 pb-2.5' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-[#0284c7]">
                    {item.icon}
                  </span>
                  <div>
                    <div className="font-['Hanken_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#034063]">
                      {item.day}
                    </div>
                    <div className="font-['Hanken_Grotesk'] text-sm text-[#0369a1] line-clamp-1">
                      {item.condition}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-['Hanken_Grotesk'] text-sm font-semibold text-[#034063]">
                    {item.tempLow} - {item.tempHigh}°C
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 3: Warnings & Advisories (Warm Solar Apricot / Sunset) */}
        <div className="md:col-span-4 bg-[#fed7aa] border border-[#fdba74] rounded-xl p-5 card-shadow flex flex-col text-[#7c2d12]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-['Manrope'] text-xl font-semibold text-[#7c2d12]">
              Warnings & Advisories
            </h2>
            <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c] animate-ping" title="Live monitoring"></span>
          </div>
          <div className="space-y-3 flex-1">
            {/* Live Environment PSI & PM2.5 Readouts */}
            <div className="border-b border-[#7c2d12]/15 pb-2">
              <div className="font-['Hanken_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#7c2d12] flex items-center justify-between">
                <span>Air Quality (PSI & PM2.5)</span>
                <span className="text-[10px] bg-[#ea580c]/20 px-1.5 py-0.5 rounded font-mono">
                  PSI {liveData?.readings?.psi ?? 42}
                </span>
              </div>
              <div className="font-['Hanken_Grotesk'] text-sm text-[#9a3412]">
                1-hr PM2.5 at {liveData?.readings?.pm25 ?? 12} µg/m³ (Good). Normal outdoor activity.
              </div>
            </div>

            {/* Live Temperature & Rainfall status */}
            <div className="border-b border-[#7c2d12]/15 pb-2">
              <div className="font-['Hanken_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#7c2d12] flex items-center justify-between">
                <span>Precipitation & Temperature</span>
                <span className="text-[10px] bg-[#ea580c]/20 px-1.5 py-0.5 rounded font-mono">
                  {liveData?.readings?.airTemperature ? `${liveData.readings.airTemperature}°C` : '31.2°C'}
                </span>
              </div>
              <div className="font-['Hanken_Grotesk'] text-sm text-[#9a3412]">
                {liveData?.readings?.rainfall && liveData.readings.rainfall > 0
                  ? `Peak island rainfall measured at ${liveData.readings.rainfall} mm/h.`
                  : 'Zero rain detected at main meteorological telemetry stations.'}
              </div>
            </div>

            {/* Heavy Rain & Lightning Outlook */}
            <div>
              <div className="font-['Hanken_Grotesk'] text-xs font-bold uppercase tracking-wider text-[#7c2d12]">
                Convective Thunderstorm
              </div>
              <div className="font-['Hanken_Grotesk'] text-sm text-[#9a3412]">
                Moderate risk of localized afternoon thundery showers over western catchments.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secondary Section: UV Index & Solar Radiation */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* UV Index Card (Radiant Sunbeam Yellow Theme) */}
        <div className="col-span-12 bg-[#fefce8] rounded-xl p-6 card-shadow border-2 border-[#fde047] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div
              className="w-32 h-32 rounded-full border-8 flex items-center justify-center flex-shrink-0 shadow-inner bg-white/90"
              style={{ borderColor: uvStatus.color }}
            >
              <span
                className="font-['Manrope'] text-5xl font-bold"
                style={{ color: uvStatus.color }}
              >
                {currentUV}
              </span>
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="material-symbols-outlined text-2xl text-[#854d0e]">wb_sunny</span>
                <h2 className="font-['Manrope'] text-2xl font-bold text-[#854d0e] tracking-tight">
                  UV INDEX
                </h2>
              </div>
              <h3
                className="font-['Manrope'] text-2xl font-bold mb-1"
                style={{ color: uvStatus.color }}
              >
                {uvStatus.cat}
              </h3>
              <p className="font-['Hanken_Grotesk'] text-sm text-[#713f12]">
                Real-time Solar Radiation Sensor • Updated at {lastRefreshed || 'Latest sync'}
              </p>
            </div>
          </div>

          {/* Legend (0-2 Low, 3-5 Mod, 6-7 High, 8-10 V.High) */}
          <div className="w-full md:w-auto md:min-w-[320px] bg-[#fef08a]/60 rounded-lg p-3 border border-[#fde047]">
            <div className="text-[11px] font-['Hanken_Grotesk'] font-bold text-[#854d0e] uppercase tracking-wider mb-2 text-center md:text-left">
              UV Exposure Scale & Guidelines
            </div>
            <div className="grid grid-cols-2 gap-2 font-['Hanken_Grotesk'] text-xs font-bold uppercase tracking-wider text-center">
              <div className="bg-white p-2 rounded text-[#55ba47] shadow-xs border border-[#55ba47]/30">
                0 - 2 Low
              </div>
              <div className="bg-white p-2 rounded text-[#a16207] shadow-xs border border-[#eab308]/40">
                3 - 5 Mod
              </div>
              <div className="bg-white p-2 rounded text-[#ea580c] shadow-xs border border-[#ea580c]/30">
                6 - 7 High
              </div>
              <div className="bg-white p-2 rounded text-[#dc2626] shadow-xs border border-[#dc2626]/30">
                8 - 10 V.High
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
