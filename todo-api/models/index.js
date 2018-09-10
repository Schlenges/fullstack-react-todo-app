const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-api', {useNewUrlParser: true});

mongoose.Promise = Promise; // allows to use promises instead of callback functions

module.exports.Todo = require('./todo');