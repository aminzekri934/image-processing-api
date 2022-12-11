# image processing Api
# Script:
Build: npm run build
Lint: npm run lint
Prettier: npm run prettify
Run unit tests: npm run test
Start server: npm run start
# Usage:
The server will listen on port 3000:
Endpoint to resize image: http://localhost:3000/
Expected query arguments are:

name: Available filenames are:
sun
tree
mountain
width: numerical pixel value > 0
height: numerical pixel value > 0

# Development:
developed by Amine Zekri as a project in the udacity Back end web developer track.
# Notes:
images are surved from 'assets/'
resized images will be stored in the thumbnails 'src/thumbnails'
