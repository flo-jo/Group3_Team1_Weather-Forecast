export type TabType = 'dashboard' | 'alerts';

export interface WeatherCondition {
  tempMin: number;
  tempMax: number;
  condition: string;
  icon: string;
  windDirection: string;
  windSpeed: string;
  humidityMin: number;
  humidityMax: number;
  summary: string;
}

export interface DayForecast {
  day: string;
  date: string;
  condition: string;
  icon: string;
  tempMin: number;
  tempMax: number;
  rainChance: number;
}

export interface AdvisoryItem {
  id: string;
  category: 'HEAVY RAIN' | 'EARTHQUAKE' | 'VOLCANIC' | 'HAZE' | 'TROPICAL CYCLONE' | 'UV ALERT' | 'FLOOD';
  status: string;
  level: 'green' | 'yellow' | 'red';
  details: string;
  issuedTime: string;
  regions?: string[];
}

export interface UVData {
  index: number;
  category: 'Low' | 'Moderate' | 'High' | 'Very High' | 'Extreme';
  color: string;
  updatedAt: string;
  hourly: { time: string; index: number }[];
  recommendations: string[];
}

export interface ExploreTopic {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  tags: string[];
  keyStats: { label: string; value: string }[];
  details: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  richCard?: {
    location: string;
    condition: string;
    temperature: string;
    subtext: string;
    clearTime: string;
    icon: string;
    humidity?: string;
    wind?: string;
  };
}

export interface TownWeather {
  name: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  condition: string;
  temp: number;
  humidity: number;
  rainfall: number;
  icon: string;
  coordinates: { x: number; y: number }; // percentage on map
}
