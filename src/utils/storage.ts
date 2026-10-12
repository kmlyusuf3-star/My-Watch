import type { Series, Episode } from "../types/watchlist";

const SERIES_KEY = "mywatch_series";
const EPISODES_KEY = "mywatch_episodes";

// Fungsi untuk mengambil data dari browser
export const loadSeries = (): Series[] => {
  const data = localStorage.getItem(SERIES_KEY);
  return data ? JSON.parse(data) : [];
};

export const loadEpisodes = (): Episode[] => {
  const data = localStorage.getItem(EPISODES_KEY);
  return data ? JSON.parse(data) : [];
};

// Fungsi untuk menyimpan data ke browser
export const saveSeries = (series: Series[]) => {
  localStorage.setItem(SERIES_KEY, JSON.stringify(series));
};

export const saveEpisodes = (episodes: Episode[]) => {
  localStorage.setItem(EPISODES_KEY, JSON.stringify(episodes));
};