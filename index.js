// 寫ES6語法需用到 babel
require('babel-register');
const express = require('express');
const app = express();
const meetup = require('meetup-api')({
  // meetup.com api key
  key: '5c5c4e33c47164782d7b474a334830'
});
let numberOfRequest = 0;
const router = express.Router();

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

// 首頁
app.get('/', function(req, res, next) {
    // example middleware: something to do here
    console.log('middleware 1');
    next();
  }, function(req, res, next) {
    // example middleware: something to do here
    console.log('middleware 2');
    next();
  }, function(req, res) {
    res.sendFile('index.html', { root: __dirname });
    console.log('---');
  });

// 取得附近 meetups
app.get('/meetups', function(req, res) {

  meetup.getEvents({ member_id: 'self' }, (err, events) => {
    // events has 3 properties: results, meta, ratelimit
    // console.log(events.results);
    const eventsArray = events.results.map(function(result) {
        return result['name'];
    });

    const listItemsHTML = eventsArray.map((event) => {
      return '<li>' + event + '</li>';
    }).join('');

    const html = '<ol>' + listItemsHTML + '</ol>';

    res.send(html);

  });

});

app.get('/posts', function(req, res) {
  res.sendFile('./db/blogPosts.json', {  root:__dirname });
});

router.get('/', function(req, res, next) {
  console.log('do something');
  next();
});

app.use('/admin', router, function(req, res) {
  res.sendStatus(401);
});

// 當 app 在 herokuapp 等平台上執行時 port 是動態變化的，
// 所以 default 用 process.evn.PORT
app.listen(process.env.PORT || 3000, function() {
  console.log('Server listening now' );
});
