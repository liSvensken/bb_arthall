import { RatingEnum } from '@common/enums/rating.enum';
import { ArtistInterface } from '@common/interfaces/api/artists/artist.interface';

export interface PaintingResponse {
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
  artist: ArtistInterface;
  viewed?: [{ rate: RatingEnum }];
}
