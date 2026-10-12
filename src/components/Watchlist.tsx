import { useState } from "react";
import type { Series, Episode, MediaType, WatchStatus } from "../types/watchlist";
import { ShowCard } from "./ShowCard";
import { calculateProgress } from "../utils/progress";
import { SearchFilter } from "./SearchFilter"; // BARU: Import komponen pencarian

interface WatchlistProps {
  seriesList: Series[];
  episodesList: Episode[];
  onSelectSeries: (id: string) => void;
}

export function Watchlist({ seriesList, episodesList, onSelectSeries }: WatchlistProps) {
  // BARU: State untuk menyimpan kata kunci pencarian dan pilihan filter
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<MediaType | "All">("All");
  const [statusFilter, setStatusFilter] = useState<WatchStatus | "All">("All");

  // BARU: Logika penyaringan data. Data asli (seriesList) tidak diubah.
  const filteredSeries = seriesList.filter((series) => {
    // Cek apakah judul mengandung huruf yang diketik (mengabaikan huruf besar/kecil)
    const matchSearch = series.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchType = typeFilter === "All" || series.type === typeFilter;
    const matchStatus = statusFilter === "All" || series.status === statusFilter;
    
    return matchSearch && matchType && matchStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">My Watchlist</h2>
      </div>

      {/* BARU: Memanggil komponen SearchFilter ke layar */}
      <SearchFilter 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {/* Menampilkan pesan berbeda jika hasil filter tidak ditemukan */}
      {filteredSeries.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          {seriesList.length === 0 
            ? "Watchlist kamu masih kosong. Silakan tambahkan tontonan pertamamu!" 
            : "Tidak ada tontonan yang sesuai dengan pencarian/filter."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSeries.map((series) => (
            <ShowCard 
              key={series.id}
              series={series}
              progress={calculateProgress(series.id, episodesList)}
              onClick={onSelectSeries}
            />
          ))}
        </div>
      )}
    </div>
  );
}