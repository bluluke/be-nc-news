const express = require("express");
const app = express();


const { getTopics } = require('./controllers/topicsController');
const { getEndpoints } = require('./controllers/endpointsController');

app.get("/api/topics/", getTopics);

// app.get("/api", (req, res) => {
//     res.status(200).send(endpointsData);
// });

app.get("/api", getEndpoints);


module.exports = app; 