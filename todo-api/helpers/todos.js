const db = require('../models');

exports.getTodos = (req, res) => {
  db.Todo.find()
  .then((todos) => {
    res.json(todos);
  })
  .catch((err) => {
    res,send(err);
  })
};

exports.createTodo = (req, res) => {
  db.Todo.create(req.body)
    .then((newTodo) => {
      res.status(201).json(newTodo); // status 201 for "created"
    })
    .catch((err) => {
      res.send(err);
    })
};

exports.showTodo = (req, res) => {
  db.Todo.findById(req.params.todoId)
    .then((result) => {
      res.json(result);
    })
    .catch( (err) => {
      res.send(err);
    })
};

exports.updateTodo = (req, res) => {
  db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true}) // new: true tells mongoose to show the updated data instead of the old one
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.send(err);
    })
};

exports.deleteTodo = (req, res) => {
  db.Todo.remove({_id: req.params.todoId})
    .then(() => {
      res.json({msg: "Delete successfull"});
    })
    .catch((err) => {
      res.send(err);
    })
};

module.exports = exports;