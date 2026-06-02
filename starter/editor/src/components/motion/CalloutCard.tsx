import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';

export type CalloutCardProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  accent?: string;
};

export const CalloutCard: React.FC<CalloutCardProps> = ({
  eyebrow = 'Key idea',
  title,
  body,
  accent = '#f5b041',
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 130}});

  return (
    <div
      style={{
        transform: `translateY(${(1 - enter) * 28}px) scale(${0.96 + enter * 0.04})`,
        opacity: enter,
        border: `1px solid ${accent}66`,
        borderRadius: 28,
        background: 'rgba(8,7,11,.82)',
        boxShadow: '0 24px 80px rgba(0,0,0,.38)',
        padding: '34px 40px',
        color: 'white',
        fontFamily: 'Inter, Arial, sans-serif',
        maxWidth: 760,
      }}
    >
      <div style={{color: accent, letterSpacing: 3, textTransform: 'uppercase', fontSize: 20, fontWeight: 800}}>
        {eyebrow}
      </div>
      <div style={{fontSize: 48, lineHeight: 1.02, fontWeight: 900, marginTop: 12}}>{title}</div>
      {body ? <div style={{fontSize: 25, lineHeight: 1.25, color: '#d8d3c8', marginTop: 16}}>{body}</div> : null}
    </div>
  );
};
