import { useState, useEffect } from "react";
// import { useState, useEffect } from "react"; digunakan untuk
import { Watchlist } from "./components/Watchlist";
import { ShowForm } from "./components/ShowForm";
import { ShowDetail } from "./components/ShowDetail";
import { EpisodeForm } from "./components/EpisodeForm";
import { loadSeries, loadEpisodes, saveSeries, saveEpisodes } from "./utils/storage";
import type { Series, Episode, WatchStatus } from "./types/watchlist";

type AppView = "watchlist" | "add_show" | "show_detail" | "add_episode" | "edit_show" | "edit_episode";

function App() {
  const [seriesList, setSeriesList] = useState<Series[]>(() => loadSeries());
  const [episodesList, setEpisodeList] = useState<Episode[]>(() => loadEpisodes());
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(null);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<AppView>("watchlist");

  useEffect(() => { saveSeries(seriesList); }, [seriesList]);
  // useEffect yang disatukan dengan saveSeries gunanya adalah untuk menyimpan data series ke localStorage setiap kali seriesList berubah.
  // Begitu juga dengan episodesList, kita ingin menyimpan data episode ke localStorage setiap kali episodesList berubah. Jadi kita menambahkan useEffect kedua untuk saveEpisodes.
  useEffect(() => { saveEpisodes(episodesList); }, [episodesList]);

const handleGenerateDummyData = () => {
    // 1. Data Tontonan (Series & Movie)
    const dummySeries: Series[] = [
      { 
        id: "1", 
        title: "Kaiju No. 8 (怪獣8号)", 
        type: "TV Series", 
        year: 2024, 
        genre: "Action, Sci-Fi, Monster, Military, Shounen", 
        status: "Watching",
        description: "Kaiju No. 8 (Jepang: 怪獣8号, Hepburn: Kaijū 8-gou), Bercerita tentang Kafka Hibino, seorang pria yang habis menelan kaiju, dia memperoleh kemampuan berubah jadi kaiju dan sekarang harus menavigasi kekuatannya saat mencoba jadi bagian dari organisasi yang melenyapkan kaiju untuk memenuhi janji yang dia buat dengan teman masa kecilnya."
      },
      { 
        id: "2", 
        title: "Hacksaw Ridge", 
        type: "Movie", 
        year: 2016, 
        genre: "Perang, Biografi, Drama, Sejarah", 
        status: "Completed",
        description: "Hacksaw Ridge adalah film perang biografi berdasarkan kisah nyata Desmond Doss, seorang tentara medis Amerika Serikat pada Perang Dunia II yang menolak menggunakan senjata karena keyakinan Kristennya. Meski menghadapi tekanan militer, ia mempertaruhkan nyawanya untuk menyelamatkan puluhan tentara di Pertempuran Okinawa, membuktikan bahwa keberanian sejati juga berarti mempertahankan prinsip dan menyelamatkan kehidupan."
      }
    ];

    // contoh tv series Kaiju No. 8
    const dummyEpisodes: Episode[] = [
      // ====== SEASON 1 ======
      { id: "ep1_1", seriesId: "1", season: 1, episodeNumber: 1, title: "The Man Who Became a Kaiju", watched: true },
      { id: "ep1_2", seriesId: "1", season: 1, episodeNumber: 2, title: "The Kaiju Who Defeats Kaiju", watched: true },
      { id: "ep1_3", seriesId: "1", season: 1, episodeNumber: 3, title: "Revenge Match", watched: false },
      { id: "ep1_4", seriesId: "1", season: 1, episodeNumber: 4, title: "Fortitude 9.8", watched: false },
      { id: "ep1_5", seriesId: "1", season: 1, episodeNumber: 5, title: "Joining Up!", watched: false },
      { id: "ep1_6", seriesId: "1", season: 1, episodeNumber: 6, title: "Sagamihara Neutralization Operation At Daybreak", watched: false },
      { id: "ep1_7", seriesId: "1", season: 1, episodeNumber: 7, title: "Kaiju No. 9", watched: false },
      { id: "ep1_8", seriesId: "1", season: 1, episodeNumber: 8, title: "Welcome to the Defense Force", watched: false },
      { id: "ep1_9", seriesId: "1", season: 1, episodeNumber: 9, title: "Raid on Tachikawa Base", watched: false },
      { id: "ep1_10", seriesId: "1", season: 1, episodeNumber: 10, title: "Secret Revealed", watched: false },
      { id: "ep1_11", seriesId: "1", season: 1, episodeNumber: 11, title: "Kaiju No. 8 Captured", watched: false },
      { id: "ep1_12", seriesId: "1", season: 1, episodeNumber: 12, title: "Kafka Hibino", watched: false },
      
      // ====== SEASON 2 ======
      { id: "ep2_13", seriesId: "1", season: 2, episodeNumber: 13, title: "Kaiju Weapon", watched: false },
      { id: "ep2_14", seriesId: "1", season: 2, episodeNumber: 14, title: "The Next Generation's Trial", watched: false },
      { id: "ep2_15", seriesId: "1", season: 2, episodeNumber: 15, title: "The Strongest Division", watched: false },
      { id: "ep2_16", seriesId: "1", season: 2, episodeNumber: 16, title: "The Man Called Isao Shinomiya", watched: false },
      { id: "ep2_17", seriesId: "1", season: 2, episodeNumber: 17, title: "I Want to Be Strong", watched: false },
      { id: "ep2_18", seriesId: "1", season: 2, episodeNumber: 18, title: "Compatible User", watched: false },
      { id: "ep2_19", seriesId: "1", season: 2, episodeNumber: 19, title: "Wall", watched: false },
      { id: "ep2_20", seriesId: "1", season: 2, episodeNumber: 20, title: "Destiny", watched: false },
      { id: "ep2_21", seriesId: "1", season: 2, episodeNumber: 21, title: "Omen", watched: false },
      { id: "ep2_22", seriesId: "1", season: 2, episodeNumber: 22, title: "Cataclysms", watched: false },
      { id: "ep2_23", seriesId: "1", season: 2, episodeNumber: 23, title: "Second Wave", watched: false },
    ];

    setSeriesList(dummySeries);
    setEpisodeList(dummyEpisodes);
  };

  const handleSaveSeries = (newSeries: Series) => {
    setSeriesList((prev) => [...prev, newSeries]);
    setCurrentView("watchlist"); 
  };

  const handleUpdateSeries = (updatedSeries: Series) => {
    setSeriesList((prev) => prev.map((s) => (s.id === updatedSeries.id ? updatedSeries : s)));
    setCurrentView("show_detail"); 
  };

  const handleDeleteSeries = (id: string) => {
    if (window.confirm("Yakin ingin menghapus tontonan ini beserta semua episodenya?")) {
      setSeriesList((prev) => prev.filter((s) => s.id !== id));
      setEpisodeList((prev) => prev.filter((ep) => ep.seriesId !== id));
      setSelectedSeriesId(null);
      setCurrentView("watchlist");
    }
  };

  // fungsi episode 
  const handleSaveEpisode = (newEpisode: Episode) => {
    setEpisodeList((prev) => [...prev, newEpisode]);
    setCurrentView("show_detail"); 
  };

  const handleUpdateEpisode = (updatedEpisode: Episode) => {
    setEpisodeList((prev) => prev.map((ep) => (ep.id === updatedEpisode.id ? updatedEpisode : ep)));
    setCurrentView("show_detail"); 
    setSelectedEpisodeId(null);
  };

  const handleDeleteEpisode = (id: string) => {
    if (window.confirm("Yakin ingin menghapus episode ini?")) {
      setEpisodeList((prev) => prev.filter((ep) => ep.id !== id));
    }
  };

  // =========================================================================
  // LOGIKA BARU: Sihir Otomatis Status saat episode dicentang/hilang centang
  // =========================================================================
  const handleToggleWatched = (episodeId: string) => {
    // 1. Simpan perubahan centang pada daftar episode
    const updatedEpisodesList = episodesList.map((ep) => 
      ep.id === episodeId ? { ...ep, watched: !ep.watched } : ep
    );
    setEpisodeList(updatedEpisodesList);

    // 2. Cari tahu episode ini milik TV Series yang mana
    const targetEpisode = episodesList.find(ep => ep.id === episodeId);
    if (!targetEpisode) return;
    const targetSeriesId = targetEpisode.seriesId;

    // 3. Kumpulkan HANYA episode dari TV Series tersebut
    const seriesEpisodes = updatedEpisodesList.filter(ep => ep.seriesId === targetSeriesId);
    
    // 4. Hitung persentasenya
    const totalEpisodes = seriesEpisodes.length;
    const watchedEpisodes = seriesEpisodes.filter(ep => ep.watched).length;
    const newProgress = totalEpisodes === 0 ? 0 : Math.round((watchedEpisodes / totalEpisodes) * 100);

    // 5. Tentukan Status Baru!
    let autoStatus: WatchStatus = "Plan to Watch"; // Jika 0%
    if (newProgress > 0 && newProgress < 100) {
      autoStatus = "Watching"; // Jika 1% - 99%
    } else if (newProgress === 100) {
      autoStatus = "Completed"; // Jika 100%
    }

    // 6. Update Status TV Series tersebut
    setSeriesList(prev => prev.map(series => 
      series.id === targetSeriesId ? { ...series, status: autoStatus } : series
    ));
  };
  // =========================================================================

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <header className="flex justify-between items-center border-b pb-4 border-gray-200 dark:border-gray-800">
          <h1 className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">MyWatch</h1>
          <div className="flex gap-2">
            {seriesList.length === 0 && (
              <button onClick={handleGenerateDummyData} className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-medium hover:bg-blue-200">
                Isi Data Contoh
              </button>
            )}
            {currentView === "watchlist" && (
               <button onClick={() => setCurrentView("add_show")} className="bg-purple-600 text-white px-4 py-2 rounded font-medium hover:bg-purple-700">
                 + Tambah Baru
               </button>
            )}
          </div>
        </header>

        {currentView === "watchlist" && (
          <Watchlist 
            seriesList={seriesList}
            episodesList={episodesList}
            onSelectSeries={(id) => { setSelectedSeriesId(id); setCurrentView("show_detail"); }}
          />
        )}

        {currentView === "add_show" && (
          <ShowForm onSubmit={handleSaveSeries} onCancel={() => setCurrentView("watchlist")} />
        )}

        {currentView === "edit_show" && selectedSeriesId && (
          <ShowForm 
            initialData={seriesList.find((s) => s.id === selectedSeriesId)}
            onSubmit={handleUpdateSeries} 
            onCancel={() => setCurrentView("show_detail")} 
          />
        )}

        {currentView === "show_detail" && selectedSeriesId && (
          <ShowDetail 
            series={seriesList.find((s) => s.id === selectedSeriesId)!} 
            episodes={episodesList}
            onBack={() => { setSelectedSeriesId(null); setCurrentView("watchlist"); }}
            onAddEpisode={() => setCurrentView("add_episode")} 
            onToggleWatched={handleToggleWatched}
            onEdit={() => setCurrentView("edit_show")}
            onDelete={() => handleDeleteSeries(selectedSeriesId)}
            onEditEpisode={(epId) => {
              setSelectedEpisodeId(epId);
              setCurrentView("edit_episode");
            }}
            onDeleteEpisode={handleDeleteEpisode}
          />
        )}

        {currentView === "add_episode" && selectedSeriesId && (
          <EpisodeForm 
            seriesId={selectedSeriesId}
            onSubmit={handleSaveEpisode}
            onCancel={() => setCurrentView("show_detail")}
          />
        )}

        {currentView === "edit_episode" && selectedSeriesId && selectedEpisodeId && (
          <EpisodeForm 
            seriesId={selectedSeriesId}
            initialData={episodesList.find((ep) => ep.id === selectedEpisodeId)}
            onSubmit={handleUpdateEpisode}
            onCancel={() => {
              setSelectedEpisodeId(null);
              setCurrentView("show_detail");
            }}
          />
        )}

      </div>
    </div>
  );
}

export default App;