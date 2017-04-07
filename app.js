/*
 app.js是server app的設定檔
 1. express設定
 2. 連結mongoDB
 3. 設定各種 Router、錯誤處理等middlewares
*/

// 寫ES6語法需用到 babel
require('babel-register');
const express = require('express');
const routes = require('./routes/routes');
const app = express();
const bodyParser = require('body-parser');
let numberOfRequest = 0;
const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

if(process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/demo');
  const db = mongoose.connection;
  db.once('open', () => {
    console.log('Connected to demo');
  });
}

// 假設每個req.body都是json格式把他parse成object
app.use(bodyParser.json());

// 這個 middleware 會紀錄所有 request 的次數、時間、url和 method，
// 但是沒有 end the request-response cycle，所以要 call next
app.use(function(req, res, next){
  console.log('Server is requested: ' + (++numberOfRequest) + ' time(s)');
  console.log('Requested time: %d', Date.now());
  console.log('Request URL: ' , req.originalUrl);
  console.log('Request Type: ' , req.method);
  console.log('---');
  // Call next()，將 control 交給下一個 middleware
  next();
});

// 設定 static resources 的檔案夾
// express 會直接從 public 檔案夾 load，所以 public 並不會成為 URL 的一部分
app.use(express.static('public'));

// Router middleware
routes(app);

// 錯誤處理 middleware
app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
