
import React from 'react';
import type { Video } from '../types';
import VideoCard from './VideoCard';

interface VideoGridProps {
    videos: Video[];
    onVideoSelect: (video: Video) => void;
}

const VideoGrid: React.FC<VideoGridProps> = ({ videos, onVideoSelect }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6">
            {videos.map((video, index) => (
                <VideoCard key={video.id} video={video} onVideoSelect={onVideoSelect} index={index} />
            ))}
        </div>
    );
};

export default VideoGrid;