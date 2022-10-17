
// Requires "axios" and "form-data" to be installed (see https://www.npmjs.com/package/axios and https://www.npmjs.com/package/form-data)
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

function upFIle(e) {
  console.log(e)
  const inputPath = 'img.png';
  const formData = new FormData();
  formData.append('size', 'auto');
  formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));

  axios({
    method: 'post',
    url: 'https://api.remove.bg/v1.0/removebg',
    data: formData,
    responseType: 'arraybuffer',
    headers: {
      ...formData.getHeaders(),
      'X-Api-Key': 'N5WVQwpJeEZdFgzedNomZqrv',
    },
    encoding: null
  })
    .then((response) => {
      if (response.status != 200) return console.error('Error:', response.status, response.statusText);
      fs.writeFileSync("no-bg.png", response.data);
    })
    .catch((error) => {
      return console.error('Request failed:', error);
    });
}
