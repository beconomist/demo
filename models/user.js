// 基本變數宣告
const mongoose = require('mongoose'); // mongoose 是 nodejs app 和 mongoDB 的介面
const Schema = mongoose.Schema;  // Schema 可以定義資料格式
const bcrypt = require('bcrypt'); // 將使用者輸入的密碼加密後存入資料庫
const SALT_WORK_FACTOR = 12;  // 加密時的計算複雜係數

// 把 mongoose 的 Promise 設定為 Node.js 的 Promise
mongoose.Promise = global.Promise;

// 每一個 schema 都是 mongoDB 裡的一個 collection
const UserSchema = new Schema({
  // 帳號名稱 (使用者名稱)
  username: {
    type: String,
    // required: [true, 'username is required'],
    // index: { unique: true }
  },
  // 帳號密碼
  password: {
    type: String,
    // required: [true, 'password is required']
  },
  // 電子信箱
  email:    {
    type: String,
    // required: [true, 'email is required']
  }
});

// what is pre function?
// UserSchema.pre('save', (next) => {
//   var user = this;
//
//   //
//   if (!user.isModified('password')) return next();
//
//   bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//     if (err) return next(err);
//
//     bcrypt.hash(user.password, salt, function(err, hash) {
//       if (err) return next(err);
//
//       user.password = hash;
//       next();
//     });
//   });
// });

// methos 需要再 mongooes.model()的前面
// 所有的 user instance 都可使用這個方法
// UserSchema.methods.comparePassword = (candidatePassword, cb) => {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//       if (err) return cb(err);
//       cb(null, isMatch);
//     });
// };

//  User Class or User Model: 在 mongoDB 裡以 UserSchema 為 model 建立一個名為 user 的 collection.
const User = mongoose.model('user', UserSchema);

// 輸出給別的檔案使用
module.exports = User;
