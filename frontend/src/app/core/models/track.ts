export interface Track {
  id?: number;
  title: string;
  artist: string;
  category: string;
  description?: string;
  songUrl?: string;
  file?: File;

  duration?: number;
  dateAdded?: string;
}
