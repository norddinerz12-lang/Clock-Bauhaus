
import React, { useState, useRef } from 'react';
import { BauhausClock } from './components/BauhausClock';
import { NightMode } from './components/NightMode';
import { TimezoneSelector } from './components/TimezoneSelector';
import { Check, Globe } from 'lucide-react';

function App() {
  const [activeTheme, setActiveTheme] = useState(1); // 0: light, 1: dark, 2: auto
  
  // Settings Card Interaction
  const [settingsTilt, setSettingsTilt] = useState({ x: 0, y: 0 });
  const settingsCardRef = useRef<HTMLDivElement>(null);
  const [sliderValue, setSliderValue] = useState(65);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Language Card State
  const [languageFlipped, setLanguageFlipped] = useState(false);
  const [greeting, setGreeting] = useState("Hi!");

  const languages = [
    { name: "English", greeting: "Hi!", code: "EN" },
    { name: "Français", greeting: "Salut!", code: "FR" },
    { name: "Deutsch", greeting: "Hallo!", code: "DE" },
    { name: "Español", greeting: "¡Hola!", code: "ES" },
    { name: "Italiano", greeting: "Ciao!", code: "IT" },
    { name: "日本語", greeting: "こんにちは", code: "JP" },
    { name: "简体中文", greeting: "你好", code: "CN" },
    { name: "Русский", greeting: "Привет", code: "RU" },
    { name: "Türkçe", greeting: "Merhaba", code: "TR" },
    { name: "العربية", greeting: "مرحباً", code: "AR" },
  ];

  const handleLanguageClick = (lang: typeof languages[0]) => {
    setGreeting(lang.greeting);
    setLanguageFlipped(true);
  };

  const handleSettingsMouseMove = (e: React.MouseEvent) => {
    if (!settingsCardRef.current) return;
    const rect = settingsCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Calculate tilt (max 15 degrees)
    const tiltX = (0.5 - y) * 15; 
    const tiltY = (x - 0.5) * 15; 

    setSettingsTilt({ x: tiltX, y: tiltY });
  };

  const handleSettingsMouseLeave = () => {
    setSettingsTilt({ x: 0, y: 0 });
  };

  const handleSliderClick = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderValue(percentage);
  };

  // Helper to animate words
  const renderAnimatedWords = (text: string, baseDelay: number = 0) => {
    return text.split(' ').map((word, i) => (
      <span 
        key={i} 
        className="inline-block opacity-0 animate-blur-in"
        style={{ animationDelay: `${baseDelay + i * 0.1}s`, marginRight: '0.28em' }}
      >
        {word}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] selection:bg-gray-900 selection:text-white pb-20 font-sans tracking-tight">
      {/* Sticky Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-200/50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-gray-900 flex items-center justify-center">
               <div className="w-0.5 h-2 bg-gray-900 absolute mb-2"></div>
               <div className="w-2 h-0.5 bg-gray-900 absolute ml-2"></div>
            </div>
            <span className="font-semibold tracking-tight">Bauhaus Clock</span>
          </div>
          <button className="bg-[#1D1D1F] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-black transition-colors shadow-lg shadow-gray-900/10">
            Buy now — $19
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 space-y-12 md:space-y-24 pt-16 md:pt-24">
        
        {/* Hero Section */}
        <section className="text-center space-y-12">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1]">
              <span className="block">
                {renderAnimatedWords("Your Mac deserves", 0)}
              </span>
              <span className="block">
                {renderAnimatedWords("elegance, even at rest.", 0.4)}
              </span>
            </h1>
            <p 
              className="text-xl text-gray-500 max-w-2xl mx-auto tracking-normal opacity-0 animate-blur-in" 
              style={{ animationDelay: '1s' }}
            >
              A Bauhaus-inspired clock screensaver for Mac, designed to be present even when you're not.
            </p>
          </div>

          {/* Hero Image Area */}
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[32px] overflow-hidden shadow-2xl opacity-0 animate-blur-in" style={{ animationDelay: '1.2s' }}>
             <img 
                src="https://picsum.photos/1920/1080?grayscale&blur=2" 
                alt="Workspace setup" 
                className="absolute inset-0 w-full h-full object-cover opacity-90"
             />
             {/* The "Screen" overlay */}
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-white w-[60%] aspect-[16/10] rounded-lg shadow-2xl flex items-center justify-center relative overflow-hidden border-8 border-black">
                     <BauhausClock size={300} className="scale-75 md:scale-100" />
                     {/* Reflection glint */}
                     <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                 </div>
             </div>
          </div>
          
          <div className="max-w-2xl mx-auto text-center opacity-0 animate-blur-in" style={{ animationDelay: '1.4s' }}>
             <p className="text-gray-600 text-lg tracking-normal">
                Watch precision meets digital aesthetics, enhancing your workspace even when you're away.
             </p>
          </div>
        </section>

        {/* Feature 1: The Main Clock */}
        <section className="bg-white rounded-[40px] p-12 md:p-24 text-center shadow-sm">
          <div className="space-y-4 mb-16">
             <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Intentionally crafted, carefully refined.</h2>
             <p className="text-gray-500 tracking-normal">Meticulous attention to details that matter.</p>
          </div>
          
          <div className="flex justify-center">
             <BauhausClock size={500} className="max-w-full" />
          </div>
        </section>

        {/* Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Settings Card - Interactive 3D Tilt */}
          <div 
            ref={settingsCardRef}
            onMouseMove={handleSettingsMouseMove}
            onMouseLeave={handleSettingsMouseLeave}
            className="bg-blue-600 text-white rounded-[40px] p-10 md:p-16 overflow-hidden relative min-h-[500px] flex flex-col justify-between group"
            style={{ perspective: '1000px' }}
          >
             {/* Abstract Background */}
             <div className="absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-40 pointer-events-none">
                 <img src="https://picsum.photos/800/800?blur=10" className="w-full h-full object-cover mix-blend-overlay" alt="texture" />
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/80"></div>
             </div>

             <div className="relative z-10 space-y-2 pointer-events-none">
                <h3 className="text-3xl font-semibold tracking-tight">Beautiful design,<br />inside and out.</h3>
                <p className="text-blue-100 tracking-normal">Settings crafted to be as elegant as the screensaver they control.</p>
             </div>

             {/* Mock UI Panel - Interactive & 3D Tilted */}
             <div 
                className="relative z-20 bg-[#F5F5F7]/95 backdrop-blur-xl text-black rounded-xl shadow-2xl transition-transform duration-100 ease-out border border-white/20 max-w-[280px] mx-auto w-full select-none overflow-hidden"
                style={{
                    transform: `rotateX(${settingsTilt.x}deg) rotateY(${settingsTilt.y}deg) scale(${settingsTilt.x !== 0 ? 1.02 : 1})`,
                    boxShadow: `${-settingsTilt.y * 2}px ${settingsTilt.x * 2 + 20}px 40px rgba(0,0,0,0.3)`
                }}
             >
                {/* Window Header */}
                <div className="px-4 py-3 border-b border-gray-200/60 flex items-center justify-center relative bg-gray-100/50">
                   <span className="font-semibold text-[13px] text-gray-900">Preferences</span>
                </div>
                
                <div className="p-5 space-y-5">
                    {/* Theme Segmented Control */}
                    <div className="bg-gray-200/80 p-1 rounded-lg flex">
                        <button 
                            onClick={() => setActiveTheme(0)}
                            className={`flex-1 py-1.5 rounded-[6px] flex items-center justify-center transition-all duration-200 active:scale-95 ${activeTheme === 0 ? 'bg-white shadow-sm scale-100' : 'hover:bg-white/40'}`}
                        >
                            <div className={`w-5 h-5 rounded-full border border-gray-200 shadow-sm transition-transform ${activeTheme === 0 ? 'scale-110 bg-white' : 'bg-white'}`}></div>
                        </button>
                        <button 
                            onClick={() => setActiveTheme(1)}
                            className={`flex-1 py-1.5 rounded-[6px] flex items-center justify-center transition-all duration-200 active:scale-95 ${activeTheme === 1 ? 'bg-white shadow-sm scale-100' : 'hover:bg-white/40'}`}
                        >
                            <div className={`w-5 h-5 rounded-full shadow-sm transition-transform ${activeTheme === 1 ? 'scale-110 bg-black' : 'bg-black'}`}></div>
                        </button>
                        <button 
                            onClick={() => setActiveTheme(2)}
                            className={`flex-1 py-1.5 rounded-[6px] flex items-center justify-center transition-all duration-200 active:scale-95 ${activeTheme === 2 ? 'bg-white shadow-sm scale-100' : 'hover:bg-white/40'}`}
                        >
                            <div className={`w-5 h-5 rounded-full border border-gray-300 shadow-sm overflow-hidden relative transition-transform ${activeTheme === 2 ? 'scale-110' : ''}`}>
                                <div className="absolute inset-0 w-1/2 bg-white"></div>
                                <div className="absolute inset-0 w-1/2 left-1/2 bg-black"></div>
                            </div>
                        </button>
                    </div>

                    {/* Slider Area */}
                    <div 
                        className="space-y-2 group/slider cursor-pointer relative" 
                        onClick={handleSliderClick}
                        ref={sliderRef}
                    >
                        <div className="h-1 bg-gray-300/50 rounded-full w-full overflow-hidden relative">
                            <div 
                                className="h-full bg-[#007AFF] absolute top-0 left-0 rounded-full transition-all duration-75 ease-linear"
                                style={{ width: `${sliderValue}%` }}
                            ></div>
                        </div>
                        <div 
                            className="w-5 h-5 bg-white shadow-[0_2px_4px_rgba(0,0,0,0.15)] border border-gray-200 rounded-full absolute top-0 -mt-2 transition-all duration-75 ease-linear hover:scale-125 active:scale-95"
                            style={{ left: `calc(${sliderValue}% - 10px)` }}
                        ></div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button className="px-3 py-1 bg-white hover:bg-gray-50 active:bg-gray-100 active:scale-95 border border-gray-300/80 shadow-sm rounded-[5px] text-[12px] font-medium text-gray-700 transition-all">Cancel</button>
                        <button className="px-3 py-1 bg-[#007AFF] hover:bg-blue-600 active:bg-blue-700 active:scale-95 shadow-sm rounded-[5px] text-[12px] font-medium text-white transition-all">OK</button>
                    </div>
                </div>
             </div>
          </div>

          {/* Language Card - Interactive Flip */}
          <div className="bg-white rounded-[40px] p-10 md:p-16 flex flex-col justify-between text-center shadow-sm group transition-shadow">
             <div className="space-y-2">
                <h3 className="text-3xl font-semibold tracking-tight">Set things in <br/>your language.</h3>
                <p className="text-gray-500 tracking-normal">Every detail translated, except for universal numerals.</p>
             </div>

             <div className="flex-1 flex items-center justify-center py-12 [perspective:1000px]">
                <div 
                    className={`relative w-32 h-32 transition-all duration-700 [transform-style:preserve-3d] cursor-pointer ${languageFlipped ? '[transform:rotateY(180deg)]' : ''}`}
                    onClick={() => setLanguageFlipped(!languageFlipped)}
                >
                   {/* Front Face */}
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-[28px] shadow-xl flex items-center justify-center text-white [backface-visibility:hidden]">
                      <Globe size={64} strokeWidth={1.5} />
                      {/* Shine */}
                      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
                   </div>
                   {/* Back Face */}
                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[28px] shadow-xl flex items-center justify-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                      <span className="text-3xl font-medium select-none animate-fade-in">{greeting}</span>
                      {/* Shine */}
                      <div className="absolute inset-0 rounded-[28px] bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
                   </div>
                </div>
             </div>

             <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-400 font-medium">
                 {languages.map((lang) => (
                     <button 
                        key={lang.name}
                        onClick={() => handleLanguageClick(lang)}
                        className="hover:text-blue-500 transition-colors active:scale-95"
                    >
                         {lang.name}
                     </button>
                 ))}
             </div>
          </div>
        </section>

        {/* Timezone Selector Section */}
        <section>
            <TimezoneSelector />
        </section>

        {/* Security & Movement Row */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {/* Security Card - Interactive Animation */}
           <div className="bg-white rounded-[40px] p-10 flex flex-col items-center justify-center text-center shadow-sm md:col-span-1 group cursor-pointer hover:shadow-lg transition-all duration-300 active:scale-[0.98]">
              <div className="flex gap-1 mb-4">
                 <div className="w-3 h-3 rounded-full bg-red-400/80 group-hover:bg-red-500 transition-colors"></div>
                 <div className="w-3 h-3 rounded-full bg-yellow-400/80 group-hover:bg-yellow-500 transition-colors"></div>
                 <div className="w-3 h-3 rounded-full bg-green-400/80 group-hover:bg-green-500 transition-colors"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2 tracking-tight">Install in peace.</h3>
              <p className="text-gray-500 text-sm mb-8 tracking-normal">Apple-notarized for seamless, worry-free installation.</p>
              
              <div className="bg-[#F5F5F7] p-6 rounded-2xl border border-gray-100 relative transition-all duration-500 group-hover:bg-white group-hover:shadow-xl group-hover:-translate-y-2 group-hover:border-gray-200">
                  <div className="absolute -top-3 -right-3 bg-[#34C759] text-white rounded-full p-1.5 shadow-[0_4px_12px_rgba(52,199,89,0.4)] ring-4 ring-white z-20 transition-all duration-500 scale-0 opacity-0 group-hover:scale-110 group-hover:opacity-100 group-hover:rotate-[360deg] origin-center">
                      <Check size={18} strokeWidth={4} />
                  </div>
                  <div className="w-24 h-28 bg-white shadow-sm flex flex-col items-center justify-center gap-3 rounded-lg border border-gray-200 relative overflow-hidden group-hover:border-blue-200 transition-colors">
                      <div className="w-12 h-12 rounded-md border border-gray-100 flex items-center justify-center bg-gray-50 group-hover:bg-blue-50 transition-colors">
                           <BauhausClock size={32} hideNumbers tickRate="quartz" />
                      </div>
                      <div className="w-14 h-1.5 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors"></div>
                      <div className="w-8 h-1.5 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors"></div>
                      
                      {/* Folded Corner effect */}
                      <div className="absolute top-0 right-0 w-6 h-6 bg-gradient-to-bl from-gray-200 to-white border-b border-l border-gray-200 transform translate-x-1/2 -translate-y-1/2 rotate-45"></div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 mt-3 block tracking-widest uppercase group-hover:text-[#007AFF] transition-colors delay-100">Verified</span>
              </div>
           </div>

           {/* Movement Card */}
           <div className="bg-white rounded-[40px] p-10 flex flex-col items-center text-center shadow-sm md:col-span-2">
              <h3 className="text-xl font-semibold mb-2 tracking-tight">Watch movement you can feel.</h3>
              <p className="text-gray-500 text-sm mb-12 tracking-normal">Experience true mechanical precision at 28,800 beats per hour.</p>
              
              <div className="flex flex-col md:flex-row gap-12 items-center w-full justify-center">
                 <div className="flex flex-col items-center gap-4 group cursor-default">
                     <div className="bg-gray-50 rounded-full p-2 shadow-inner transition-transform group-hover:scale-105">
                        <BauhausClock size={120} tickRate="quartz" hideNumbers />
                     </div>
                     <span className="text-xs font-medium text-gray-500">Quartz 1 Hz</span>
                 </div>
                 <div className="flex flex-col items-center gap-4 group cursor-default">
                     <div className="bg-white rounded-full p-2 shadow-lg ring-1 ring-gray-100 transition-transform group-hover:scale-110">
                        <BauhausClock size={140} tickRate="smooth" hideNumbers />
                     </div>
                     <span className="text-xs font-bold text-gray-900">Bauhaus Smooth</span>
                 </div>
                 <div className="flex flex-col items-center gap-4 group cursor-default">
                     <div className="bg-gray-50 rounded-full p-2 shadow-inner transition-transform group-hover:scale-105">
                        <BauhausClock size={120} tickRate="digital" hideNumbers />
                     </div>
                     <span className="text-xs font-medium text-gray-500">Digital 60 Hz</span>
                 </div>
              </div>
           </div>
        </section>

        {/* Night Mode */}
        <NightMode />

        {/* Footer CTA */}
        <section className="text-center space-y-8 py-12">
            <h2 className="text-4xl font-semibold tracking-tight">
                Transform your Mac's idle time <br/>
                into a timepiece worth watching.
            </h2>
            
            <div className="flex flex-col items-center gap-3 text-gray-600 tracking-normal">
                <div className="flex items-center gap-2">
                    <Check className="text-gray-400" size={20} />
                    <span>One-time purchase with lifetime updates.</span>
                </div>
                <div className="flex items-center gap-2">
                    <Check className="text-gray-400" size={20} />
                    <span>Handcrafted for visual excellence.</span>
                </div>
                <div className="flex items-center gap-2">
                    <Check className="text-gray-400" size={20} />
                    <span>Simple installation process.</span>
                </div>
            </div>

            <div className="pt-8">
                <button className="bg-[#1D1D1F] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-black hover:scale-105 transition-all shadow-2xl shadow-gray-900/20 flex items-center gap-2 mx-auto">
                    <span>Buy now — $19</span>
                </button>
                <p className="text-xs text-gray-400 mt-4 tracking-normal">
                    Works on macOS 14 Sonoma or later.<br/>
                    Need help? Please reach out.
                </p>
            </div>
        </section>

      </main>

      <footer className="max-w-6xl mx-auto px-6 mt-24 pt-12 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <h1 className="text-[80px] md:text-[120px] font-bold text-gray-100 leading-none tracking-tighter select-none">
                  Bauhaus Clock
              </h1>
              <div className="flex gap-6 text-xs text-gray-400 pb-4 tracking-normal">
                  <span>Made with care by Rooltie ↗</span>
                  <span>Legal notice, Privacy policy</span>
              </div>
          </div>
      </footer>
    </div>
  );
}

export default App;
