// Real-time API Client for Singapore Open Data (data.gov.sg v2)
// Free, public, keyless live endpoints for meteorological data

export interface LiveWeatherData {
  lastUpdated: string;
  isLive: boolean;
  twoHourForecasts: { area: string; forecast: string }[];
  twentyFourHourForecast?: {
    generalForecast: string;
    lowTemp: number;
    highTemp: number;
    lowHumidity: number;
    highHumidity: number;
    periods?: {
      timePeriod: string;
      west: string;
      east: string;
      central: string;
      south: string;
      north: string;
    }[];
  };
  fourDayOutlook: {
    day: string;
    date: string;
    condition: string;
    tempLow: number;
    tempHigh: number;
    icon: string;
  }[];
  readings: {
    airTemperature?: number; // Average or selected station in °C
    rainfall?: number; // Latest reading in mm
    psi?: number; // 24-hr PSI national/average
    pm25?: number; // 1-hr PM2.5 in ug/m3
    uvIndex?: number; // Current UV Index
    relativeHumidity?: number; // %
    windSpeed?: number; // knots or km/h
  };
  stationReadings?: {
    temperatures: { stationId: string; name: string; value: number }[];
    rainfall: { stationId: string; name: string; value: number }[];
  };
}

const BASE_URL = 'https://api-open.data.gov.sg/v2/real-time/api';

const fetchEndpoint = async (endpoint: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        'Accept': 'application/json',
      },
    });
    if (!res.ok) {
      console.warn(`[WeatherAPI] ${endpoint} returned status ${res.status}`);
      return null;
    }
    const json = await res.json();
    return json?.data || json;
  } catch (err) {
    console.warn(`[WeatherAPI] Failed fetching ${endpoint}:`, err);
    return null;
  }
};

