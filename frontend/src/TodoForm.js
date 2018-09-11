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

  handleSubmit(e){
    if(e.key === 'Enter'){
      this.props.addTodo(this.state.inputVal);
      this.setState({inputVal: ''});
    }
  }
  
  render(){
    return(
      <section className="form">
        <input id="todoInput" placeholder="Insert your task here..."
          type="text"
          value={this.state.inputVal}
          onChange={this.handleChange}
          onKeyPress={this.handleSubmit}
        />
      </section>
    )
  }
}

export default TodoForm;