import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import crypto from 'crypto';
import axios from 'axios';

import './form.css';

const API_URL = 'https://8syrxiande.execute-api.ap-northeast-1.amazonaws.com/prod/';

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
  const submit = () => {
    const date = new Date();
    const str = String(date.getTime()) + formData.title;
    props.setTodo([...props.todos,{
      key: crypto.createHash('sha256').update(str, 'utf8').digest('hex'),
      title: formData.title,
      description: formData.description
    }]);
  }
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12} className="input-inner">
          <TextField data-testid="todo-title" label="Todo のタイトル" name="title" onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} className="input-inner">
          <TextField data-testid="todo-description" label="Todo の説明" name="description" onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={ submit } className="input-inner">
            <span data-testid="button-submit-label">Todo の登録</span>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
// Common ===
async function getApi(param, header) {
  const config = {};
  if (param) {
    config.params = {
      'key': param
    };
  }
  try {
    const res = await axios.get(API_URL, config);
    console.log(res);
    return {
      result: 'OK',
      body: res.data.result
    };
  } catch (err) {
    return {
      result: 'NG',
      body: err
    };
  }
}
async function putApi(params) {
  try {
    const res = await axios.put(API_URL, params);
    return {
      result: 'OK',
      body: res.data
    };
  } catch (err) {
    return {
      result: 'NG',
      body: err
    };
  }
}
export default Form
