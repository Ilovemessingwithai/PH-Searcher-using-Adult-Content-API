
import React from 'react';
import type { Video } from '../types';

interface VideoCardProps {
    video: Video;
    onVideoSelect: (video: Video) => void;
    index: number;
}

const formatDuration = (seconds?: number): string => {
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
        return "N/A";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const VideoCard: React.FC<VideoCardProps> = ({ video, onVideoSelect, index }) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            onVideoSelect(video);
        }
    };
    
    return (
        <div
            onClick={() => onVideoSelect(video)}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${video.title}`}
            className="video-card-glow group block bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 animate-slide-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            <div className="relative">
                <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration)}
                </span>
            </div>
            <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-200 truncate shimmer-text" title={video.title}>
                    {video.title}
                </h3>
                 <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
                    <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        {typeof video.views === 'number' ? video.views.toLocaleString() : '--'}
                    </span>
                    <span className="flex items-center">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                         <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                       </svg>
                       {typeof video.rating === 'number' ? video.rating.toFixed(1) : '--'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;