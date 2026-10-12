import type { Series, Episode } from "../types/watchlist";
import { ProgressBar } from "./ProgressBar";
import { calculateProgress } from "../utils/progress";
import { EpisodeList } from "./EpisodeList";

interface ShowDetailProps {
  series: Series;
  episodes: Episode[];
  onBack: () => void;
  onAddEpisode: () => void;
  onToggleWatched: (episodeId: string) => void;
  onEdit: () => void;
  onDelete: () => void;
  onEditEpisode: (episodeId: string) => void;
  onDeleteEpisode: (episodeId: string) => void;
}

export function ShowDetail({ 
  series, episodes, onBack, onAddEpisode, onToggleWatched, onEdit, onDelete, onEditEpisode, onDeleteEpisode 
}: ShowDetailProps) {
  
  const progress = calculateProgress(series.id, episodes);
  const seriesEpisodes = episodes.filter(ep => ep.seriesId === series.id);
  
  // LOGIKA BARU: Menghitung total season unik dan total episode untuk ditampilkan sebagai ringkasan
  const totalSeasons = new Set(seriesEpisodes.map(ep => ep.season)).size;
  const totalEpisodes = seriesEpisodes.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-gray-700 overflow-hidden">
      
      {/* Header Tombol Kembali, Edit, Hapus */}
      <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
        <button onClick={onBack} className="text-purple-600 dark:text-purple-400 hover:underline font-medium">
          &larr; Kembali ke Daftar
        </button>
        <div className="space-x-2">
          <button onClick={onEdit} className="px-3 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-500 rounded text-sm hover:bg-yellow-200">
            Edit
          </button>
          <button onClick={onDelete} className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-500 rounded text-sm hover:bg-red-200">
            Hapus
          </button>
        </div>
      </div>

      {/* Konten Detail */}
      <div className="p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 mx-auto md:mx-0">
          {series.poster ? (
            <img src={series.poster} alt={series.title} className="w-48 h-auto object-cover rounded shadow-md" />
          ) : (
            <div className="w-48 h-72 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-gray-400 shadow-md">
              Tidak ada poster
            </div>
          )}
        </div>

        <div className="flex-grow">
          <h2 className="text-3xl font-bold mb-2">{series.title}</h2>
          <div className="flex flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300 mb-4">
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded font-medium">{series.type}</span>
            {series.year && <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{series.year}</span>}
            {series.genre && <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">{series.genre}</span>}
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            {series.description || "Belum ada deskripsi untuk tontonan ini."}
          </p>
          
          <div className="mb-4 flex items-center gap-2">
            <span className="font-semibold">Status:</span> 
            <span className="text-purple-600 dark:text-purple-400 font-medium">{series.status}</span>
          </div>

          {/* BARU: Kotak kecil minimalis yang menampilkan Total Season dan Episode */}
          {series.type === "TV Series" && totalEpisodes > 0 && (
             <div className="mb-4 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 inline-block px-3 py-1.5 rounded-lg border dark:border-gray-600">
               Total: {totalSeasons} Season • {totalEpisodes} Episode
             </div>
          )}

          {/* Progress Bar */}
          {series.type === "TV Series" && (
            <div className="mb-6 max-w-md">
              <div className="flex justify-between mb-1 text-sm font-medium">
                <span>Progress Keseluruhan</span>
                <span>{progress}%</span>
              </div>
              <ProgressBar progress={progress} />
            </div>
          )}
        </div>
      </div>
      
      {/* Area Daftar Episode yang sudah kita buat sebelumnya */}
      {series.type === "TV Series" && (
        <div className="p-6 border-t dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/20">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Daftar Episode</h3>
            <button 
              onClick={onAddEpisode}
              className="px-3 py-1.5 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded text-sm font-medium hover:bg-purple-200 transition-colors shadow-sm"
            >
              + Tambah Episode
            </button>
          </div>
          
          <EpisodeList 
            episodes={seriesEpisodes} 
            onToggleWatched={onToggleWatched} 
            onEditEpisode={onEditEpisode}
            onDeleteEpisode={onDeleteEpisode}
          />
        </div>
      )}
    </div>
  );
}