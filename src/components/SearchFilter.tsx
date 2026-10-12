import type { MediaType, WatchStatus } from "../types/watchlist";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  typeFilter: MediaType | "All";
  onTypeFilterChange: (type: MediaType | "All") => void;
  statusFilter: WatchStatus | "All";
  onStatusFilterChange: (status: WatchStatus | "All") => void;
}

export function SearchFilter({
  searchQuery, onSearchChange,
  typeFilter, onTypeFilterChange,
  statusFilter, onStatusFilterChange
}: SearchFilterProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border dark:border-gray-700">
      
      {/* KOTAK INPUT (Pencarian) */}
      <div className="flex-grow">
        <Input
          type="text"
          placeholder="Cari judul tontonan..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          // CERAH & MATCHING: Teks abu-terang, background sedikit lebih terang, border ungu tipis saat fokus
          className="w-full bg-gray-100 dark:bg-gray-100 border-gray-300 dark:border-gray-300 text-black dark:text-black placeholder:text-gray-500 dark:placeholder:text-gray-500 focus-visible:ring-purple-500"  
        />
      </div>

      {/* KOTAK PILIHAN (Filter Tipe) */}
      <div className="w-full md:w-48">
        <Select 
          value={typeFilter} 
          onValueChange={(value) => onTypeFilterChange(value as MediaType | "All")}
        >
          <SelectTrigger className="bg-slate-50 dark:bg-slate-800/90 border-slate-200 dark:border-purple-900/40 text-slate-800 dark:text-slate-100 focus:ring-purple-500">
            <SelectValue placeholder="Pilih Jenis" />
          </SelectTrigger>
          {/* dropdown box yang lebih hidup dengan border ungu & bayangan */}
          <SelectContent className="bg-white dark:bg-[#1e293b] border-purple-200/50 dark:border-purple-800/40 text-slate-800 dark:text-slate-100 shadow-xl z-50">
            <SelectItem value="All" className="hover:bg-purple-50 dark:hover:bg-purple-950/40 focus:bg-purple-50 dark:focus:bg-purple-950/40 cursor-pointer">
              Semua Jenis
            </SelectItem>
            <SelectItem value="Movie" className="hover:bg-purple-50 dark:hover:bg-purple-950/40 focus:bg-purple-50 dark:focus:bg-purple-950/40 cursor-pointer">
              Movie
            </SelectItem>
            <SelectItem value="TV Series" className="hover:bg-purple-50 dark:hover:bg-purple-950/40 focus:bg-purple-50 dark:focus:bg-purple-950/40 cursor-pointer">
              TV Series
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KOTAK PILIHAN (Filter Status) */}
      <div className="w-full md:w-48">
        <Select 
          value={statusFilter} 
          onValueChange={(value) => onStatusFilterChange(value as WatchStatus | "All")}
        >
          <SelectTrigger className="bg-slate-50 dark:bg-slate-800/90 border-slate-200 dark:border-purple-900/40 text-slate-800 dark:text-slate-100 focus:ring-purple-500">
            <SelectValue placeholder="Pilih Status" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-[#1e293b] border-purple-200/50 dark:border-purple-800/40 text-slate-800 dark:text-slate-100 shadow-xl z-50">
            <SelectItem value="All" className="hover:bg-purple-50 dark:hover:bg-purple-950/40 focus:bg-purple-50 dark:focus:bg-purple-950/40 cursor-pointer">
              Semua Status
            </SelectItem>
            <SelectItem value="Plan to Watch" className="hover:bg-purple-50 dark:hover:bg-purple-950/40 focus:bg-purple-50 dark:focus:bg-purple-950/40 cursor-pointer">
              Plan to Watch
            </SelectItem>
            <SelectItem value="Watching" className="hover:bg-purple-50 dark:hover:bg-purple-950/40 focus:bg-purple-50 dark:focus:bg-purple-950/40 cursor-pointer">
              Watching
            </SelectItem>
            <SelectItem value="Completed" className="hover:bg-purple-50 dark:hover:bg-purple-950/40 focus:bg-purple-50 dark:focus:bg-purple-950/40 cursor-pointer">
              Completed
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      
    </div>
  );
}