
export interface Video {
  id: string | number;
  title: string;
  url: string;
  thumbnail: string;
  duration?: number;
  views?: number;
  rating?: number;
  tags?: string[];
  categories?: string[];
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export interface VideoApiResponse {
  data: Video[];
  pagination: Pagination;
}
