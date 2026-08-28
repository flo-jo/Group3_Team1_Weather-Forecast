import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { AlertsView } from './components/AlertsView';
import { ForecastModal } from './components/ForecastModal';
import { RadarModal } from './components/RadarModal';
import { ExploreModal } from './components/ExploreModal';
import { SearchModal } from './components/SearchModal';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { DisqusComments } from './components/DisqusComments';
import { TabType, ExploreTopic, TownWeather } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [isForecastOpen, setIsForecastOpen] = useState(false);
  const [isRadarOpen, setIsRadarOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<ExploreTopic | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleSelectTown = (town: TownWeather) => {
    console.log('Selected town:', town.name);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] flex flex-col font-['Hanken_Grotesk'] selection:bg-[#b7f568] selection:text-[#102000]">
      {/* Top App Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-8">
        {activeTab === 'dashboard' && (
          <DashboardView
            onCheckForecast={() => setIsForecastOpen(true)}
            onViewMoreRadar={() => setIsRadarOpen(true)}
            onOpenTopic={(topic) => setSelectedTopic(topic)}
            onSelectTown={handleSelectTown}
          />
        )}

        {activeTab === 'alerts' && <AlertsView />}

        {/* Community Disqus Discussion Thread */}
        <DisqusComments
          identifier={`singapore-weather-${activeTab}`}
          title={`Singapore Weather - ${activeTab === 'dashboard' ? 'Dashboard' : 'Warnings & Advisories'}`}
        />
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Modals & Drawers */}
      <ForecastModal
        isOpen={isForecastOpen}
        onClose={() => setIsForecastOpen(false)}
      />

      <RadarModal
        isOpen={isRadarOpen}
        onClose={() => setIsRadarOpen(false)}
      />

      <ExploreModal
        topic={selectedTopic}
        onClose={() => setSelectedTopic(null)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTown={(town) => {
          handleSelectTown(town);
          setIsForecastOpen(true);
        }}
        onSelectTopic={(topic) => setSelectedTopic(topic)}
      />

      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateToTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}

export default App;
