export interface PaintingInterface {
  id: number;
  artist_id: number;
  title_en: string;
  title_ru: string;
  file: string;
  webpack_file: string;
  width: number;
  height: number;
  original_file: string;
  watermark_file: string;
  size: {
    width: number;
    height: number;
  };
}
