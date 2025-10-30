
import React, { useEffect } from 'react';
import type { Video } from '../types';

interface VideoModalProps {
    video: Video;
    onClose: () => void;
}

const formatDuration = (seconds?: number): string => {
    if (typeof seconds !== 'number' || isNaN(seconds) || seconds < 0) {
        return "N/A";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    return (
        <div 
            className="modal-backdrop fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="video-modal-title"
        >
            <div 
                className="modal-content bg-gray-800 rounded-xl overflow-hidden shadow-2xl w-full max-w-3xl transform transition-all"
                onClick={(e) => e.stopPropagation()} 
            >
                <div className="relative">
                    <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-auto object-cover max-h-[60vh]"
                    />
                     <button
                        onClick={onClose}
                        className="absolute top-3 right-3 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-colors"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    <h2 id="video-modal-title" className="text-2xl font-bold text-white mb-2">{video.title}</h2>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-400 mb-4">
                        <span className="flex items-center">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                            {typeof video.views === 'number' ? video.views.toLocaleString() + ' views' : 'N/A'}
                        </span>
                        <span className="flex items-center">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                           {typeof video.rating === 'number' ? video.rating.toFixed(1) + ' rating' : 'N/A'}
                        </span>
                         <span className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 10.586V6z" clipRule="evenodd" /></svg>
                            {formatDuration(video.duration)}
                        </span>
                    </div>

                    {video.tags && video.tags.length > 0 && (
                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-300 mb-2">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                                {video.tags.slice(0, 10).map((tag) => (
                                    <span key={tag} className="bg-gray-700 text-indigo-300 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    <a 
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glow-on-hover w-full inline-block text-center bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
                    >
                        Watch Video
                    </a>
                </div>
            </div>
        </div>
    );
};

export default VideoModal;