require('dotenv').config();
import http from 'http';
import debug from 'debug';
import app from './config/express';
import db from './models';

const port = process.env.PORT;

debug('dms:server');

app.set('port', port);

const server = http.createServer(app);

const onListening = () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;

  debug(`Application is listening on port ${bind}`);
}

db.sequelize.authenticate()
  .then(() => {
    server.listen(port);
    server.on('listening', onListening);
    console.log(`Database connection to ${process.env.DATABASE_URL} on ${process.env.NODE_ENV} was successful`);
  })
  .catch(error => {
    console.log('could not connect to database', error);
  })

export default app;