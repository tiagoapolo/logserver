'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 


// Constants
const PORT = 8080;
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

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);