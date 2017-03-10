require('babel-register');
var express = require('express');
var app = express();
var http = require('http');
var fs = require('fs');
var path = require('path');
var jquery = require('jquery');
var meetup = require('meetup-api')({
  key: '5c5c4e33c47164782d7b474a334830'
});

// 首頁
app.get('/', function(req, res) {
  res.sendFile('./public/index.html', { root: __dirname });
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
  //
});


// 未設定這個，index.html就無法讀到jQuery library
app.use(express.static('public'));

app.get('/posts', function(req, res) {
  res.sendFile('./db/blogPosts.json', {  root:__dirname });
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server listening now');
});
