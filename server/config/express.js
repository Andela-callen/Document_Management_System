import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import db from '../models';
import router from './route';

require('dotenv').config();

const port = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('common'));
app.use(express.static('client/public'));

app.use(router);

app.get('/', (req, res) => {
  // res.sendFile(path.join(`${__dirname}`));
  res.sendFile(path.join(__dirname +'/../../client/index.html'));
});

export default app;


// import path from 'path';

// import express from 'express';
// import parser from 'body-parser';
// import logger from 'morgan';
// import routes from './routes/index';

// const app = express();

// app.use(parser.urlencoded({ extended: true }));
// app.use(parser.json());
// app.use(logger('dev'));
// app.use(express.static(path.resolve('client', 'public')));

// // Mount routes
// routes(app);

// export default app;