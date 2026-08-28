import React from 'react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab: (tab: 'dashboard' | 'alerts') => void;
}

const mockNotifications = [
  {
    id: 'n-1',
    title: 'Afternoon Rain Advisory',
    description: 'Passing light to moderate showers expected across Central and Southern Singapore between 2:00 PM and 4:30 PM.',
    time: '15 mins ago',
    type: 'weather',
    unread: true,
  },
  {
    id: 'n-2',
    title: 'Midday UV Index Alert',
    description: 'UV Index expected to peak at 7-8 (Very High) around 1:00 PM. Sun protection advised.',
    time: '1 hour ago',
    type: 'uv',
    unread: true,
  },
  {
    id: 'n-3',
    title: 'Air Quality Update',
    description: '24-hr PSI is 38 (Good), 1-hr PM2.5 within normal range across all five monitoring sectors.',
    time: '3 hours ago',
    type: 'haze',
    unread: false,
  },
  {
    id: 'n-4',
    title: 'Regional Seismic Monitoring',
    description: 'No significant earthquake activity detected within the ASEAN regional perimeter.',
    time: '5 hours ago',
    type: 'earthquake',
    unread: false,
  },
];

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onNavigateToTab,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-[#c1c7cf] animate-slideInRight">
        {/* Header */}
        <div className="p-5 bg-[#00334e] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-2xl text-[#b7f568]">
              notifications_active
            </span>
            <h2 className="font-['Manrope'] text-lg font-bold">NEA Advisory Notifications</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-white/10"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* List */}
        <div className="p-4 overflow-y-auto space-y-3.5 flex-1 bg-[#f8f9fa]">
          {mockNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 md:p-5 rounded-xl border transition-all ${
                notif.unread
                  ? 'bg-white border-[#85b9e5] shadow-sm'
                  : 'bg-[#f3f4f5] border-[#e1e3e4] opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-['Manrope'] font-extrabold text-base text-[#00334e]">
                  {notif.title}
                </span>
                {notif.unread && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e63946]"></span>
                )}
              </div>
              <p className="font-['Hanken_Grotesk'] text-sm text-[#41474e] leading-relaxed font-medium">
                {notif.description}
              </p>
              <div className="mt-2.5 text-xs text-[#71787f] font-mono font-medium">
                {notif.time}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#e1e3e4] flex gap-3">
          <button
            onClick={() => {
              onNavigateToTab('alerts');
              onClose();
            }}
            className="flex-1 py-3 rounded-xl bg-[#004a70] text-white text-sm font-extrabold uppercase tracking-wider hover:bg-[#00334e] transition-colors"
          >
            Manage Alert Settings
          </button>
        </div>
      </div>
    </div>
  );
};
