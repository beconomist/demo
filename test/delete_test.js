const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user: ', () => {

    let bao;

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

    // 用 Class 方法透過屬性找到資料
    it('class method findOneAndRemove', (done) => {
      User.findOneAndRemove({ username: 'Bao Wen Chen' })
        .then(() => User.findOne( { username: 'Bao Wen Chen' }))
        .then((user) => {
          assert(user === null);
          done();
        });
    });
});
