import React, {Component} from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const APIURL = '/api/todos/';

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

  loadTodos(){
    fetch(APIURL)
    .then(response => {
      if(!response.ok){
        if(response.status >= 400 && response.status < 500){
          return response.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else{
          let err = {errorMessage: 'Please try again later, server is not responding'};
          throw err;
        }
      }
      return response.json();
    })
    .then(todos => this.setState({todos}));
  }

  addTodo(val){
    return fetch(APIURL, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({name: val})
    })
    .then(response => {
      if(!response.ok){
        if(response.status >= 400 && response.status < 500){
          return response.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else{
          let err = {errorMessage: 'Please try again later, server is not responding'};
          throw err;
        }
      }
      return response.json();
    })
    .then(newTodo => {
      this.setState({todos: [...this.state.todos, newTodo]})
    });
  }

  deleteTodo(id){
    const deleteURL = APIURL + id;

    fetch(deleteURL, {
      method: 'delete'
    })
    .then(response => {
      if(!response.ok){
        if(response.status >= 400 && response.status < 500){
          return response.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else{
          let err = {errorMessage: 'Please try again later, server is not responding'};
          throw err;
        }
      }
      return response.json();
    })
    .then(() => {
      let filteredTodos = this.state.todos.filter(todo => todo._id !== id);
      this.setState({todos: filteredTodos});
    });
  }

  toggleTodo(todo){
    const updateURL = APIURL + todo._id;

    fetch(updateURL, {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({completed: !todo.completed})
    })
    .then(response => {
      if(!response.ok){
        if(response.status >= 400 && response.status < 500){
          return response.json().then(data => {
            let err = {errorMessage: data.message};
            throw err;
          })
        } else{
          let err = {errorMessage: 'Please try again later, server is not responding'};
          throw err;
        }
      }
      return response.json();
    })
    .then(updatedTodo => {
      let todos = this.state.todos.map(t => 
        (t._id === updatedTodo._id) ? {...t, completed: !t.completed} : t
      );

      this.setState({todos: todos});
    });
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