import { PaintingInterface } from '@common/interfaces/api/paintings/painting.interface';
import { ArtistInterface } from '@common/interfaces/api/artists/artist.interface';

export interface ArtistResponse extends ArtistInterface {
  about_en: string;
  about_ru: string;
  photo: string;
  paintings: PaintingInterface[];
  attitude: any[];
}
