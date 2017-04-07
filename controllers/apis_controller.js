const meetup = require('meetup-api')({
  // meetup.com api key
  key: '5c5c4e33c47164782d7b474a334830'
});

module.exports = {

  // 首頁
  greeting(req, res) {
    res.sendfile('index.html', { root: __dirname });
  },

  // Meetup List Component
  getMeetups(req, res, next) {

    meetup.getEvents({
      member_id: 'self'}, (err, events) => {
        if (err) next();
        // events有三個properties: results, meta, ratelimit
        const eventsArray = events.results.map((result) => {
          return result['name'];
        });

        const listItemsHTML = eventsArray.map((event) => {
          return '<li>' + event + '</li>';
        }).join('');

        const html = '<ol>' + listItemsHTML + '</ol>';

        res.send(html);
      });
    },



}
