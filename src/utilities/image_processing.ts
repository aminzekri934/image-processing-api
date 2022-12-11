import sharp from 'sharp';
import path from 'path';
//  image resizing function taking a as name, b as height and c as width parameter
function resize(a: string, b: number, c: number): Promise<Buffer> {
  return sharp(path.resolve(`assets/${a}.jpg`))
    .resize({ width: b, height: c, fit: sharp.fit.cover })
    .toBuffer();
}
//creating a path for resized image
function resized(d: string, e: number, f: number): string {
  return `src/thumbnails/${d}${f}x${e}.jpg`;
}
export default { resized, resize };
