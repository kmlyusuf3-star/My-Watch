import { useState } from "react"; // kegunaan "import { useState } from "react";" disini adalah untuk
//  mengimpor fungsi useState dari library React, yang digunakan untuk membuat state di dalam komponen fungsional.
// State ini memungkinkan kita untuk menyimpan dan mengelola data yang dapat berubah seiring waktu,
// seperti nilai inputan form. dan "import { useState } from "react";" ini adalah bentuk implementasi dari React Hooks,
// yang merupakan fitur baru di React yang memungkinkan kita menggunakan state dan fitur lainnya tanpa harus membuat class component.
import type { Episode } from "../types/watchlist";
// "import type { Episode } from "../types/watchlist";" disini adalah implementasi dari TypeScript,
// yang digunakan untuk mengimpor tipe data Episode dari file watchlist.ts di folder types.
// dan kenapa pada "import type { Episode }......" menggunakan kata kunci "type" adalah karena kita
// hanya mengimpor tipe data, bukan nilai atau fungsi.

interface EpisodeFormProps {
  seriesId: string;
  onSubmit: (episode: Episode) => void;
  onCancel: () => void;
  initialData?: Episode; 
}
// "interface EpisodeFormProps" disini adalah implementasi dari TypeScript,
// yang digunakan untuk mendefinisikan tipe data untuk props yang diterima oleh komponen EpisodeForm.
// dan kenapa pada "interface EpisodeFormProps" menggunakan kata kunci "interface" adalah karena kita.
// efeknya pada tampilan web adalah jika kita mengedit episode, maka form akan menampilkan data lama dari episode tersebut,
// dan jika kita menambah episode baru, maka form akan menampilkan inputan kosong. dan juga jika kita mengisi form dengan data yang tidak sesuai tipe data,
// maka akan muncul error di console dengan bentuk pesan error sepeti "Type 'string' is not assignable to type 'number'", 
// sehingga kita bisa memperbaikinya sebelum mengirim data ke server.

export function EpisodeForm({ seriesId, onSubmit, onCancel, initialData }: EpisodeFormProps) {
  // Jika sedang menambah baru, defaultnya "1". Jika mengedit, ikuti data lama.
  const [season, setSeason] = useState(initialData?.season?.toString() || "1");
  // disini meggunakan "usestate" untuk menyimpan state dari form inputan,
  // dan disini "season" adalah state untuk menyimpan nilai season dari episode yang akan ditambahkan atau diedit.
  // intinya agar tidak berubah saat me-refresh halaman, dan juga agar bisa diubah-ubah saat kita mengetik di form inputan.
  const [episodeNumber, setEpisodeNumber] = useState(initialData?.episodeNumber.toString() || "");
  const [title, setTitle] = useState(initialData?.title || "");
  const [platform, setPlatform] = useState(initialData?.platform || "");
  const [watched, setWatched] = useState(initialData?.watched || false);

  const handleSubmit = (e: React.FormEvent) => {
    // disini "handleSubmit" adalah fungsi yang akan dipanggil ketika form disubmit, dan disini "e" adalah event dari form submit.
    e.preventDefault();
    const newEpisode: Episode = {
      id: initialData?.id || crypto.randomUUID(),
      seriesId,
      // Kita ubah teks season dari form menjadi angka beneran menggunakan parseInt
      season: parseInt(season), 
      episodeNumber: parseInt(episodeNumber),
      title,
      platform,
      watched,
    };
    onSubmit(newEpisode);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700 max-w-lg mx-auto mt-8">
      <h2 className="text-xl font-bold mb-6 border-b pb-4 dark:border-gray-700">
        {initialData ? "Edit Episode" : "Tambah Episode Baru"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* {pada <div> dibawah ini adalah container untuk input Season, No. Eps, dan Platform yang berisi 
        kode yang mengimplementasikan penggunaan tailwind CSS contohnya seperti penggunaan 
        class "grid grid-cols-3 gap-4" dan class "dark:bg-gray-700" dan yang lainya} */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Season *</label>
            <input required type="number" min="1" value={season} onChange={(e) => setSeason(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-purple-500" />
          </div>
          {/* pada <div> dibawah ini adalah container untuk input No. Eps */}
          <div>
            <label className="block text-sm font-medium mb-1">No. Eps *</label>
            <input required type="number" min="1" value={episodeNumber} onChange={(e) => setEpisodeNumber(e.target.value)} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-purple-500" />
          </div>
          {/* pada <div> dibawah ini adalah container untuk input Platform */}
          <div>
            <label className="block text-sm font-medium mb-1">Platform</label>
            <input type="text" value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="Netflix" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-purple-500" />
          </div>
        </div>
          {/* pada <div> dibawah ini adalah container untuk input Judul Episode */}
        <div>
          <label className="block text-sm font-medium mb-1">Judul Episode *</label>
          <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Misal: Perjalanan Dimulai" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-purple-500" />
        </div>
        {/* pada <div> dibawah ini adalah container untuk checkbox Tandai sudah ditonton
        juga ada penggunaan <input yang digunakan untuk membuat checkbox */}
        <div className="flex items-center gap-2 mt-4 bg-purple-50 dark:bg-purple-900/20 p-3 rounded border border-purple-100 dark:border-purple-800/30">
          <input type="checkbox" checked={watched} onChange={(e) => setWatched(e.target.checked)} id="watched-check" className="w-4 h-4 accent-purple-600 cursor-pointer" />
          <label htmlFor="watched-check" className="text-sm font-medium cursor-pointer">Tandai sudah ditonton</label>
          {/* penggunaan <label> untuk membuat label yang terhubung dengan checkbox, dan htmlfor disini
          kegunaanya untuk menghubungkan label dengan input */}
        </div>
        
        {/* pada <div> dibawah ini adalah container untuk tombol Simpan dan Batal.
         */}
        <div className="flex justify-end gap-2 pt-4 mt-6">
          <button type="button" onClick={onCancel} className="px-4 py-2 border rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Batal</button>
          <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
            {initialData ? "Simpan Perubahan" : "Simpan Episode"}
          </button>
        </div>
      </form>
    </div>
  );
}