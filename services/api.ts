
import type { VideoApiResponse, Video, Pagination } from '../types';

export type Source = 'general' | 'pornhub' | 'xvideos' | 'redtube' | 'eporner' | 'xhamster' | 'xnxx' | 'tnaflix';

const BASE_URL = 'https://api.adultdatalink.com';
const API_KEY = 'GIddiev5SA3og0HVF5rOwp21iy3wA3Lb_qqbBsaNJfU'; 

const PER_PAGE = 24;

const endpoints: Record<Source, string> = {
    general: '/v1/videos/search',
    pornhub: '/pornhub/search',
    xvideos: '/xvideos/search',
    redtube: '/redtube/search',
    eporner: '/eporner/search',
    xhamster: '/xhamster/search',
    xnxx: '/xnxx/search',
    tnaflix: '/tnaflix/search',
};

const adaptApiResponse = (data: any, source: Source, page: number): VideoApiResponse => {
    if (source === 'general' && data.data) {
        // General source is already in the correct format
        return data as VideoApiResponse;
    }

    // Adapt other sources which typically return an object with a 'videos' or 'data' array
    const responseData = data.videos || data.data || [];

    const videos: Video[] = responseData.map((item: any): Video => ({
        id: item.video_id || item.id,
        title: item.title,
        url: item.url,
        thumbnail: item.thumb || item.thumbnail || item.default_thumb || item.thumbs?.['16_9']?.[0] || '',
        duration: typeof item.duration === 'string' ? parseInt(item.duration.replace(':', ''), 10) : item.duration,
        views: item.views,
        rating: typeof item.rating === 'string' ? parseFloat(item.rating) : item.rating,
        tags: Array.isArray(item.tags) ? item.tags.map((t: any) => typeof t === 'object' ? t.tag_name || t.name : t) : [],
    }));
    
    // Create a mock pagination object as most specific sources don't provide one
    const mockTotal = 5000;
    const pagination: Pagination = {
        total: mockTotal,
        count: videos.length,
        per_page: PER_PAGE,
        current_page: page,
        total_pages: Math.ceil(mockTotal / PER_PAGE),
    };

    return { data: videos, pagination };
};


export const searchVideos = async (query: string, page: number, source: Source): Promise<VideoApiResponse> => {
    if (!API_KEY) {
        throw new Error('API key is not configured. Please provide a valid API key.');
    }

    const endpoint = endpoints[source];
    if (!endpoint) {
        throw new Error(`Invalid source provided: ${source}`);
    }

    const searchParams = new URLSearchParams({
        q: query,
        page: page.toString(),
        per_page: PER_PAGE.toString(),
    });

    const response = await fetch(`${BASE_URL}${endpoint}?${searchParams.toString()}`, {
        headers: {
            'X-API-KEY': API_KEY,
        },
    });

    if (!response.ok) {
        let errorMessage = `API Error: ${response.status} ${response.statusText}`;
        try {
            const errorBody = await response.json();
            errorMessage = errorBody.message || errorMessage;
        } catch (e) {
            // Ignore if error body is not JSON
        }
        throw new Error(errorMessage);
    }
    
    const rawData = await response.json();
    return adaptApiResponse(rawData, source, page);
};
