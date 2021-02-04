import React, { useState, useEffect } from "react";
import { ListItem } from './ListItem/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './WatchList.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100ch',
      backgroundColor: '#FDF7BB',
      borderRadius: '10px',
      '&:hover': {
        boxShadow: '0px 0px 30px 13px rgba(245,255,39,0.78)',
      }
    },
  },
}));

export default function WatchList() {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storageTodos = localStorage.getItem('todos');

    if (storageTodos) {
      setTodos(JSON.parse(storageTodos));
    } else {
      setTodos([])
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const todo = {
      title,
      id: +new Date(),
      completed: false,
    };

    setTodos([...todos, todo]);
    setTitle('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completeTodo = (id) => {
    setTodos(todos.map(function(todo) {
      if (todo.id === id){
        todo.completed = true
        return todo;
      } else {
        return todo;
      };
    }))
  };

  return (
    <section className="watch-list">
        <h2 className="watch-list__header">My Watch list</h2>
        <form 
          onSubmit={handleSubmit} 
          className={classes.root} 
          noValidate 
          autoComplete="off"
        >
          <TextField 
            id="outlined-basic" 
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="What do you want to watch?"
            />
        </form>

        <section className="watch-list__list">
          {todos && todos.map(todo => (
                <ListItem
                  key={todo.id}
                  todo={todo}
                  deleteTodo={deleteTodo}
                  completeFunc={completeTodo}
                />
              ))
          }
        </section>
    </section>
  );
}