export const fetchAllLiveWeatherData = async (): Promise<LiveWeatherData> => {
  const [
    twoHrData,
    twentyFourHrData,
    fourDayData,
    tempData,
    rainData,
    psiData,
    pm25Data,
    uvData,
    humidityData,
    windData,
  ] = await Promise.all([
    fetchEndpoint('two-hr-forecast'),
    fetchEndpoint('twenty-four-hr-forecast'),
    fetchEndpoint('four-day-outlook'),
    fetchEndpoint('air-temperature'),
    fetchEndpoint('rainfall'),
    fetchEndpoint('psi'),
    fetchEndpoint('pm25'),
    fetchEndpoint('uv'),
    fetchEndpoint('relative-humidity'),
    fetchEndpoint('wind-speed'),
  ]);

  // Process 2-hour forecasts
  const twoHourForecasts: { area: string; forecast: string }[] = [];
  if (twoHrData?.items?.[0]?.forecasts) {
    twoHrData.items[0].forecasts.forEach((f: any) => {
      twoHourForecasts.push({ area: f.area, forecast: f.forecast });
    });
  }

  // Process 24-hour forecast
  let twentyFourHourForecast: LiveWeatherData['twentyFourHourForecast'] | undefined;
  if (twentyFourHrData?.items?.[0]) {
    const item = twentyFourHrData.items[0];
    twentyFourHourForecast = {
      generalForecast: item.general?.forecast || 'Fair & Warm',
      lowTemp: item.general?.temperature?.low || 25,
      highTemp: item.general?.temperature?.high || 33,
      lowHumidity: item.general?.relative_humidity?.low || 60,
      highHumidity: item.general?.relative_humidity?.high || 90,
      periods: item.periods?.map((p: any) => ({
        timePeriod: `${p.time?.start ? new Date(p.time.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''} - ${p.time?.end ? new Date(p.time.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}`,
        west: p.regions?.west || 'Partly Cloudy',
        east: p.regions?.east || 'Partly Cloudy',
        central: p.regions?.central || 'Partly Cloudy',
        south: p.regions?.south || 'Partly Cloudy',
        north: p.regions?.north || 'Partly Cloudy',
      })),
    };
  }

  // Process 4-day outlook
  const fourDayOutlookList: LiveWeatherData['fourDayOutlook'] = [];
  if (fourDayData?.items?.[0]?.forecasts) {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    fourDayData.items[0].forecasts.forEach((f: any) => {
      const forecastDate = new Date(f.date);
      const dayName = dayNames[forecastDate.getDay()] || f.day || 'Day';
      const cond = f.forecast || 'Partly Cloudy';
      let icon = 'partly_cloudy_day';
      const condLower = cond.toLowerCase();
      if (condLower.includes('thunder') || condLower.includes('heavy')) icon = 'thunderstorm';
      else if (condLower.includes('rain') || condLower.includes('shower')) icon = 'rainy';
      else if (condLower.includes('fair') || condLower.includes('sunny')) icon = 'wb_sunny';
      else if (condLower.includes('cloud')) icon = 'cloud';

      fourDayOutlookList.push({
        day: dayName,
        date: f.date,
        condition: cond,
        tempLow: f.temperature?.low || 25,
        tempHigh: f.temperature?.high || 33,
        icon,
      });
    });
  }

  // Helper to extract average or latest reading from station items
  const getAverageReading = (dataObj: any): number | undefined => {
    if (!dataObj?.items?.[0]?.readings) return undefined;
    const readings = dataObj.items[0].readings;
    if (!Array.isArray(readings) || readings.length === 0) return undefined;
    const valid = readings.map((r: any) => Number(r.value)).filter((v: number) => !isNaN(v));
    if (valid.length === 0) return undefined;
    const sum = valid.reduce((acc: number, curr: number) => acc + curr, 0);
    return Math.round((sum / valid.length) * 10) / 10;
  };

  // Helper for rainfall max/average
  const getRainfallReading = (dataObj: any): number | undefined => {
    if (!dataObj?.items?.[0]?.readings) return undefined;
    const readings = dataObj.items[0].readings;
    if (!Array.isArray(readings) || readings.length === 0) return undefined;
    const valid = readings.map((r: any) => Number(r.value)).filter((v: number) => !isNaN(v));
    if (valid.length === 0) return undefined;
    const max = Math.max(...valid);
    return Math.round(max * 10) / 10;
  };

  // Extract UV Index (UV data has index records with value)
  let liveUV: number | undefined;
  if (uvData?.items?.[0]?.index) {
    const uvRecords = uvData.items[0].index;
    if (Array.isArray(uvRecords) && uvRecords.length > 0) {
      liveUV = uvRecords[uvRecords.length - 1]?.value;
    }
  }

  // Extract PSI (e.g. 24-hr PSI national or central)
  let livePSI: number | undefined;
  if (psiData?.items?.[0]?.readings?.psi_twenty_four_hourly) {
    const psiObj = psiData.items[0].readings.psi_twenty_four_hourly;
    livePSI = psiObj.national || psiObj.central || psiObj.south || 45;
  }

  // Extract PM2.5 (1-hr PM2.5 national or regional avg)
  let livePM25: number | undefined;
  if (pm25Data?.items?.[0]?.readings?.pm25_one_hourly) {
    const pmObj = pm25Data.items[0].readings.pm25_one_hourly;
    livePM25 = pmObj.national || pmObj.central || 12;
  }

  const liveTemp = getAverageReading(tempData);
  const liveRain = getRainfallReading(rainData);
  const liveHumidity = getAverageReading(humidityData);
  const liveWind = getAverageReading(windData);

  return {
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    isLive: true,
    twoHourForecasts,
    twentyFourHourForecast,
    fourDayOutlook: fourDayOutlookList,
    readings: {
      airTemperature: liveTemp,
      rainfall: liveRain,
      psi: livePSI,
      pm25: livePM25,
      uvIndex: liveUV,
      relativeHumidity: liveHumidity,
      windSpeed: liveWind ? Math.round(liveWind * 1.852) : undefined, // Convert knots to km/h if applicable
    },
  };
};
