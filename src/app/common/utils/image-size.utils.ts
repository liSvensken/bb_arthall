export function relativeSideIsHeight(innerHeight: number, innerWidth: number,
                                     imageHeight: number, imageWidth: number): boolean {
  const differenceHeight = innerHeight / imageHeight;
  const differenceWidth = innerWidth / imageWidth;

  return differenceHeight < differenceWidth;
}
