import "regenerator-runtime/runtime";
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import importDir from "../utils/importDir";
import routes from "../utils/routes";
import {resolve} from 'path';
import setHeaders from './middlewares/SetHeaders';

const koa = new Koa;
const PORT = 8080

koa.use(setHeaders({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Credentials': true
}));

koa.use(bodyParser());
importDir(resolve(__dirname, 'routes'))
  .then(routes('router'))
  .then(router => koa
    .use(router.routes())
    .use(router.allowedMethods()))
  .then(() => console.log('Routes loaded on port ' + PORT));

koa.listen(PORT);