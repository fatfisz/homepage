'use strict';

const { graphql } = require('graphql');
const Koa = require('koa');

const getRequestBody = require('./get-request-body');
const getSchema = require('./get-schema');


const maxQueryLength = 1000000;
const schema = getSchema();

function setCORS() {
  this.set({
    'access-control-allow-headers': 'content-type',
    'access-control-allow-origin': 'http://localhost:3000',
  });
}

module.exports = function getApp() {
  const app = new Koa();

  app.context.setCORS = setCORS;

  app.use(async (ctx) => {
    if (ctx.url !== '/') {
      ctx.throw(404);
    }

    switch (ctx.method) {
      case 'POST':
        if (ctx.get('content-type') !== 'application/graphql') {
          ctx.throw(406);
        }

        try {
          const source = await getRequestBody(ctx.req, maxQueryLength);
          const response = await graphql({ schema, source });
          ctx.body = response;
          ctx.setCORS();
        } catch (error) {
          ctx.throw(413, error);
        }
        break;

      case 'OPTIONS':
        ctx.status = 200;
        ctx.setCORS();
        break;

      default:
        ctx.throw(405);
    }
  });

  return app;
};
