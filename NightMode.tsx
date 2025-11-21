import React from 'react';
import { ColorPillProps } from '../types';

const colors: ColorPillProps[] = [
  { name: "Red", color: "red-500", hex: "#FF3B30" },
  { name: "Amber", color: "amber-500", hex: "#FF9500" },
  { name: "Lavender", color: "purple-400", hex: "#AF52DE" },
  { name: "Rose", color: "pink-400", hex: "#FF2D55" },
  { name: "Seafoam", color: "teal-300", hex: "#30D158" },
  { name: "Sky", color: "sky-400", hex: "#007AFF" },
  { name: "Swiss BGW9", color: "blue-200", hex: "#5AC8FA" },
  { name: "Peach", color: "orange-300", hex: "#FFCC00" },
  { name: "Tritium Green", color: "green-400", hex: "#34C759" },
  { name: "Aqua", color: "cyan-400", hex: "#32ADE6" },
  { name: "Yellow", color: "yellow-400", hex: "#FFD60A" },
  { name: "Lime", color: "lime-400", hex: "#A4C400" },
  { name: "Ice Blue", color: "cyan-200", hex: "#66D4CF" },
];

export const NightMode: React.FC = () => {
  return (
    <div className="w-full bg-black rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
          Night Mode. <br />
          <span className="text-gray-400">Thoughtfully Illuminated.</span>
        </h2>
        <p className="text-gray-400 mb-16 text-lg">
          Selected luminescent colors that glow beautifully in your space.
        </p>

        <div className="flex justify-center items-end gap-2 md:gap-4 h-64">
          {colors.map((c, i) => (
            <div key={c.name} className="group flex flex-col items-center gap-4 cursor-pointer">
              <div 
                className="w-6 md:w-12 rounded-full transition-all duration-500 ease-out hover:scale-110 hover:-translate-y-4"
                style={{ 
                    height: `${140 + Math.sin(i) * 40}px`,
                    backgroundColor: c.hex,
                    boxShadow: `0 0 30px ${c.hex}40`
                }}
              >
              </div>
              <span className="text-[10px] font-medium text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 whitespace-nowrap">
                {c.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Label row for default view (simplified) */}
        <div className="flex justify-center gap-2 md:gap-4 mt-6 border-t border-white/10 pt-4">
           {colors.filter((_, i) => i % 3 === 0).map((c) => (
               <span key={c.name} className="text-[10px] text-gray-600 hidden md:inline-block">{c.name}</span>
           ))}
        </div>
      </div>
    </div>
  );
};