// Test environment setup
const mongoose = require('mongoose');


before((done) => {
  //連結到 mongoDB, 設定資料庫連結位置, 預設 27017 port
  //mongoDB 裡的資料庫可不用預先設好
  mongoose.connect('mongodb://localhost/anotherDB');
  // 設定連結的 eventEmitter
  const db = mongoose.connection;
  // once open: 監控 db 發出 open 事件 (1次)
  db.once('open', () => done());
  // on error: 監控 db 發出 error 事件 (持續)
  db.on('error', (err) => console.warn('Warning', err));
});


// beforeEach 會在每次 npm test 前執行，用來做資料重置
// 所以 DB 的操作都需要時間，所以有 done CB
beforeEach((done) => {
  // 清空資料庫：刪除所有使用者資料
  mongoose.connection.collections.users.drop(() => {
    // 確定清除完後，執行 done() 並接下一個測試
    done();
  });
});
