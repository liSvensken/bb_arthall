// import { Injectable } from '@angular/core';
// import { readdirSync } from 'fs';
//
// export interface Size {
//   width: number;
//   height: number;
// }
//
// @Injectable({
//   providedIn: 'root'
// })
// export class ImageToSizeService {
//   private _imageWidth: number;
//   private _imageHeight: number;
//   private _requiredWidth: number;
//   private _requiredHeight: number;
//
//   getSize(imageWidth: number, imageHeight: number, requiredWidth: number, requiredHeight: number): Size {
//     this._imageWidth = imageWidth;
//     this._imageHeight = imageHeight;
//     this._requiredWidth = requiredWidth;
//     this._requiredHeight = requiredHeight;
//
//     switch (true) {
//       case (this._imageWidth > this._requiredWidth):
//         return this.setByRatio();
//
//       case (this._imageWidth <= this._requiredWidth) && (this._imageHeight >= this._requiredHeight):
//         return this.setToRequiredHeight();
//
//       case (this._imageWidth <= this._requiredWidth) && (this._imageHeight <= this._requiredHeight):
//         return this.setByRatio();
//     }
//   }
//
//   private setToRequiredWidth(): Size {
//     return {
//       width: this._requiredWidth,
//       height: this._requiredWidth * this._imageHeight / this._imageWidth
//     };
//   }
//
//   private setToRequiredHeight(): Size {
//     return {
//       width: this._requiredWidth * this._requiredHeight / this._imageHeight,
//       height: this._requiredHeight
//     };
//   }
//
//   private setByRatio(): Size {
//     const ratioWidth = this._imageWidth / this._requiredWidth;
//     const ratioHeight = this._imageHeight / this._requiredHeight;
//     if (ratioWidth > ratioHeight) {
//       return this.setToRequiredWidth();
//     } else {
//       return this.setToRequiredHeight();
//     }
//   }
// }
