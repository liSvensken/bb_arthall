import { ArtistInterface } from '@common/interfaces/api/artists/artist.interface';

export interface ItemTopListInterface {
  artist?: ArtistInterface;
  name_en?: string,
  name_ru?: string,
  paintingId?: number;
  title_ru?: string;
  title_en?: string;
  rate: number;
  url: string;
  file: string;
  webpack_file?: string;
  watermark_file?: string;
  size?: {
    width: number;
    height: number;
  };
}

export interface ItemTopListModel {
  number: number;
  item: ItemTopListInterface;
}
