import express from 'express';
import image_routes from './routes/api/images';
//import routes from'./routes';
const PORT = 3000;
// create an instance server
const app = express();
app.use(image_routes);
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`);
});
export default app;