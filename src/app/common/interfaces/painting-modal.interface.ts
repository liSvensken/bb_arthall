import { ArtistInterface } from '@common/interfaces/api/artists/artist.interface';

export interface PaintingModalInterface {
  id: number;
  artist: ArtistInterface;
  file: string;
  watermark_file: string;
  title_en: string;
  title_ru: string;
  size: {
    width: number;
    height: number;
  };
}
