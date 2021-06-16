import { LangEnum } from '@common/enums/lang.enum';
import { OperatingSystemNamesEnum } from '@common/enums/operating-system-names.enum';

export interface UserAuthRequest {
  name?: string;
  email?: string;
  device_name?: OperatingSystemNamesEnum;
  password?: string;
  lang?: LangEnum;
}
