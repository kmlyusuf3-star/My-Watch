export type MediaType = "Movie" | "TV Series";
export type WatchStatus = "Plan to Watch" | "Watching" | "Completed";

export interface Series {
  id: string;
  title: string;
  type: MediaType;
  poster?: string;
  genre?: string;
  year?: number;
  status: WatchStatus;
  description?: string;
}

export interface Episode {
  id: string;
  seriesId: string; // Ini penghubung antara Episode dan Series
  season: number;
  episodeNumber: number;
  title: string;
  platform?: string;
  link?: string;
  notes?: string;
  watched: boolean;
}