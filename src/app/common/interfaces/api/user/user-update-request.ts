import { LangEnum } from '@common/enums/lang.enum';
import { OperatingSystemNamesEnum } from '@common/enums/operating-system-names.enum';

export interface UserUpdateRequest {
  fcm_token?: string;
  device_name?: OperatingSystemNamesEnum;
  lang?: LangEnum;
}
