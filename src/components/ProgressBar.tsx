export function ProgressBar({ progress }: { progress: number }) {
  // dari mana ProgressBar ini berasal? ProgressBar ini adalah komponen yang digunakan untuk menampilkan progress bar pada halaman detail series.
  // dan disini "progress" adalah persentase progress menonton series, yang dihitung dari jumlah episode yang sudah ditonton dibagi dengan jumlah total episode.
  // dan juga ini adalah bentuk implementasi tsx, dan disinpnni "progress" adalah persentase progress menonton series, yang dihitung dari jumlah episode yang sudah ditonton dibagi dengan jumlah total episode.
  // darimana origin asli dari Progressbar yang dipanggil dengan function ProgressBar ini? ProgressBar ini berasal dari file src/components/ProgressBar.tsx, yang merupakan komponen yang digunakan untuk menampilkan progress bar pada halaman detail series.
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
      <div 
        className="bg-purple-600 h-2.5 rounded-full" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}