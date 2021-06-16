import { LangEnum } from '@common/enums/lang.enum';

export interface UserUpdateResponse {
  user: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    fcm_token: string;
    remember_token: string;
    created_at: string;
    updated_at: string;
    lang: LangEnum;
  };
}
