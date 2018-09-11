import React, {Component} from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import * as apiCalls from './api';

class TodoList extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: []
    }
    this.addTodo = this.addTodo.bind(this);
  }

  componentWillMount(){ // could the data fetch simply be put in the constructor instead?
    this.loadTodos();
  }

  async loadTodos(){
    let todos = await apiCalls.getTodos();
    this.setState({todos});
  }

  async addTodo(val){
    let newTodo = await apiCalls.createTodo(val);
    this.setState({todos: [...this.state.todos, newTodo]});
  }

  async deleteTodo(id){
    await apiCalls.removeTodo(id);
    let filteredTodos = this.state.todos.filter(todo => todo._id !== id);
    this.setState({todos: filteredTodos});
  }

  async toggleTodo(todo){
    let updatedTodo = await apiCalls.updateTodo(todo);
    let todos = this.state.todos.map(t => 
      (t._id === updatedTodo._id) ? {...t, completed: !t.completed} : t
    );
    this.setState({todos: todos});
  }

  render() {
    const todos = this.state.todos.map((t) => (
      <TodoItem
          key={t._id}
          {...t}
          onDelete={this.deleteTodo.bind(this, t._id)} // can't bind the method in the constructor, because it also needs unique data from each todo item (in this case the id)
          onToggle={this.toggleTodo.bind(this, t)}
        />
    ));

    return (
      <div>
        <header>
          <h1>todo<span>list</span></h1>
          <h2>A simple todo list app built with react and node</h2>
        </header>
        <TodoForm addTodo={this.addTodo}/>
        <ul className="list">
          {todos}
        </ul>
      </div>
    );
  }
  
}

export default TodoList;