import type { Series } from "../types/watchlist";
import { ProgressBar } from "./ProgressBar";

interface ShowCardProps {
  series: Series;
  progress: number;
  onClick: (id: string) => void;
}
// export funcion dan return disini adalah bentuk implementasi react component dengan typescript,
// dan disini "series" adalah data series yang akan ditampilkan di kartu, "progress" adalah persentase progress menonton series,
// dan "onClick" adalah fungsi yang akan dipanggil ketika kartu diklik.
export function ShowCard({ series, progress, onClick }: ShowCardProps) {
  return (
    <div 
      onClick={() => onClick(series.id)}
      // "min-h-[10rem] h-full", dan ini adalah salahsatu bentuk implementasi tailwindcss,
      // yang artinya tinggi minimal kartu adalah 10rem (sebesar h-40), tapi bisa memanjang ke bawah jika teksnya panjang.
      className="border rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-shadow bg-white dark:bg-gray-800 flex overflow-hidden min-h-[10rem] h-full"
    >
      <div className="w-28 flex-shrink-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
        {series.poster ? (
          <img src={series.poster} alt={series.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs text-gray-400">No Poster</span>
        )}
      </div>
      
      {/* "min-w-0" di kotak kanan ini juga adalah bentuk implementasi tailwindcss yang memiliki arti: 
      minimum width of 0 atau dalam bahasa Indonesia "lebar minimum 0" */}
      {/* Ini adalah rahasia Flexbox agar konten di dalamnya ga saling dorong melebihi lebar layar */}
      <div className="p-4 flex-grow flex flex-col justify-between w-full min-w-0">
        <div>
          {/* UBAH 3: Menambahkan "gap-2" agar ada jarak aman antara judul dan tag Movie */}
          {/* "flex justify-between" yang membuat konten di dalamnya rata kanan. */}
          <div className="flex justify-between items-start mb-1 gap-2">
            
            {/* "line-clamp-2" memiliki arti agar judul bisa turun jadi 2 baris */}
            <h3 className="font-bold text-lg line-clamp-2">{series.title}</h3>
            
            {/* UBAH 5: Menambahkan "whitespace-nowrap" agar tulisan "Movie/TV Series" tidak pernah melipat ke bawah */}
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded flex-shrink-0 whitespace-nowrap">
              {series.type}
            </span>
          </div>
          
          {/* "line-clamp-2" memiliki arti agar genrenya bisa turun jadi 2 baris */}
          {/* Sekarang genrenya boleh turun jadi maksimal 2 baris, tidak langsung dipotong jadi 1 baris */}
          <div className="text-sm text-gray-500 mb-2 line-clamp-2">
            {/* penggunaan "&&" untuk mengecek apakah nilai dari series.year dan series.genre ada */}
            {series.year && <span>{series.year} </span>}
            {series.year && series.genre && <span>• </span>}
            {series.genre && <span>{series.genre}</span>}
          </div>
        </div>

        <div className="mt-2"> 
          {/* "mt-2" ini adalah class tailwindcss yang memiliki arti: margin top 0.5rem (sebesar 8px) atau bahasa gampangnya itu adalah jarak 8px dari atas */}
          <div className="flex justify-between items-center text-sm mb-1">
            <span>{series.status}</span>
            {series.type === "TV Series" ? (
              <span className="font-medium text-purple-600 dark:text-purple-400">{progress}%</span>
            ) : (
              series.status === "Completed" && <span className="text-green-600">✓ Selesai</span>
            )}
          </div>
          {series.type === "TV Series" && <ProgressBar progress={progress} />}
        </div>
      </div>
    </div>
  );
}