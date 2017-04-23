const User = require('../models/user');


// Response handlers
module.exports = {

 // ES6 Shorthand Object Literal

 // Read user route
 getUser(req, res, next) {
   User.findOne({ name: req.params.name}, (err, user) => {
     if (err) throw err;
     res.redirect('/users/' + user.name);
 })
 .catch(next);
 },

 // Create user route
 create(req, res, next) {
   const userProps = req.body;
   User.create(userProps)
    .then((user) => {
      res.redirect('/');
    })
    .catch(next);
 },

 // Update user route
 edit(req, res, next) {
   const userId = req.params.id;
   const userProps = req.body;

   User.findByIdAndUpdate({ _id: userId }, userProps)
    .then(() => User.findById({ _id: userId }))
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
