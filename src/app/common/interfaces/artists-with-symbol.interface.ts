import { ArtistReducedResponseInterface } from '@common/interfaces/api/artists/artist-reduced.response.interface';

export interface ArtistsWithSymbol {
  symbol: string;
  list: ArtistReducedResponseInterface[];
}
