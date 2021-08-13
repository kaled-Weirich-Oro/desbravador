import "regenerator-runtime/runtime";
import express from "express";
import route from './routes/index.js';
import { json } from "body-parser";

const port = 8080;
const app = express();

app.use(json())
app.use(route);
console.log('Routes loaded on ', port);
app.listen(port);