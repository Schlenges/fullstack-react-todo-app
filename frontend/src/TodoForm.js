import React, {Component} from 'react';

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
      <div>
        <input 
          type="text"
          value={this.state.inputVal}
          onChange={this.handleChange}
        />
        <button
          onClick={this.handleSubmit}
        >
          Add Todo
        </button>
      </div>
    )
  }
}

export default TodoForm;