
export interface ClockProps {
  size?: number;
  className?: string;
  hideNumbers?: boolean;
  tickRate?: 'quartz' | 'smooth' | 'digital'; 
  theme?: 'light' | 'dark';
  time?: Date;
}

export interface ColorPillProps {
  color: string;
  name: string;
  hex: string;
}
