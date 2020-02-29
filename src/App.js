import React, { useState } from 'react';
import Card from '@material-ui/core/Grid';

import Form from './form.js';

const App = () => {
  const [todos, setTodo] = useState([
  ]);
  return (
    <div>
      <Form todos={todos} setTodo={setTodo} />
      <Card>
        <p>basepage</p>
      </Card>
    </div>
  );
}

export default App
