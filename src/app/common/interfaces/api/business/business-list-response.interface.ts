interface BusinessItemWithLang {
  title: string;
  youtube: string;
  mp4: string;
  mov: string;
  logo: string;
}

export interface BusinessListResponseInterface {
  en: BusinessItemWithLang[];
  ru: BusinessItemWithLang[];
}
