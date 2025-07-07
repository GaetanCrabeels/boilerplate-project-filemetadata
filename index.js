var express = require('express');
var cors = require('cors');
require('dotenv').config()
var app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/* Submit Form */
app.post('/api/fileanalyse', function (req, res) {
  const file = req.files ? req.files.upfile : null;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileName = file.name;
  const fileType = file.mimetype;
  const fileSize = file.size;
  res.json({
    name: fileName,
    type: fileType,
    size: fileSize
  });

});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
