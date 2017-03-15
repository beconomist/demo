// Test for creating data
const assert = require('assert');
const User = require('../src/user');


describe('Creating records', () => {
  it('save a user', () => {

    // 宣告一個測試資料 (document)
    const bao = new User({
      username: 'Bao Wen Chen',
      password: 'pass1111',
      email: 'becomomist@gmail.com'
    });

    bao.save((err) => {
      if (err) {
        console.warn(err);
      } else {
        console.log('bao is saved');
      }
    });

    // 將測試資料存入資料庫
    // testUser.save((err) => {
    //   if (err) throw err;
    //
    //   User.findOne({ username: 'Bao Wen Chen' }, (err, user) => {
    //     if (err) throw err;
    //
    //     //測試一組正確的密碼
    //     testUser.comparePassword('pass1111', (err, isMatch) => {
    //       if (err) throw err;
    //       console.log('pass1111: ', isMatch);
    //     });
    //
    //     // 測試一組錯誤的密碼
    //     testUser.comparePassword('pass1234', (err, isMatch) => {
    //       if (err) throw err;
    //       console.log('pass1234: ', isMatch);
    //     });
    //   });
    // });
  });
});
