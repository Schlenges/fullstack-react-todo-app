import React, {Component} from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const APIURL = '/api/todos';

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

  render() {
    const todos = this.state.todos.map((t) => (
      <TodoItem
          key={t._id}
          {...t}
        />
    ));

    return (
      <div>
        <h1>Todo List!</h1>
        <TodoForm addTodo={this.addTodo}/>
        <ul>
          {todos}
        </ul>
      </div>
    );
  }
  
}

export default TodoList;