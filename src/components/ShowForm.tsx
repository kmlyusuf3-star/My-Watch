import { useState, useRef } from "react";
import type { Series, MediaType, WatchStatus } from "../types/watchlist";

interface ShowFormProps {
  onSubmit: (series: Series) => void;
  onCancel: () => void;
  initialData?: Series; // Digunakan nanti saat kita membuat fitur Edit
}

export function ShowForm({ onSubmit, onCancel, initialData }: ShowFormProps) {
  // Menyimpan data isian dari form
  const [title, setTitle] = useState(initialData?.title || "");
  const [type, setType] = useState<MediaType>(initialData?.type || "Movie");
  const [year, setYear] = useState(initialData?.year?.toString() || "");
  const [genre, setGenre] = useState(initialData?.genre || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState<WatchStatus>(initialData?.status || "Plan to Watch");
  
  // Untuk gambar poster
  const [poster, setPoster] = useState(initialData?.poster || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mengubah gambar menjadi tulisan (Base64) agar bisa disimpan di localStorage
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPoster(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah halaman refresh saat tombol ditekan
    
    // Membungkus data isian ke dalam satu objek
    const newSeries: Series = {
      // Jika edit, pakai ID lama. Jika baru, buat ID unik (crypto.randomUUID)
      id: initialData?.id || crypto.randomUUID(), 
      title,
      type,
      year: year ? parseInt(year) : undefined,
      genre,
      description,
      status,
      poster
    };
    
    // Kirim data ini ke file App.tsx
    onSubmit(newSeries);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
      <div className="flex justify-between items-center mb-6 border-b pb-4 dark:border-gray-700">
        <h2 className="text-xl font-bold">
          {initialData ? "Edit Tontonan" : "Tambah Tontonan Baru"}
        </h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          Batal
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Bagian Poster */}
        <div className="mb-4">
           <label className="block text-sm font-medium mb-1">Poster Tontonan</label>
           <input 
             type="file" 
             accept="image/*"
             ref={fileInputRef}
             onChange={handleImageChange}
             className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 dark:file:bg-gray-700 dark:file:text-gray-300"
           />
           {poster && (
             <img src={poster} alt="Preview Poster" className="mt-2 h-32 object-cover rounded" />
           )}
        </div>
        
        {/* Bagian Judul dan Tipe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Judul *</label>
            <input 
              required
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Jenis *</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as MediaType)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="Movie">Movie</option>
              <option value="TV Series">TV Series</option>
            </select>
          </div>
        </div>

        {/* Bagian Tahun dan Genre */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Tahun Rilis</label>
            <input 
              type="number" 
              value={year} 
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Genre</label>
            <input 
              type="text" 
              value={genre} 
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Contoh: Action, Comedy"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        {/* Bagian Status dan Deskripsi */}
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select 
            value={status} 
            onChange={(e) => setStatus(e.target.value as WatchStatus)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="Plan to Watch">Plan to Watch</option>
            <option value="Watching">Watching</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi Singkat</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="flex justify-end pt-4 border-t dark:border-gray-700 gap-2">
          <button 
            type="button" 
            onClick={onCancel}
            className="px-4 py-2 border rounded text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Batal
          </button>
          <button 
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
}