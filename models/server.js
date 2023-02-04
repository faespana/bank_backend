const express = require('express');
const cors = require('cors');
const { UserRouter } = require('../routes/users.routes');
const { TransferRouter } = require('../routes/transfers.routes');
const { db } = require('../database/db');
const morgan = require('morgan');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 1000;
    this.paths = {
      users: '/api/v1/users',
      transfers: '/api/v1/transfers',
    };

    this.database();

    this.middlewares();

    this.routes();
  }

  middlewares() {
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.users, UserRouter);
    this.app.use(this.paths.transfers, TransferRouter);
  }

  database() {
    db.authenticate()
      .then(() => console.log('Database authenticated'))
      .catch(error => console.log(error));

    db.sync()
      .then(() => console.log('Database synced'))
      .catch(error => console.log(error));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
