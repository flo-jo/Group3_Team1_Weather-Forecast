import { WeatherCondition, DayForecast, AdvisoryItem, UVData, ExploreTopic, TownWeather } from '../types';

export const initial24HourWeather: WeatherCondition = {
  tempMin: 26,
  tempMax: 34,
  condition: 'Partly Cloudy',
  icon: 'partly_cloudy_day',
  windDirection: 'SSE',
  windSpeed: '15 - 25 km/h',
  humidityMin: 60,
  humidityMax: 90,
  summary: 'Partly cloudy conditions expected throughout the morning and early afternoon, with brief localized showers over southern and western areas.',
};

export const fourDayOutlook: DayForecast[] = [
  {
    day: 'SAT',
    date: '30 Aug',
    condition: 'Partly cloudy',
    icon: 'partly_cloudy_day',
    tempMin: 26,
    tempMax: 34,
    rainChance: 20,
  },
  {
    day: 'SUN',
    date: '31 Aug',
    condition: 'Afternoon showers',
    icon: 'thunderstorm',
    tempMin: 25,
    tempMax: 34,
    rainChance: 65,
  },
  {
    day: 'MON',
    date: '01 Sep',
    condition: 'Afternoon showers',
    icon: 'thunderstorm',
    tempMin: 25,
    tempMax: 34,
    rainChance: 70,
  },
  {
    day: 'TUE',
    date: '02 Sep',
    condition: 'Afternoon showers',
    icon: 'thunderstorm',
    tempMin: 25,
    tempMax: 34,
    rainChance: 60,
  },
];

export const initialAdvisories: AdvisoryItem[] = [
  {
    id: 'heavy-rain',
    category: 'HEAVY RAIN',
    status: 'No warning in force.',
    level: 'green',
    details: 'Current radar shows low to moderate convective cloud activity over the Malacca Straits. No heavy rain alert issued.',
    issuedTime: 'Today at 08:30 AM',
  },
  {
    id: 'earthquake',
    category: 'EARTHQUAKE',
    status: 'No warning in force.',
    level: 'green',
    details: 'Seismic activity monitoring across the Sunda Plate and Sumatra fault line is normal. No tremors reported in Singapore.',
    issuedTime: 'Today at 09:00 AM',
  },
  {
    id: 'volcanic',
    category: 'VOLCANIC',
    status: 'No warning in force.',
    level: 'green',
    details: 'Regional volcano ash plumes (Merapi, Anak Krakatau, Lewotobi) are moving away from the Singapore Flight Information Region.',
    issuedTime: 'Today at 07:45 AM',
  },
  {
    id: 'haze',
    category: 'HAZE',
    status: 'No warning in force.',
    level: 'green',
    details: '1-hr PM2.5 concentrations remain in the Normal band (10 - 22 µg/m³). Overall 24-hr PSI is in the Good range (35 - 48).',
    issuedTime: 'Today at 09:15 AM',
  },
  {
    id: 'tropical-cyclone',
    category: 'TROPICAL CYCLONE',
    status: 'No warning in force.',
    level: 'green',
    details: 'No tropical cyclones or severe depressions detected in the South China Sea or Andaman Sea affecting the region.',
    issuedTime: 'Today at 06:00 AM',
  },
];

export const initialUVData: UVData = {
  index: 1,
  category: 'Low',
  color: '#55ba47',
  updatedAt: '9:30am on 28 Aug',
  hourly: [
    { time: '08:00', index: 0 },
    { time: '09:30', index: 1 },
    { time: '11:00', index: 4 },
    { time: '12:30', index: 7 },
    { time: '14:00', index: 8 },
    { time: '15:30', index: 5 },
    { time: '17:00', index: 2 },
    { time: '18:30', index: 0 },
  ],
  recommendations: [
    'Minimal sun protection required for general outdoor activities.',
    'UV index expected to peak between 12:00 PM and 2:30 PM (reaching High / Very High levels).',
    'Wear sunscreen (SPF 30+) and sunglasses if remaining outdoors past midday.',
  ],
};

