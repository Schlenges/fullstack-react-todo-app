const express = require('express');
const router = express.Router();
const db = require('../models'); // will automatically find and use models/index.js
const helpers = require('../helpers/todos');

router.route('/') // route == /api/todos
  .get(helpers.getTodos)
  .post(helpers.createTodo)

router.route('/:todoId')
  .get(helpers.showTodo)
  .put(helpers.updateTodo)
  .delete(helpers.deleteTodo)

module.exports = router;