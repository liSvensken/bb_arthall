import { NewsTypeI18nEnum } from '@common/enums/news-type-i18n.enum';

export interface NewsModelArtist {
  id: string;
  url: string;
}

export interface NewsModelInterface {
  id: number;
  date: string;
  typeNewsI18n: NewsTypeI18nEnum;
  coverArt: string;
  title: { [key: string]: string };
  preview: string;
  artist?: NewsModelArtist;
  paintingsUrls?: string[];
}
