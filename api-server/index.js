'use strict';

const getApp = require('./get-app');


const port = process.env.API_SERVER_PORT || 4000;
const app = getApp();

app.listen(port);

console.log(`> Ready on http://localhost:${port}`);
