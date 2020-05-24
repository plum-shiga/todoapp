import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Grid';

import Form from './form.js';
import Item from './item.js';

const App = (props) => {
  const [todos, setTodo] = useState([
  ]);
  const del = (key) => {
    setTodo(todos.filter((todo) => todo.key !== key));
  }
  useEffect(() => {
    if (todos.length >= 2) {
      document.title = `${todos[0].title} ほか　${todos.length - 1} 件`;
    } else if (todos.length === 1) {
      document.title = `${todos[0].title}`;
    } else {
      document.title = 'Todo List';
    }
  });
  return (
    <div>
      <Form todos={todos} setTodo={setTodo} getApi={props.getApi} postApi={props.postApi} />
      <Card>
        {todos.map((todo) => (
          <Item key={todo.key} todo={todo} del={del}/>
        ))}
      </Card>
    </div>
  );
}

export default App
