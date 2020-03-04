import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Item = (props) => {
  return (
    <Paper>
     <CardContent>
        <Typography variant="h5" component="h2">
          {props.todo.title}
        </Typography>
        <Typography variant="body2" component="p">
          {props.todo.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={ () => props.del(props.todo.key) }>
          削除
        </Button>
      </CardActions>
    </Paper>
  );
}

export default Item
