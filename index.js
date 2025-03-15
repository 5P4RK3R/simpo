const express = require('express');
var Request = require("request");

const PORT = 3001;
const app = express();

// Allow CORS
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

app.get('/getQuakes/', (req, res) => {
  const {starttime,endtime,minmagnitude,latitude,longitude,maxradiuskm} = req.query;
  Request.get(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&minmagnitude=${minmagnitude}&minmagnitude=1&latitude=${latitude}&longitude=${longitude}&maxradiuskm=${maxradiuskm}`, (error, response, body) => {
    if(error) {
        res.error(error);
    }
    res.send(JSON.parse(body));
});
});

app.listen(PORT, () => {
 console.log(`Server is listening on port: ${PORT}`);
});