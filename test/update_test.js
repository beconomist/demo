const assert = require('assert');
const User = require('../src/user');

describe('Updateing a user: ', () => {
  let bao;

  beforeEach((done) => {
    bao = new User({
      username: 'Bao Wen Chen',
      password: 'pass1111',
      email: 'beconomist@gmail.com'
    });

    bao.save()
      .then(() => done());

  });

  // 用 set 和 save
  it('instance type using set and save', (done) => {
    console.log(bao); // 更新前
    bao.set('password', 'pass1234');
    console.log(bao); // 更新後

    bao.save()  // 更新後還是要存入資料庫
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].password === 'pass1234');
        done();
      });
  });

  // 用 update()
  it('A model instance can update', () => {
    bao.update({ password: 'pass1111'})
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].password === 'pass1234');
        done();
    });
  });

});
