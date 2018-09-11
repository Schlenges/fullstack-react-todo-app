import React from 'react';
import './TodoItem.css';

const TodoItem = ({name, completed, onDelete, onToggle}) => (
  <li className="task" >
    <span className={completed ? 'done' : ''} onClick = {onToggle}>
      {name}
    </span>
    <span className="delete" onClick={onDelete}> X </span>
  </li>
);

export default TodoItem;