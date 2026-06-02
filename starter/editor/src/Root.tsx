import React from 'react';
import {AbsoluteFill, Composition} from 'remotion';
import {TikTokVideo} from './templates/social/TikTokVideo';
import {InstagramReel} from './templates/social/InstagramReel';
import {YouTubeShort} from './templates/social/YouTubeShort';
import {TalkingHeadEdit} from './templates/editing/TalkingHeadEdit';
import {PodcastClip} from './templates/editing/PodcastClip';
import {Presentation} from './templates/content/Presentation';
import {Testimonial} from './templates/content/Testimonial';
import {Announcement} from './templates/promo/Announcement';
import {BeforeAfter} from './templates/promo/BeforeAfter';
import {HyperframeMotionCard} from './hyperframes/HyperframeMotionCard';

const BeforeAfterDemo: React.FC = () => (
  <BeforeAfter>
    {[
      <AbsoluteFill key="before" style={{background: '#1f2937', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 72, fontWeight: 900}}>Before</AbsoluteFill>,
      <AbsoluteFill key="after" style={{background: '#111827', alignItems: 'center', justifyContent: 'center', color: '#f5b041', fontSize: 72, fontWeight: 900}}>After</AbsoluteFill>,
    ]}
  </BeforeAfter>
);

export const Root: React.FC = () => {
  return (
    <>
      <Composition id="InstagramReel" component={InstagramReel} width={1080} height={1920} fps={30} durationInFrames={180} />
      <Composition id="TikTokVideo" component={TikTokVideo} width={1080} height={1920} fps={30} durationInFrames={180} />
      <Composition id="YouTubeShort" component={YouTubeShort} width={1080} height={1920} fps={30} durationInFrames={180} />
      <Composition id="TalkingHeadEdit" component={TalkingHeadEdit} width={1920} height={1080} fps={30} durationInFrames={300} />
      <Composition id="PodcastClip" component={PodcastClip} width={1920} height={1080} fps={30} durationInFrames={300} />
      <Composition id="Presentation" component={Presentation} width={1920} height={1080} fps={30} durationInFrames={240} />
      <Composition id="Testimonial" component={Testimonial} width={1080} height={1920} fps={30} durationInFrames={180} />
      <Composition id="Announcement" component={Announcement} width={1080} height={1920} fps={30} durationInFrames={180} />
      <Composition id="BeforeAfter" component={BeforeAfterDemo} width={1080} height={1920} fps={30} durationInFrames={180} />
      <Composition id="HyperframeMotionCard" component={HyperframeMotionCard} width={1920} height={1080} fps={30} durationInFrames={120} />
    </>
  );
};
