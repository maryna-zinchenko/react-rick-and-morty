import React, { useState } from 'react';
import classNames from 'classnames';
import './ListItem.scss'

export const ListItem = ({ todo, deleteTodo, completeFunc }) => {
  const [complete, setComplete] = useState(false);

  const completed = (id) => {
    setComplete(true)
    completeFunc(id)
  }

  return (
    <div
      className={classNames("list-item", { "list-item__completed": complete || todo.completed })}
      key={todo.id}
    >
        <input 
          type="checkbox" 
          className="list-item__toggle" 
          onChange={() => completed(todo.id)} 
          checked={complete || todo.completed}
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