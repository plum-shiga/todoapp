import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import crypto from 'crypto';

import './form.css';

const Form = (props) => {
  const [formData, setFormData] = useState(
    {key: '', title: '', description: ''}
  );
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  }
  const save = () => {
    const date = new Date();
    const str = String(date.getTime()) + formData.title;
    props.setTodo([...props.todos,{
      key: crypto.createHash('sha256').update(str, 'utf8').digest('hex'),
      title: formData.title,
      description: formData.description
    }]);
  }
  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
      <Grid item xs={12} className="input-inner">
        <TextField id="standard-basic" label="Todo のタイトル" name="title" onChange={handleChange} fullWidth margin="normal" />
      </Grid>
      <Grid item xs={12} className="input-inner">
        <TextField id="standard-basic" label="Todo の説明" name="description" onChange={handleChange} fullWidth margin="normal" />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={ save } className="large-button" >
          Todo の登録
        </Button>
      </Grid>
    </Grid>
  );
}
export default Form
