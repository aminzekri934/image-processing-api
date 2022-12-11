import {Router, Request, Response} from 'express';
import path from 'path';
import sharp from 'sharp';
import  fs from 'fs';
import images from '../../utilities/image_data';
import { promises as fsPromises } from 'fs';
//the list of available images name
const image_routes = Router();
let list:string = "";
for (let i = 0;i < images.length;i++) {
  list = list + " " + images[i];
};
// creating a get endpoint
image_routes.get('/', async (req:Request, res:Response)=>{
 //  image resizing function taking a as name, b as height and c as width parameter
  function resize(a: string, b: number, c: number): Promise<Buffer>  {
   return sharp(path.resolve(`assets/${a}.jpg`))
    .resize({width: b, height:c, fit: sharp.fit.cover}).toBuffer();
  };
//creating a path for resized image
function resized(d: string, e: number, f: number): string  {
  return `src/thumbnails/${d}${f}x${e}.jpg`;
};
//global scope for the get endpoint
//declaring variables 
 const title = req.query.name as string;
 const h = parseInt(req.query.height as unknown as string);
 const w = parseInt(req.query.width as unknown as string);
 const image = images.includes(title);
 const imglocation:string = resized(title, w, h);
 // if the name query was not provided end the function
 if (title === undefined) {
  return res.status(200).send(`welcome to image processing api , query parameter image name is required here is our images ${list}`);
 }
 // if the image name does not exist return an error and end the function
 if (image === false) {
  return res.status(404).send('error,image  is not found');
 }
 //if the image name is valid send the location
 try {
 
  if (!fs.existsSync(imglocation)) {
      const img = await resize (title, w, h);
      await fsPromises.writeFile(imglocation, img);
    }
    res.sendFile(path.resolve(imglocation));
  } catch (error ) {
    let message;
    if (error instanceof Error) {
       message = error.message;
    }
    else {
      message = String(error);
    }
  // we'll proceed, but let's report it
  res.send(message);
}
});
export default image_routes; 
