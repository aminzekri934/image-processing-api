import resize from '../../utilities/image_processing';
import resized from '../../utilities/image_processing';
import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import images from '../../utilities/image_data';
import { promises as fsPromises } from 'fs';
//the list of available images name
const image_routes: Router = Router();
let list: string = '';
for (let i = 0; i < images.length; i++) {
  list = list + ' ' + images[i];
}
// creating a get endpoint
image_routes.get(
  '/',
  async (req: Request, res: Response): Promise<Response | undefined> => {
    //declaring variables
    const title = req.query.name as string;
    const h = parseInt(req.query.height as unknown as string);
    const w = parseInt(req.query.width as unknown as string);
    const image = images.includes(title);
    const imglocation: string = resized.resized(title, w, h);
    // if the name query was not provided end the function
    if (title === undefined) {
      return res
        .status(200)
        .send(
          `welcome to image processing api , query parameter image name is required here is our images ${list}`
        );
    }
    // if the image name does not exist return an error and end the function
    if (image === false) {
      return res.status(404).send('error,image  is not found');
    }
    if (
      image === true &&
      !(`${h}` === req.query.height) &&
      `${w}` == req.query.width
    ) {
      return res.status(404).send('error, enter a valid height');
    }
    if (
      !(`${w}` == req.query.width) &&
      image === true &&
      `${h}` === req.query.height
    ) {
      return res.status(404).send('error, enter a valid width ');
    }
    if (
      !(`${w}` == req.query.width) &&
      image === true &&
      !(`${h}` === req.query.height)
    ) {
      return res
        .status(404)
        .send('error, enter a valid width and valid height');
    }
    //if the image name is valid send the location
    try {
      if (!fs.existsSync(imglocation)) {
        const img = await resize.resize(title, w, h);
        await fsPromises.writeFile(imglocation, img);
      }
      res.sendFile(path.resolve(imglocation));
    } catch (error) {
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = String(error);
      }
      // we'll proceed, but let's report it
      res.status(404).send(message);
    }
  }
);
export default image_routes;
