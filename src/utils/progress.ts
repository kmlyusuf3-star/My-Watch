import type { Episode } from "../types/watchlist";

export const calculateProgress = (seriesId: string, episodes: Episode[]): number => {
  // Ambil hanya episode yang nyambung dengan series ini
  const seriesEpisodes = episodes.filter(ep => ep.seriesId === seriesId);
  
  if (seriesEpisodes.length === 0) return 0;
  
  // Hitung berapa yang sudah ditonton
  const watchedEpisodes = seriesEpisodes.filter(ep => ep.watched).length;
  
  // Rumus persentase (ditonton / total * 100)
  return Math.round((watchedEpisodes / seriesEpisodes.length) * 100);
};