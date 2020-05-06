const randomBytes = require('crypto').randomBytes;
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'ap-northeast-1'});

function getRide(param) {
    return ddb.get({
        TableName: 'todo-data',
        Key: {
            key: param
        }
    }).promise();
}

function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

exports.handler = async (event, context) => {
  //Respomse Template
  let response = {
    statusCode: 200,
    headers: {"Access-Control-Allow-Origin" : "*"},
    body: null
  };

  //Response.Body Template
  let mybody = {
    message: '',
    result: {}
  };

  try {
    const apiresult = await getRide(event.queryStringParameters.key);
    response.statusCode = 200;
    mybody.message = 'OK';
    mybody.result = apiresult.Item.todos;
    response.body = JSON.stringify(mybody);
  } catch(e) {
    //Exception
    response.statusCode = 500;
    mybody.message = e.message;
    response.body = JSON.stringify(mybody);
  }
  return response;
};
