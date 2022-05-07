// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", (req, res) => {
  const date = req.params.date;

  if (date === undefined) {
    res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
  } else if (date && date.split("-")[1] && new Date(date)!='Invalid Date') {
    let dateObj = new Date(date);
    if(dateObj.getTime()) {      
    res.json({ unix: dateObj.getTime(), utc: dateObj.toUTCString() });
    } else {
      res.json({ error: "Invalid Date" });
    }
  } else if (new Date(+date)!='Invalid Date' && !isNaN(date)) {
    let dateObj = new Date(Number(date));
    res.json({ unix: +date, utc: dateObj.toUTCString() });
  } else if (new Date(date) != "Invalid Date") {
    let dateObj = new Date(date);
    res.json({ unix: dateObj.getTime(), utc: dateObj.toUTCString() });
  } 
  else {
    res.json({ error: "Invalid Date" });
  }
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

