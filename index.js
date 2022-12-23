const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));

// Set the directory where you want to save the images
const IMAGE_DIRECTORY = './images/';
const files = fs.readdirSync(IMAGE_DIRECTORY);

let imageCounter = files.length;
console.log(imageCounter);

app.get('/api/upload-image', (req, res) => {
    res.status(404).send({ message: 'bruh' });
  });

app.post('/api/upload-image', (req, res) => {
  // Check if the request body has a "image" field
  if (!req.body.image) {
    return res.status(400).send({ message: 'Invalid request: missing "image" field' });
  }

  // Increment the image counter
  imageCounter++;

  // Save the image to a file with the auto-incrementing file name
  const imageBuffer = Buffer.from(req.body.image, 'base64');
  fs.writeFileSync(`${IMAGE_DIRECTORY}image-${imageCounter}.jpg`, imageBuffer);
  let returnFileName = `image-${imageCounter}.jpg`


  return res.send(
    {
        message: 'okie',
        filename: returnFileName
    }
    );
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
