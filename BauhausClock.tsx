
import React, { useEffect, useState } from 'react';
import { ClockProps } from '../types';

export const BauhausClock: React.FC<ClockProps> = ({ 
  size = 300, 
  className = "", 
  hideNumbers = false,
  tickRate = 'smooth',
  theme = 'light',
  time: controlledTime
}) => {
  const [internalTime, setInternalTime] = useState(new Date());

  useEffect(() => {
    if (controlledTime) return; // Don't run interval if time is controlled

    const intervalId = setInterval(() => {
      setInternalTime(new Date());
    }, tickRate === 'quartz' ? 1000 : 16); // 60fps for smooth, 1s for quartz

    return () => clearInterval(intervalId);
  }, [tickRate, controlledTime]);

  const time = controlledTime || internalTime;

  const seconds = time.getSeconds() + (tickRate === 'smooth' ? time.getMilliseconds() / 1000 : 0);
  const minutes = time.getMinutes() + seconds / 60;
  const hours = (time.getHours() % 12) + minutes / 60;

  const radius = size / 2;
  const center = radius;
  
  // Design constants
  const tickLength = size * 0.08;
  const tickStart = radius - size * 0.15;
  const numberRadius = radius - size * 0.25;

  // Colors based on theme
  const handColor = theme === 'dark' ? 'white' : '#1D1D1F';
  const secondHandColor = '#86868B'; // Silver/Gray
  const faceColor = theme === 'dark' ? '#161617' : 'white';
  const textColor = theme === 'dark' ? 'white' : '#1D1D1F';
  const tickColor = theme === 'dark' ? 'rgba(255,255,255,0.8)' : '#1D1D1F';

  // Generate ticks
  const ticks = Array.from({ length: 60 }).map((_, i) => {
    const angle = (i * 6) * (Math.PI / 180);
    const isHour = i % 5 === 0;
    
    const x1 = center + Math.sin(angle) * (tickStart);
    const y1 = center - Math.cos(angle) * (tickStart);
    const x2 = center + Math.sin(angle) * (tickStart + (isHour ? tickLength : tickLength * 0.5));
    const y2 = center - Math.cos(angle) * (tickStart + (isHour ? tickLength : tickLength * 0.5));

    return (
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={tickColor}
        strokeWidth={isHour ? size * 0.008 : size * 0.004}
        strokeLinecap="round"
      />
    );
  });

  // Numbers configuration
  const numbers = [12, 2, 3, 5, 6, 9, 10].map((num) => {
    const angle = (num * 30) * (Math.PI / 180);
    const x = center + Math.sin(angle) * numberRadius;
    const y = center - Math.cos(angle) * numberRadius;
    
    return (
      <text
        key={num}
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={textColor}
        fontSize={size * 0.08}
        fontFamily="Inter, sans-serif"
        fontWeight="500"
      >
        {num === 12 ? '12' : num}
      </text>
    );
  });

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Face Background */}
        <circle cx={center} cy={center} r={radius * 0.98} fill={faceColor} />
        
        {/* Ticks */}
        <g>{ticks}</g>

        {/* Numbers */}
        {!hideNumbers && <g>{numbers}</g>}

        {/* Hour Hand */}
        <line
          x1={center}
          y1={center}
          x2={center + Math.sin(hours * 30 * Math.PI / 180) * (radius * 0.5)}
          y2={center - Math.cos(hours * 30 * Math.PI / 180) * (radius * 0.5)}
          stroke={handColor}
          strokeWidth={size * 0.025}
          strokeLinecap="round"
        />

        {/* Minute Hand */}
        <line
          x1={center}
          y1={center}
          x2={center + Math.sin(minutes * 6 * Math.PI / 180) * (radius * 0.75)}
          y2={center - Math.cos(minutes * 6 * Math.PI / 180) * (radius * 0.75)}
          stroke={handColor}
          strokeWidth={size * 0.02}
          strokeLinecap="round"
        />

        {/* Second Hand */}
        <g transform={`rotate(${seconds * 6} ${center} ${center})`}>
             <line
            x1={center}
            y1={center + size * 0.1}
            x2={center}
            y2={center - radius * 0.8}
            stroke={secondHandColor}
            strokeWidth={size * 0.008}
            strokeLinecap="round"
          />
           <circle cx={center} cy={center} r={size * 0.015} fill="white" stroke={secondHandColor} strokeWidth={2} />
           <circle cx={center} cy={center - radius * 0.8} r={size * 0.02} fill={secondHandColor} />
        </g>

        {/* Center Cap */}
        <circle cx={center} cy={center} r={size * 0.03} fill="white" stroke={secondHandColor} strokeWidth={2} />
      </svg>
    </div>
  );
};
