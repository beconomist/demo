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


  // 首頁
  // app.get('/', APIsController.greeting);

  // Posts related routes:
  app.get('/posts', PostsController.getPosts);

  // app.get('/admin', PostsController.getAdmin);

  app.post('/postForm', PostsController.createPosts);

  // Users related routes
  app.post('/users', UsersController.create);
  // app.get('/users/:id', UsersController.read);
  app.put('/users/:id', UsersController.edit);
  app.delete('/users/:id', UsersController.delete);

  // API related routes
  app.get('/meetups', APIsController.getMeetups);


};
