const User = require('../models/user');


// Response handlers
module.exports = {

 // ES6 Shorthand Object Literal

 // Create user route
 create(req, res, next) {
   // console.log('creating users...');
   // console.log(res);
   console.log(req.body);

   const userProps = req.body;

   User.create(userProps)
    .then(user => res.send(user))
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
