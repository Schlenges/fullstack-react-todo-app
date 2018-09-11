import React from 'react';
import './TodoItem.css';

const TodoItem = ({name, completed, onDelete, onToggle}) => (
  <li class="task">
    <span 
      class={completed ? 'done' : ''}
      onClick = {onToggle}
    >
      {name}
    </span>    
    <span id="delete" onClick={onDelete}> X </span>
  </li>
);

export default TodoItem;