import React, { useState } from 'react';
import { singaporeTowns, exploreTopics, initialAdvisories } from '../data/mockData';
import { TownWeather, ExploreTopic } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTown: (town: TownWeather) => void;
  onSelectTopic: (topic: ExploreTopic) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTown,
  onSelectTopic,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredTowns = singaporeTowns.filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredTopics = exploreTopics.filter((tp) =>
    tp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tp.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border border-[#c1c7cf] flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#e1e3e4] flex items-center gap-3 bg-[#f8f9fa]">
          <span className="material-symbols-outlined text-2xl text-[#004a70]">search</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search town (e.g. Orchard, Jurong, Changi), topic, or weather advisory..."
            autoFocus
            className="w-full bg-transparent border-none focus:outline-none font-['Hanken_Grotesk'] text-lg text-[#191c1d] placeholder:text-[#71787f]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs text-[#71787f] hover:text-black font-bold p-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="text-[#71787f] hover:text-black p-1 rounded-full"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Results Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">

          {/* Towns / Weather Stations */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#71787f] mb-2.5">
              Singapore Weather Stations & Neighborhoods
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredTowns.slice(0, 6).map((town) => (
                <div
                  key={town.name}
                  onClick={() => {
                    onSelectTown(town);
                    onClose();
                  }}
                  className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e1e3e4] flex items-center justify-between hover:border-[#004a70] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-xl text-[#004a70]">
                      {town.icon}
                    </span>
                    <div>
                      <div className="font-['Manrope'] font-bold text-sm text-[#191c1d]">
                        {town.name}
                      </div>
                      <div className="text-xs text-[#71787f]">{town.region} • {town.condition}</div>
                    </div>
                  </div>
                  <div className="font-['Manrope'] font-bold text-sm text-[#004a70]">
                    {town.temp}°C
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explore Topics */}
          {filteredTopics.length > 0 && (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#71787f] mb-2.5">
                Meteorological Topics & Portals
              </div>
              <div className="space-y-2">
                {filteredTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => {
                      onSelectTopic(topic);
                      onClose();
                    }}
                    className="p-3 bg-[#f8f9fa] rounded-xl border border-[#e1e3e4] flex items-center gap-3 hover:border-[#004a70] transition-colors cursor-pointer"
                  >
                    <img
                      src={topic.imageUrl}
                      alt={topic.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="font-['Manrope'] font-bold text-sm text-[#00334e]">
                        {topic.title}
                      </div>
                      <div className="text-xs text-[#71787f] line-clamp-1">{topic.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
