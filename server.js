const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const https = require('https');
const http = require('http');
const app = express();
const freeEntry = require("./free-entry.json");

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json({ limit: "5000mb" })); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "5000mb", parameterLimit: 50000 })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to cricket application." });
});
app.get("/upcoming-matches", (req, res) => {
    const data=[{
        title: "Kuwati Challengers Cup T20" ,
        firstTeam:{
            title:'YSSC',
            short_name:'YSS',
            logo:'https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/FC-YSSC@2x.png'
        },
         secondTeam:{
            title:'Noor CM Academy',
            short_name:'NCA',
            logo:'https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/DEF-CR6@2x.png'
        },
        time:'Today 11:00 pm',
        price:'$18 Lakhs',
        type:'MEGA' 
    },
    {
        title: "Sharjah Hundred League" ,
        firstTeam:{
            title:'Interglobe Marine',
            short_name:'IGM',
            logo:'https://images.entitysport.com/assets/uploads/2022/01/FC-IGM@2x.png'
        },
         secondTeam:{
            title:'Karwan CC',
            short_name:'KWN',
            logo:'https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/FC-KARW@2x.png'
        },
        time:'Tomorrow 11:15 pm',
        price:'$25 Lakhs',
        type:'MEGA' 
    },
    {
        title: "European Cricket League T10" ,
        firstTeam:{
            title:'Byron',
            short_name:'BYR',
            logo:'https://images.entitysport.com/assets/uploads//2023/02/FC-BYR@2x.png'
        },
         secondTeam:{
            title:'TBC',
            short_name:'TBC',
            logo:'https://dnd3y8e5nonx2.cloudfront.net/organisations/avatars/1196/1532731163/display.png'
        },
        time:'12/3/2023 11:15 pm',
        price:'$35 Lakhs', 
    }]
  res.json(data);
});
app.get("/free-entry", (req, res) => {
    res.json(freeEntry);
});
app.get("/free-entry/:id", async (req, res) => {
  let data = freeEntry.filter(x=>x.id == req.params.id)
  data['winnings']=[{rank:"1-50",winnings:"$20"},{rank:"50-100",winnings:"$40"},{rank:"100-150",winnings:"$60"},{rank:"15-200",winnings:"$80"}]
  await res.json({entry:data,winnings:data.winnings});
});



// set port, listen for requests
//const PORT = process.env.PORT || 8080;
var options = {
  // key: fs.readFileSync('./privkey.pem'),
  // cert: fs.readFileSync('./fullchain.pem')
};
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
// Create an HTTP service.
http.createServer(app).listen(3000, () => {
  console.log(`Server is running on port 3000.`);
});
// Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(3002, () => {
//   console.log(`Server is running on port 3002.`);
// });
