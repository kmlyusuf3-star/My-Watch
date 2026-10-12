import type { Episode } from "../types/watchlist";

interface EpisodeListProps {
  episodes: Episode[];
  onToggleWatched: (id: string) => void;
  onEditEpisode: (id: string) => void;
  onDeleteEpisode: (id: string) => void;
}

export function EpisodeList({ episodes, onToggleWatched, onEditEpisode, onDeleteEpisode }: EpisodeListProps) {
  if (episodes.length === 0) {
    return <div className="text-gray-500 py-4 text-center border-2 border-dashed rounded-lg mt-4 dark:border-gray-700">Belum ada episode yang ditambahkan.</div>;
  }

  const uniqueSeasons = Array.from(new Set(episodes.map(ep => ep.season))).sort((a, b) => a - b);

  return (
    // UBAH 1: Kita hapus "max-h-[400px]" dan "overflow-y-auto" dari sini. 
    // Jadi kotak besarnya akan memanjang ke bawah sesuai jumlah Season dengan menambahkan 
    <div className="mt-4 space-y-6">
      
      {uniqueSeasons.map(seasonNumber => {
        const seasonEpisodes = episodes
          .filter(ep => ep.season === seasonNumber)
          .sort((a, b) => a.episodeNumber - b.episodeNumber);

        return (
          // UBAH 2: Kita pindahkan pembatas tingginya (max-h) dan efek scroll (overflow-y-auto) ke kotak Masing-Masing Season ini.
          // Kita buat tinggi maksimal tiap kotak Season adalah 300px.
          <div 
            key={`season-${seasonNumber}`} 
            className="border dark:border-gray-700 rounded-xl max-h-[300px] overflow-y-auto bg-gray-50 dark:bg-gray-900/50 shadow-inner"
          >
            
            {/* UBAH 3: Judul Season kita beri background tegas agar menutupi episode yang lewat di bawahnya saat di-scroll */}
            <h4 className="font-bold text-lg text-purple-700 dark:text-purple-400 sticky top-0 bg-gray-100 dark:bg-gray-800 px-4 py-3 z-10 border-b dark:border-gray-700 shadow-sm flex items-center gap-2">
              Season {seasonNumber}
              <span className="text-sm font-normal text-gray-500">
                ({seasonEpisodes.length} Episode)
              </span>
            </h4>
            
            {/* Area di dalam kotak Season kita beri jarak (p-4) agar rapi */}
            <div className="p-4 space-y-2">
              {seasonEpisodes.map((ep) => (
                <div key={ep.id} className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                  <div className="flex items-center gap-4">
                    <input 
                      type="checkbox" 
                      checked={ep.watched}
                      onChange={() => onToggleWatched(ep.id)}
                      className="w-5 h-5 accent-purple-600 cursor-pointer rounded"
                    />
                    <div>
                      <div className="font-medium">
                        <span className="text-purple-600 dark:text-purple-400 mr-2">Eps {ep.episodeNumber}</span> 
                        {ep.title}
                      </div>
                      {ep.platform && <div className="text-xs text-gray-500">{ep.platform}</div>}
                    </div>
                  </div>
                  
                  <div className="flex gap-3 px-2">
                    <button onClick={() => onEditEpisode(ep.id)} className="text-sm text-yellow-600 dark:text-yellow-500 hover:underline">
                      Edit
                    </button>
                    <button onClick={() => onDeleteEpisode(ep.id)} className="text-sm text-red-600 dark:text-red-500 hover:underline">
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        );
      })}
    </div>
  );
}