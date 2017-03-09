let express = require('express');
let bodyParser = require ('body-parser');
let morgan = require('morgan');
let router = require('./server/route');
const PORT = 4000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('common'));

app.use(router);

app.listen(PORT, () => console.log("listening on port " + PORT));

