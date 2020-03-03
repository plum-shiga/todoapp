import React, { useState } from 'react';
import Card from '@material-ui/core/Grid';

import Form from './form.js';
import Item from './item.js';

const App = () => {
  const [todos, setTodo] = useState([
  ]);
  const del = (key) => {
    setTodo(todos.filter((todo) => todo.key !== key));
  }
  return (
    <div>
      <Form todos={todos} setTodo={setTodo} />
      <Card>
        {todos.map((todo) => (
          <Item key={todo.key} todo={todo} del={ del }/>
        ))}
      </Card>
    </div>
  );
}

export default App
