import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import db from '../models';
import routes from './route';
import webpack from 'webpack';
import Authenticate from '../Middlewares/authenticate';

const webpackConfig = require('../../webpack.config');
const compiler = webpack(webpackConfig);

const app = express();
const router = express.Router();

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
app.use(require("webpack-hot-middleware")(compiler));


routes(router, Authenticate);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('common'));
app.use(express.static('client/public'));

app.use('/api/', router);

app.get('*', (req, res) => {
  return res.sendFile(path.join(__dirname +'/../../client/index.html'));
});

export default app;
