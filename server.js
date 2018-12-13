'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs'), path = require('path');


const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


// Constants
const PORT = process.argv[2] === '-p' ? process.argv[3] ? process.argv[3] : Error('Missing PORT Parameter!!!') : 8888
const HOST = '0.0.0.0';

// App
app.post('/logs', (req, res) => {
  console.log(req.body)
  fs.writeFile("witbee-"+(new Date().toISOString())+'.json', JSON.stringify(req.body), function(err) {
    if(err) {
      console.log(err);
      return 
    } 

    res.send(req.body)
    
  })  
  
});

app.get('/logs', (req, res) => {
  fs.readdir('./', (err, files) => {
    res.send(files.filter((file) => file.indexOf('witbee')>=0))
  })
})

app.get('/logs/:filename', (req, res) => {
  fs.readdir('./', (err, files) => {
    if(err) {
      console.log(err)
      res.send('Nothing found')
      return
      
    } else {

      if(files.filter((file) => file.indexOf(req.params.filename)>=0).length){
        let filePath = path.join(__dirname, req.params.filename);
        res.download(filePath)
      } else {
        res.send('File is not permitted or not found')
        return
      }
    
    }

  })
})

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);