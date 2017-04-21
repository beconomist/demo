// 測試環境設定
const mongoose = require('mongoose');


before(done => {
  //連結到 mongoDB, 設定資料庫連結位置, 預設 27017 port
  //mongoDB 裡的資料庫可不用預先設好
  mongoose.connect('mongodb://localhost/demo_test');
  // 設定連結的 eventEmitter
  mongoose.connection
    // once open: 監控 db 發出 open 事件 (1次)
    .once('open', () => {
      console.log('Connected to demo_test');
      done()
    })
    // on error: 監控 db 發出 error 事件 (持續)
    .on('error', (err) => {
      console.warn('Warning', err)
    });
  });

// beforeEach 會在每次 npm test 前執行，用來做資料重置
// 所以 DB 的操作都需要時間，所以有 done CB
beforeEach((done) => {
  console.log('清空資料庫：刪除所有使用者資料');
  const { users, posts, comments } = mongoose.connection.collections;

  Promise.all([users.drop(), posts.drop(), comments.drop()])
    .then(() => done())
    .catch(() => done());
});
