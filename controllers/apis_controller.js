const meetup = require('meetup-api')({
  // meetup.com api key
  key: '5c5c4e33c47164782d7b474a334830'
});

module.exports = {

  // Meetup List Component
  getMeetups(req, res, next) {

    meetup.getEvents({
      member_id: 'self'}, (err, events) => {
        let html;

        if (err) next();
        // events有三個properties: results, meta, ratelimit
        if (events === null) {
          html = '目前無法讀到meetup活動！'
        } else {
          const eventsArray = events.results.map((result) => {
            return result['name'];
          const listItemsHTML = eventsArray.map((event) => {
            return '<li>' + event + '</li>';
          }).join('');

          html = '<ol>' + listItemsHTML + '</ol>';
          });
        }

        res.send(html);
      });
    },



}
