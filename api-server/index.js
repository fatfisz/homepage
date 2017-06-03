'use strict';

const getApp = require('./get-app');


const app = getApp();

app.listen(process.env.DATA_SERVER_PORT || 4000);
