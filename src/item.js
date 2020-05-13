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
          <span className="title">{props.todo.title}</span>
        </Typography>
        <Typography variant="body2" component="p">
          <span className="description">{props.todo.description}</span>
        </Typography>
      </CardContent>
      <CardActions>
        <Button className="delete-button" variant="contained" color="primary" onClick={ () => props.del(props.todo.key) }>
          <span className="delete-label">削除</span>
        </Button>
      </CardActions>
    </Paper>
  );
}

export default Item
