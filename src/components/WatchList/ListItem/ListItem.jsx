import React, { useState } from 'react';
import classNames from 'classnames';
import './ListItem.scss'

export const ListItem = ({ todo, deleteTodo }) => {
  const [complete, setComplete] = useState(false);

  return (
    <div
      className={classNames("list-item", { "list-item__completed": complete })}
      key={todo.id}
    >
        <input 
          type="checkbox" 
          className="list-item__toggle" 
          onChange={() => setComplete(!complete)} 
          checked={complete} 
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="list-item__destroy"
          onClick={() => deleteTodo(todo.id)}
        >
          X
        </button>
    </div>
  );
};