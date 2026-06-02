import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const HyperframeMotionCard: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 120}});
  const scan = interpolate(frame, [0, 120], [-20, 120], {extrapolateRight: 'clamp'});

  return (
    <div style={{width: '100%', height: '100%', background: '#08070b', color: 'white', fontFamily: 'Inter, Arial, sans-serif', overflow: 'hidden', position: 'relative'}}>
      <div style={{position: 'absolute', inset: 0, background: 'radial-gradient(circle at 25% 25%, rgba(245,176,65,.22), transparent 34%), radial-gradient(circle at 80% 70%, rgba(119, 27, 52, .28), transparent 40%)'}} />
      <div style={{position: 'absolute', left: 140, top: 170, transform: `translateY(${(1-enter)*40}px)`, opacity: enter}}>
        <div style={{letterSpacing: 4, color: '#f5b041', fontSize: 28, textTransform: 'uppercase'}}>Hyperframes layer</div>
        <h1 style={{fontSize: 96, lineHeight: .95, margin: '22px 0', maxWidth: 980}}>Motion graphics para explicar sistemas</h1>
        <p style={{fontSize: 34, color: '#d8d3c8', maxWidth: 760}}>Usá esta composición como base para tarjetas, flechas, mapas de flujo, overlays técnicos y transiciones editoriales.</p>
      </div>
      <div style={{position: 'absolute', right: 140, top: 190, width: 520, height: 520, border: '1px solid rgba(245,176,65,.35)', borderRadius: 36, background: 'rgba(255,255,255,.045)', boxShadow: '0 30px 90px rgba(0,0,0,.45)', transform: `scale(${0.92 + enter*.08})`}}>
        {['HTML scene', 'validate', 'preview', 'render'].map((label, i) => (
          <div key={label} style={{position: 'absolute', left: 54, top: 58 + i*112, width: 400, padding: '22px 28px', borderRadius: 20, background: i === 1 ? 'rgba(245,176,65,.18)' : 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', fontSize: 30}}>{i+1}. {label}</div>
        ))}
      </div>
      <div style={{position: 'absolute', left: `${scan}%`, top: 0, width: 3, height: '100%', background: 'linear-gradient(#0000,#f5b041,#0000)', opacity: .65}} />
    </div>
  );
};
