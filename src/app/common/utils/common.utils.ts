import { BrowserNamesEnum } from '@common/enums/browser-names.enum';

export function cleanObject<T>(obj: T): T {
  const cleanObj = {} as T;
  Object.keys(obj).forEach(key => {
    if (obj[key] !== null) {
      cleanObj[key] = obj[key];
    }
  });
  return cleanObj;
}

export function isEmptyObject(obj): boolean {
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      return false;
    }
  }
  return true;
}

export function getBrowser(): BrowserNamesEnum {
  let browser: BrowserNamesEnum;
  if (navigator.userAgent.search(/Safari/) > 0) {
    browser = BrowserNamesEnum.Safari;
  }
  if (navigator.userAgent.search(/Firefox/) > 0) {
    browser = BrowserNamesEnum.MozillaFirefox;
  }
  if (navigator.userAgent.search(/MSIE/) > 0 || navigator.userAgent.search(/NET CLR /) > 0) {
    browser = BrowserNamesEnum.InternetExplorer;
  }
  if (navigator.userAgent.search(/Chrome/) > 0) {
    browser = BrowserNamesEnum.GoogleChrome;
  }
  if (navigator.userAgent.search(/YaBrowser/) > 0) {
    browser = BrowserNamesEnum.YandexBrowser;
  }
  if (navigator.userAgent.search(/OPR/) > 0) {
    browser = BrowserNamesEnum.Opera;
  }
  if (navigator.userAgent.search(/Konqueror/) > 0) {
    browser = BrowserNamesEnum.Konqueror;
  }
  if (navigator.userAgent.search(/Iceweasel/) > 0) {
    browser = BrowserNamesEnum.DebianIceweasel;
  }
  if (navigator.userAgent.search(/SeaMonkey/) > 0) {
    browser = BrowserNamesEnum.SeaMonkey;
  }
  if (navigator.userAgent.search(/Edge/) > 0) {
    browser = BrowserNamesEnum.MicrosoftEdge;
  }

  return browser;
}
