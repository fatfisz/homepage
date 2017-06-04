'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const next = require('next');


const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get('/blog-color-as-a-background-image', (ctx) => {
    ctx.status = 301;
    ctx.redirect('/blog/color-as-a-background-image');
  });

  server.use(async (ctx, next) => {
    ctx.status = 200;
    await next();
  });

  router.get('/blog/:id', async (ctx) => {
    ctx.respond = false;
    await app.render(ctx.req, ctx.res, '/blog', ctx.params);
  });

  router.get('*', async (ctx) => {
    ctx.respond = false;
    await handle(ctx.req, ctx.res);
  });

  server.use(router.routes());

  server.listen(3000, (error) => {
    if (error) {
      throw error;
    }
    console.log('> Ready on http://localhost:3000');
  });
});
