import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import db from '../models';
import routes from './route';
import Authenticate from '../Middlewares/authenticate';

const app = express();
const router = express.Router();

routes(router, Authenticate);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('common'));
app.use(express.static('client/public'));

app.use(router);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname +'/../../client/index.html'));
});

export default app;
