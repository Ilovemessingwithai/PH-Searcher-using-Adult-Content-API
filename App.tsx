import React, { useState, useEffect, useCallback } from 'react';
import type { Video, Pagination } from './types';
import type { Source } from './services/api';
import { searchVideos } from './services/api';
import SearchBar from './components/SearchBar';
import VideoGrid from './components/VideoGrid';
import PaginationComponent from './components/Pagination';
import Loader from './components/Loader';
import VideoModal from './components/VideoModal';
import ParticleBackground from './components/ParticleBackground';

const App: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [query, setQuery] = useState<string>('');
    const [source, setSource] = useState<Source>('pornhub');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    
    const performSearch = useCallback(async (searchQuery: string, page: number, searchSource: Source) => {
        if (!searchQuery.trim()) {
            setVideos([]);
            setPagination(null);
            return;
        }
        
        setIsLoading(true);
        setError(null);
        
        try {
            const data = await searchVideos(searchQuery, page, searchSource);
            setVideos(data.data);
            setPagination(data.pagination);
            window.scrollTo(0, 0);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred.');
            }
            setVideos([]);
            setPagination(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (query) {
            performSearch(query, currentPage, source);
        }
    }, [query, currentPage, source, performSearch]);
    
    const handleSearch = (newQuery: string) => {
        setQuery(newQuery);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const handleVideoSelect = (video: Video) => {
        setSelectedVideo(video);
    };

    const handleCloseModal = () => {
        setSelectedVideo(null);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200">
            <ParticleBackground />
            <div className={selectedVideo ? 'content-wrapper-blurred' : ''}>
                <header className="bg-gray-900/70 backdrop-blur-lg sticky top-0 z-10 shadow-lg border-b border-gray-700/50 py-4">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold text-white text-center mb-4 font-heading tracking-wider">Adult Content Explorer</h1>
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </header>
                
                <main className="container mx-auto p-4 md:p-6">
                    {isLoading && <Loader />}
                    
                    {error && (
                        <div className="text-center my-10 p-4 bg-red-900/50 border border-red-700 rounded-lg">
                            <h2 className="text-2xl font-semibold text-red-400 font-heading">Error</h2>
                            <p className="text-red-300 mt-2">{error}</p>
                        </div>
                    )}

                    {!isLoading && !error && videos.length > 0 && (
                        <>
                            <VideoGrid videos={videos} onVideoSelect={handleVideoSelect} />
                            {pagination && pagination.total_pages > 1 && (
                                <PaginationComponent 
                                    currentPage={pagination.current_page} 
                                    totalPages={pagination.total_pages} 
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </>
                    )}
                    
                    {!isLoading && !error && videos.length === 0 && (
                         <div className="text-center my-10 text-gray-500">
                            <h2 className="text-3xl font-semibold font-heading">
                                {query ? 'No Results Found' : 'Explore the Collection'}
                            </h2>
                            <p className="mt-2 text-lg">
                                {query ? `Your search for "${query}" did not return any results.` : 'Use the search bar above to find videos.'}
                            </p>
                        </div>
                    )}
                </main>

                <footer className="text-center py-6 text-gray-600">
                    <p>Powered by Adult Content API</p>
                </footer>
            </div>
            
            {selectedVideo && <VideoModal video={selectedVideo} onClose={handleCloseModal} />}
        </div>
    );
};

export default App;