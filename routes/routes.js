/*
  Routes.js是Router: 將不同的request指派給不同的handlers
  1. 引入各個data model的controller
  2. 將不同的request指派給不同的handlers
  3. 輸出routes as a function
 */

const UsersController = require('../controllers/users_controller');
const PostsController = require('../controllers/posts_controller');
const APIsController = require('../controllers/apis_controller');

// Request handlers
module.exports = (app) => {

  /**
   * API related routes
   */
  app.get('/meetups', APIsController.getMeetups);

  /**
   * Post model related routes
   */
  app.get('/posts', PostsController.getPosts);
  app.post('/posts', PostsController.createPost);

  /**
   * User model related routes
   */
  app.post('/users', UsersController.create);
  app.get('/users/:name', UsersController.getUser);
  app.put('/users/:id', UsersController.edit);
  app.delete('/users/:id', UsersController.delete);

  /**
   * Comment model related routes
   */


  /**
   * Tag model related routes
   */



};
