/*
 index.js是server app的entry point
 1. 引入app
 2. 讓app監聽指定的埠
*/

const app = require('./app');

// 當 app 在 herokuapp 等平台上執行時 port 是動態變化的，
// 所以 default 用 process.evn.PORT
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening now on port: ${process.env.PORT || 3000}`);
});
