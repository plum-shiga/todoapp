import crypto from 'crypto';
import axios from 'axios';

import './form.css';

const API_URL = 'https://8syrxiande.execute-api.ap-northeast-1.amazonaws.com/prod/';

// Common ===
export async function getApi(param, header) {
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
export async function postApi(params) {
  try {
    const res = await axios.post(API_URL, params);
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
