export interface TopPaintingsResponseInterface {
  id: number;
  title_en: string;
  title_ru: string;
  additional_info_en: string;
  additional_info_ru: string;
  file: string;
  webpack_file: string;
  wallpaper: number;
  artist_id: number;
  subject_id: number;
  rate: number;
  width: number;
  height: number;
  original_file: string;
  watermark_file: string;
  size: {
    width: number;
    height: number;
  };
  artist: {
    id: number;
    name_en: string;
    name_ru: string;
    url: string;
    country: string;
  };
}
