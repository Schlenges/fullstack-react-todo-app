import React from 'react';

const TodoItem = ({name, completed}) => (
  <li style={{textDecoration: completed ? 'line-through' : 'none'}} > {/*  conditionl styling */}
    {name}
  </li>
);

export default TodoItem;