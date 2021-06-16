import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

type Type = 'html' | 'style' | 'script' | 'url' | 'resourceUrl';

@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {
  constructor(private readonly _domSanitizer: DomSanitizer) {
  }

  transform(value: any, type: Type = 'html'): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this._domSanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this._domSanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this._domSanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this._domSanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this._domSanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`Invalid safe type specified: ${ type }`);
    }
  }
}
