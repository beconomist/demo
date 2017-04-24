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
  app.post('/posts', PostsController.create);

  app.get('/posts', PostsController.readAll);
  app.get('/posts/:id', PostsController.readOne);

  app.put('/posts/:id', UsersController.update);

  app.put('/posts/:id', UsersController.delete);


  /**
   * User model related routes
   */
  app.post('/users', UsersController.create);

  app.get('/users/:name', UsersController.read);

  app.put('/users/:name', UsersController.update);
  app.delete('/users/:name', UsersController.delete);

  /**
   * Comment model related routes
   */


  /**
   * Tag model related routes
   */



};