export const exploreTopics: ExploreTopic[] = [
  {
    id: 'world-forecasts',
    title: 'World Forecasts',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1VuHHY0X9yZtSLPvx70-ZB4t4xdBzMoUJlEHTfVUcbicLhDetEaH9t6bseLRWybn2b1XB3skhnbt344dDOluQkjuLn9DKtcRDHenPAkNv1jKrm2gaufm0sWcGrZ5TwAT04T3HUCp9h2xBnDoG01oaa7Fn3uG8vokOU2K91_KMEa_GStt4GkN8FsQtDILw8t1clxjIBSaEnUzHGgphsWNE9sNrv62nPFUaS1bbN2QFMVCHEpFfh6f2g4KxQ',
    description: 'International meteorological data and 5-day weather forecasts across major global cities, flight hubs, and travel corridors.',
    tags: ['Global', 'Aviation', 'Travel'],
    keyStats: [
      { label: 'Cities Tracked', value: '180+' },
      { label: 'Update Frequency', value: 'Hourly' },
      { label: 'Global Models', value: 'ECMWF / GFS' },
    ],
    details: [
      'Comprehensive forecasts for ASEAN capitals: Kuala Lumpur (31°C Showers), Jakarta (33°C Sunny), Bangkok (34°C Cloudy), Tokyo (24°C Clear), London (19°C Light Rain).',
      'Flight weather summaries for Changi Airport intercontinental departures.',
      'Global climate anomalies and El Niño-Southern Oscillation (ENSO) status.',
    ],
  },
  {
    id: 'regional-earthquake',
    title: 'Regional Earthquake/Tsunami',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1XY6SElcaQdIYahWNEh6cfdZx0ldwecfoEg7cthfLUFbO-K3a_dteizP3wzpcla8_9G2bkcu3JuQdiIezYsvUfsXa5Up4QaOfenmdebcTNA_LXaX0lsEDuD_tB3OYii65mU6i5_0ch6r1pro_i5CyxH-DL6jXHLFl_R-dIThssIQRmkQy4JtfzqOmBOLOOSncFZL6AeTYSriTHWkKaraiOcC1NcHF5FA1vCweuaUaYkC68ngx0V_aqMlQ',
    description: '24/7 seismic surveillance network monitoring real-time seismic waves, fault activities, and tsunami buoy networks in the Indian Ocean & Pacific Rim.',
    tags: ['Seismology', 'Tsunami Watch', 'Early Warning'],
    keyStats: [
      { label: 'Seismic Sensors', value: '8 National' },
      { label: 'Detection Speed', value: '< 2 mins' },
      { label: 'Tsunami Risk', value: 'None' },
    ],
    details: [
      'Real-time data feeds from the Singapore National Seismic Network and ASEAN regional seismological centres.',
      'Automated bulletin generation for any tremor of magnitude M5.0+ within 2,500km of Singapore.',
      'Public guidance and emergency structural safety protocols for high-rise occupants.',
    ],
  },
  {
    id: 'regional-haze',
    title: 'Regional Haze Situation',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1WRrkGd5NH5_E5ndIW5BWy0wcNBBftpNI8fzaC2YBF_7eUMvpTI75mf_34GB_71jFxaAnws74RUJUoL4duCb3NDma1_GdnhHWS8e8aZt7dwYhmacpDJxKG9WHw2oPVMghjbVUJVHwyqudTHqMcniqM7WtgX5mob5uqVwtm3o90AaUVrDXyufr5-srEy04op7qzOhbVXydV9TjgA_mfwb7hhqX3EDC-GXIifOFGjGETWKT_3eiABD6sFTi8',
    description: 'Monitoring of transboundary smoke haze, hotspot counts across Sumatra and Kalimantan, 24-hr PSI and 1-hr PM2.5 readings across Singapore.',
    tags: ['Air Quality', 'PM2.5', 'Hotspots'],
    keyStats: [
      { label: 'Overall PSI', value: '42 (Good)' },
      { label: 'Sumatra Hotspots', value: '14' },
      { label: 'Wind Dispersion', value: 'Favourable' },
    ],
    details: [
      'Hourly 1-hr PM2.5 readings: North (14 µg/m³), South (18 µg/m³), East (12 µg/m³), West (16 µg/m³), Central (15 µg/m³).',
      'Satellite detection of thermal hotspots using Himawari-9 infrared channels.',
      'Health advisories for vulnerable groups, pregnant women, the elderly, and outdoor sports enthusiasts.',
    ],
  },
  {
    id: 'volcanic-eruptions',
    title: 'Regional Volcanic Eruptions',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UWRcJGcnwwAPW4iZTa0CgR9xUN2nhZYy--ZdYHE08SXptixeN-bnDi-z9A3zOhdWZ7OOWN0oYYBMEwYG1L30HRIY-tPOKcFhJhXDTftpNF8q35Sf4JM43o5L95LgfjRqnJVSK6Kxo8zjN3iM8nshHVqCQzZ38SKT_1f-Fhi1a6pht-WW4rzeSMS8oDEzBDt11ket2hwk91Pdz1oQZh6tvHMXW3bJjePoKpt2vKNNAyjEewSyRTHI8gveE',
    description: 'Aviation Volcanic Ash Advisory Centre (VAAC) collaboration and dispersion modeling for major active volcanoes in Indonesia and the Philippines.',
    tags: ['Volcanology', 'Ash Plume', 'Aviation Safety'],
    keyStats: [
      { label: 'Active Volcanoes', value: '6 Monitored' },
      { label: 'Ash Threat Level', value: 'Normal / Nil' },
      { label: 'VAAC Region', value: 'Darwin / Tokyo' },
    ],
    details: [
      'Continuous tracking of Mount Merapi, Mount Sinabung, Mount Semeru, and Krakatau.',
      'Wind vector trajectory simulations at flight levels FL100, FL250, and FL450.',
      'Ensuring clear air corridors for Singapore airspace.',
    ],
  },
  {
    id: 'tropical-cyclone',
    title: 'Tropical Cyclone Information',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1W5zezt5ZWYLVT9Akx2-eDB-A8aOlm351rjGcDM86wkbn6FUeADT8uTdk1UOryN_8LmE6oag7WYv5sU6vmecsgTheMVIA4fDCoVLWV58rA3UQieVuyCJrr64j5bMwEzoHx0Nh0EAJKOTLTYP9gvGcLaxnivh1k70P1n2dpjL2fYDkK8D5irG2bcoVZl5wg7mPnXJLeaTn8fLRswV3UfZEQteua0-vng0uPCXXtikN5MMAusqAKlOcTuaXA',
    description: 'Tracking tropical storms, typhoons, and monsoon surges across the Western North Pacific and South China Sea basins.',
    tags: ['Typhoon', 'Monsoon Surge', 'Marine Safety'],
    keyStats: [
      { label: 'Active Depressions', value: '0' },
      { label: 'Monsoon Status', value: 'Southwest Monsoon' },
      { label: 'Sea Swell Height', value: '0.5 - 1.0 m' },
    ],
    details: [
      'Real-time storm tracking charts with cone of uncertainty and central atmospheric pressure readings.',
      'Impact assessments on Singapore coastal swell, maritime channels, and anchorages.',
      'Sumatra squall early warning predictions.',
    ],
  },
  {
    id: 'satellite-images',
    title: 'Satellite Images',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UvRuMP4dWCf2mmIqZvgyKCSG3VCt6jKmKnHN6MiS5ecGcCkrkKnYhaVC-9XrbMNyN3tUjx0na6lIZhL915hc2gc7qDqMkZ-8-eYvSmOruNZAQbWKazCixl0kVONwhDUVpDb3sYmZMmyTC59FCSSXxM5t2w3iSoMQMOG4E9ONkbjAOhspgMUXoLG4kiyiBrIAvIhMq5X7uY_gogpF9RKAoMZxOH4j6I6XJxJVbkIgV_9A6LunuxsNy4zE4',
    description: 'High-resolution geostationary meteorological satellite imagery from Himawari-9 with visible, infrared, and water vapor multispectral channels.',
    tags: ['Himawari-9', 'Infrared', 'Cloud Tops'],
    keyStats: [
      { label: 'Refresh Rate', value: 'Every 10 mins' },
      { label: 'Spatial Resolution', value: '500m / pixel' },
      { label: 'Spectral Bands', value: '16 Channels' },
    ],
    details: [
      'Enhanced infrared imagery highlighting deep convective thunderstorm cloud tops.',
      'Animated 12-hour cloud motion loop over the Equator and Malacca Strait.',
      'Surface moisture analysis and atmospheric instability mapping.',
    ],
  },
  {
    id: 'tide-timings',
    title: 'Tide Timings',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1VeEvRLIFJRxZQ9jPiARgzhLkqY6VB4sGctmBGqqeG8e0RmuPu3LDkyzKjGRozwtKfUwskVJbxZATcclXViCrny9bKnohAb42FyUU0het-aLCT27OlhK2QeUnK-k5dJoP9Q9EUNjRq5hjad35GUh-m-ux84r1kwIcG7LCIHE-BFFV02aSmuaLNNg6saGPFU6brJ0Lg7CIGZ6sE_zdw4cHqHvx2Sl_FiDXSMwT-FjCFvOhBn4h6XFjNLINM',
    description: 'Hydrographic and tidal forecasts for Singapore waters (Tanjong Pagar, Sembawang, Jurong Island, Sultan Shoal, Raffles Lighthouse).',
    tags: ['Marine', 'High Tide', 'Low Tide'],
    keyStats: [
      { label: 'Next High Tide', value: '14:45 (2.8m)' },
      { label: 'Next Low Tide', value: '20:10 (0.7m)' },
      { label: 'Tidal Range', value: '2.1m (Moderate)' },
    ],
    details: [
      'Astronomical tide tables and live tide gauge sensor feeds.',
      'Coastal flood risk analysis in combination with heavy rainfall.',
      'Recreational boating, angling, and commercial shipping draft clearances.',
    ],
  },
  {
    id: 'weather-portal',
    title: 'Weather Portal',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1WEwAlA_Ew0gxdnWxwNor3O-Qqv4aXc9xg45oLTOnL4Do1PAZY3JIfBurdCWcFdo3NsUMA3TNAmOwP33XuHtkt-E8RFzHuXKB0cPeDqgzKvJuQqtPG45KTgYIaBbKwhhYF3L4dp9z6g3vQ517K8jIjNQV2ULCjoGuoh-m6u7T228LSqRowhsgonobEEw9Ibu1zupfkbaPTIC6Xya44Qd2HPs55mB0gBV1hxKW4XrC1QB4ifo3TNY9jjBw',
    description: 'Meteorological Service Singapore (MSS) specialized research portal, historical climate records, API datasets, and meteorological archives.',
    tags: ['MSS Portal', 'Climate Research', 'Open Data'],
    keyStats: [
      { label: 'Weather Stations', value: '65+ Automated' },
      { label: 'Historical Archives', value: 'Since 1869' },
      { label: 'Open Data APIs', value: 'data.gov.sg' },
    ],
    details: [
      'Access to automated weather station feeds for rainfall, temperature, relative humidity, and wind speed.',
      'Long-term climate change reports for Singapore and Southeast Asia.',
      'Developer API endpoints and geo-spatial radar GIS data feeds.',
    ],
  },
];

