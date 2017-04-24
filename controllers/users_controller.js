const User = require('../models/user');


// Response handlers
module.exports = {

  // Create user route: passing!
  create(req, res, next) {
    // console.log(req.body);
    const userProps = req.body;
    User.create(userProps)
     .then((user) => {
       res.redirect('/');
     })
     .catch(next);
  },

 // Read user route
 read(req, res, next) {
   User.findOne({ name: req.params.name}, (err, user) => {
     if (err) throw err;
     res.redirect('/');
 })
 .catch(next);
 },


 // Update user route
 update(req, res, next) {
   const name = req.params.name;
   const userProps = req.body;

   User.findByIdAndUpdate({ name: name }, userProps)
    .then(() => User.findById({ name: name }))
    .then(user => res.send(user))
    .catch(next);
 },

 // Delete user route
 delete(req, res, next) {
   const userId = req.params.id;

   User.findByIdAndRemove({ _id: userId })
    .then(user => res.status(204).send(user))
    .catch(next);
 }

};
