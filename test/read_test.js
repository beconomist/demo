const assert = require('assert');
const User = require('../src/user');

describe('Reading records', () => {
  let bao;
  
  // 插入一個資料，以進行讀取測試
  beforeEach((done) => {
    bao = new User({
      username: 'Bao Wen Chen',
      password: 'pass1111',
      email: 'becomomist@gmail.com'
    });

    // Async call 需要一點時間，當 promise 回傳時，進行下一個測試 it()
    bao.save()
      .then(() => done());
  });

  // 測試：找到所有 username 是 Bao Wen Chen 的資料
  it('finds all users with a username of Bao Wen Chen', (done) => {

    User.find({ username: 'Bao Wen Chen' })
      .then((users) => {
        // console.log(users);
        done();
      });
  });
});
