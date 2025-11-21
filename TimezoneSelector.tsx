
import React, { useState, useEffect } from 'react';
import { BauhausClock } from './BauhausClock';
import { MapPin } from 'lucide-react';

const cities = [
  { name: 'San Francisco', timezone: 'America/Los_Angeles' },
  { name: 'New York', timezone: 'America/New_York' },
  { name: 'London', timezone: 'Europe/London' },
  { name: 'Paris', timezone: 'Europe/Paris' },
  { name: 'Dubai', timezone: 'Asia/Dubai' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo' },
  { name: 'Sydney', timezone: 'Australia/Sydney' },
];

export const TimezoneSelector: React.FC = () => {
  const [selectedCityIndex, setSelectedCityIndex] = useState(1); // Default New York
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      // Create a date object adjusted for the selected city's timezone
      const city = cities[selectedCityIndex];
      const now = new Date();
      const timeString = now.toLocaleString("en-US", { timeZone: city.timezone });
      setCurrentTime(new Date(timeString));
    }, 1000);
    
    // Initial set
    const city = cities[selectedCityIndex];
    const now = new Date();
    const timeString = now.toLocaleString("en-US", { timeZone: city.timezone });
    setCurrentTime(new Date(timeString));

    return () => clearInterval(timer);
  }, [selectedCityIndex]);

  return (
    <div className="w-full bg-white rounded-[40px] p-10 md:p-16 shadow-sm overflow-hidden relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            <div className="space-y-6 flex-1 z-10">
                <div>
                    <h3 className="text-3xl font-semibold tracking-tight mb-2">Global time, locally rendered.</h3>
                    <p className="text-gray-500">Select a city to instantly transport the clock face.</p>
                </div>

                <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                        {cities.map((city, idx) => (
                            <button
                                key={city.name}
                                onClick={() => setSelectedCityIndex(idx)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                                    selectedCityIndex === idx 
                                    ? 'bg-black text-white shadow-lg scale-105' 
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                }`}
                            >
                                {city.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-blue-600 animate-fade-in">
                    <MapPin size={16} />
                    <span>{cities[selectedCityIndex].timezone}</span>
                </div>
            </div>

            <div className="relative flex-1 flex justify-center">
                {/* Decorative background ring */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-transparent rounded-full scale-150 opacity-50 pointer-events-none blur-3xl"></div>
                
                <div className="relative transition-all duration-500 ease-out-back transform" key={selectedCityIndex}>
                    <div className="bg-white p-6 rounded-[2rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] ring-1 ring-black/5">
                        <BauhausClock 
                            size={280} 
                            time={currentTime} 
                            tickRate="quartz" 
                        />
                    </div>
                    
                    {/* Floating time label */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-white/20 shadow-sm px-4 py-1 rounded-full text-xs font-mono text-gray-500">
                        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </div>

        </div>
    </div>
  );
};
