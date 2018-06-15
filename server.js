const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer  = require('multer');
const upload = multer().single('file');

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); // support json encoded bodies


app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }

    if (req.file) {
      res.send('Upload received');
      console.log(req.file);
    }
  });
});

// start the server
  app.listen(port);
  console.log('Server started! At http://localhost:' + port);
  