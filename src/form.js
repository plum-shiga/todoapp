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
  const [key, setKey] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  }
  const entry = () => {
    let key='';
    if (props.isTest) {
      key = props.testKey;
    } else {
      const date = new Date();
      const str = String(date.getTime()) + formData.title;
      key = crypto.createHash('sha256').update(str, 'utf8').digest('hex');
    }
    props.setTodo([...props.todos,{
      key,
      title: formData.title,
      description: formData.description
    }]);
  }
  const save = async() => {
    const result = await props.postApi(props.todos);
    setKey(result.body.key);
  }
  const load = async () => {
    const result = await props.getApi(key);
    props.setTodo(JSON.parse(result.body));
  }
  const updatePassKey = e => {
    const {value} = e.target;
    setKey(value);
  }

  // render ===
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
        <Grid item xs={12} className="input-inner">
          <TextField className="todo-title-input" label="Todo のタイトル" name="title" onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12} className="input-inner">
          <TextField className="todo-description-input" label="Todo の説明" name="description" onChange={handleChange} fullWidth margin="normal" />
        </Grid>
        <Grid item xs={12}>
          <Button className="input-inner button-entry" variant="contained" color="primary" onClick={ entry }>
            <span className="button-entry-label">Todo の登録</span>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row" alignItems="center" spacing={1}>
            <Grid item xs={6}>
              <Button className="half-button button-savea" variant="contained" color="primary" onClick={ save } disabled={!(props.todos.length > 0)}>
                <span className="button-save-label">Todo の保存</span>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button className="half-button buntton-load" variant="contained" color="primary" onClick={ load }>
                <span className="button-read-label">Todo の読込</span>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} className="input-inner">
          <TextField className="password-input-text" label="パスワード" type="text" onChange={updatePassKey} value={key} fullWidth margin="normal" />
        </Grid>
      </Grid>
    </div>
  );
}
export default Form
