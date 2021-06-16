import { NewsTypeResponseEnum } from '@common/enums/news-type-response.enum';

export interface NewListResponseInterface {
  id: string;
  notifiable_id: number;
  notifiable_type: string;
  read_at: string;
  type: string;
  updated_at: string;
  created_at: string;
  data: {
    body: string;
    body_en: string;
    body_ru: string;
    icon: string;
    title: string;
    title_en: string;
    title_ru: string;
    data: {
      additional_type: NewsTypeResponseEnum;
      body: string;
      id: string;
      notification_android_color: string;
      notification_id: string;
      route: string;
      title: string;
      type: string;

      // todo для статей
      preview?: string;
      title_image?: string;

      // todo для художников
      painting_0: string;
      painting_1: string;
      painting_2: string;
      photo: string;
      url: string;
    }
  };
}
