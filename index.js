
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const morgan = require('morgan');
const cors = require('cors');
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

app.get('/platforms', db.getPlatforms);
app.get('/platform/:id_platform', db.getPlatformById);
app.post('/platform', db.createPlatform);
app.put('/platform', db.updatePlatform);  