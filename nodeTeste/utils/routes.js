import Router from 'koa-router';

export default prop => (routes, server = new Router()) => Object
  .values(routes)
  .reduce((server, { [prop]: router }) => server.use(router.routes()), server);
