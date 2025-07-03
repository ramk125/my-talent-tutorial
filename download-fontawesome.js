const https = require('https');
const fs = require('fs');
const path = require('path');

const fontAwesomeUrl = 'https://use.fontawesome.com/releases/v6.7.2/fontawesome-free-6.7.2-web.zip';
const outputPath = path.join(__dirname, 'fontawesome-free-6.7.2-web.zip');

const file = fs.createWriteStream(outputPath);
https.get(fontAwesomeUrl, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log('Font Awesome downloaded successfully');
  });
}); 