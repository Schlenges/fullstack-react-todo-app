import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      todos: []
    }
  }

  componentWillMount(){
    fetch('/api/todos')
    .then(data => data.json())
    .then(todos => this.setState({todos}));
  }

  render() {
    return (
      <div className="App">
        <TodoList />
      </div>
    );
  }
}

export default App;
