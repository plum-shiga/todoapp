import React from 'react';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import "./item.css"

const Item = (props) => {
  return (
    <Paper className="item-inner">
     <CardContent>
        <Typography variant="h5" component="h2">
          {props.todo.title}
        </Typography>
        <Typography variant="body2" component="p">
          {props.todo.description}
        </Typography>
      </CardContent>
    </Paper>
  );
}

export default Item