export const singaporeTowns: TownWeather[] = [
  { name: 'Orchard', region: 'Central', condition: 'Light Rain', temp: 27, humidity: 88, rainfall: 4.2, icon: 'rainy', coordinates: { x: 50, y: 55 } },
  { name: 'Marina Bay', region: 'Central', condition: 'Partly Cloudy', temp: 29, humidity: 78, rainfall: 0, icon: 'partly_cloudy_day', coordinates: { x: 55, y: 65 } },
  { name: 'Jurong East', region: 'West', condition: 'Passing Showers', temp: 28, humidity: 82, rainfall: 2.1, icon: 'rainy', coordinates: { x: 25, y: 52 } },
  { name: 'Tuas', region: 'West', condition: 'Cloudy', temp: 30, humidity: 75, rainfall: 0, icon: 'cloud', coordinates: { x: 12, y: 65 } },
  { name: 'Woodlands', region: 'North', condition: 'Partly Cloudy', temp: 31, humidity: 72, rainfall: 0, icon: 'partly_cloudy_day', coordinates: { x: 42, y: 22 } },
  { name: 'Yishun', region: 'North', condition: 'Fair', temp: 31, humidity: 70, rainfall: 0, icon: 'wb_sunny', coordinates: { x: 52, y: 28 } },
  { name: 'Ang Mo Kio', region: 'Central', condition: 'Partly Cloudy', temp: 30, humidity: 74, rainfall: 0, icon: 'partly_cloudy_day', coordinates: { x: 52, y: 44 } },
  { name: 'Bishan', region: 'Central', condition: 'Light Showers', temp: 28, humidity: 85, rainfall: 1.5, icon: 'rainy', coordinates: { x: 48, y: 48 } },
  { name: 'Tampines', region: 'East', condition: 'Fair', temp: 32, humidity: 68, rainfall: 0, icon: 'wb_sunny', coordinates: { x: 78, y: 45 } },
  { name: 'Changi', region: 'East', condition: 'Fair', temp: 31, humidity: 71, rainfall: 0, icon: 'wb_sunny', coordinates: { x: 88, y: 48 } },
  { name: 'Bedok', region: 'East', condition: 'Partly Cloudy', temp: 30, humidity: 73, rainfall: 0, icon: 'partly_cloudy_day', coordinates: { x: 72, y: 56 } },
  { name: 'Clementi', region: 'West', condition: 'Light Rain', temp: 27, humidity: 86, rainfall: 3.8, icon: 'rainy', coordinates: { x: 33, y: 58 } },
  { name: 'Sentosa', region: 'South', condition: 'Partly Cloudy', temp: 29, humidity: 79, rainfall: 0, icon: 'partly_cloudy_day', coordinates: { x: 48, y: 78 } },
  { name: 'Novena', region: 'Central', condition: 'Light Rain', temp: 28, humidity: 84, rainfall: 2.0, icon: 'rainy', coordinates: { x: 48, y: 50 } },
];
