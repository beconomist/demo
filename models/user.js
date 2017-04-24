// 基本變數宣告
// mongoose 是 nodejs app 和 mongoDB 的介面
const mongoose = require('mongoose');
// Schema 可以定義資料格式
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt'); // 將使用者輸入的密碼加密後存入資料庫
const SALT_WORK_FACTOR = 12;  // 加密時的計算複雜係數

// 把 mongoose 的 Promise 設定為 Node.js 的 Promise
mongoose.Promise = global.Promise;

// 每一個 schema 都是 mongoDB 裡的一個 collection
const UserSchema = new Schema({
  // 帳號名稱 (使用者名稱)
  name: {
    type: String,
    validate: {
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'name is required'],
  },
  // 帳號密碼
  password: {
    type: String,
    required: [true, 'password is required']
  },
  // 電子信箱
  email:    {
    type: String,
    required: [true, 'email is required']
  },

  // 部落格文章ID連結
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'post'
  }]
});

/**
 * 使用者密碼加密
 */
UserSchema.pre('save', function(next) {
  var user = this;

  // 如果密碼是新的或被修改了，hash密碼
  if (!user.isModified('password')) return next();

  // 生成一個salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // 用salt把密碼加密
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // 把使用者輸入的密碼換成hashed後的密碼
      user.password = hash;

      // 把控制權丟還給controller
      next();
    });
  });
});

// Methods 需要在 mongooes.model()的前面
// 所有的 user instance 都可使用這個方法
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
    });
};

//  User Class or User Model: 在 mongoDB 裡以 UserSchema 為 model 建立一個名為 user 的 collection.
const User = mongoose.model('user', UserSchema);

// 輸出給別的檔案使用
module.exports = User;
