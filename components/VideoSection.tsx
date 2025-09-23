import React from "react";

interface VideoSectionProps {
  src: string;
  poster?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ src, poster }) => {
  return (
    <section className="w-full">
      <video
        src={src}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-auto max-h-[620px] object-contain"
      />
     
    </section>
  );
};

export default VideoSection;
