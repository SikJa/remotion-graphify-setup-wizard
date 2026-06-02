import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

export type ArrowLabelProps = {
  label: string;
  direction?: 'right' | 'left' | 'down';
  color?: string;
};

export const ArrowLabel: React.FC<ArrowLabelProps> = ({label, direction = 'right', color = '#f5b041'}) => {
  const frame = useCurrentFrame();
  const draw = interpolate(frame, [0, 24], [0, 1], {extrapolateRight: 'clamp'});
  const rotate = direction === 'left' ? 180 : direction === 'down' ? 90 : 0;

  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 18, color, fontFamily: 'Inter, Arial, sans-serif'}}>
      <div style={{fontSize: 28, fontWeight: 800, letterSpacing: 1, opacity: draw}}>{label}</div>
      <svg width="180" height="44" viewBox="0 0 180 44" style={{transform: `rotate(${rotate}deg)`, overflow: 'visible'}}>
        <line x1="0" y1="22" x2={140 * draw} y2="22" stroke={color} strokeWidth="6" strokeLinecap="round" />
        <path d="M142 5 L174 22 L142 39" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity={draw} />
      </svg>
    </div>
  );
};
