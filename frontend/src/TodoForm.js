import React, {Component} from 'react';
import './TodoForm.css';

class TodoForm extends Component{
  constructor(props){
    super(props);
    this.state = {inputVal: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({
      inputVal: e.target.value
    })
  }

  handleSubmit(){
    this.props.addTodo(this.state.inputVal);
  }
  
  render(){
    return(
      <section class="form">
        <input id="todoInput" placeholder="Insert your task here..."
          type="text"
          value={this.state.inputVal}
          onChange={this.handleChange}
        />
        <button
          onClick={this.handleSubmit}
        >
          Add Todo
        </button>
      </section>
    )
  }
}

export default TodoForm;