const randomBytes = require('crypto').randomBytes;
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    const rideId = toUrlString(randomBytes(16));

    //Respomse Template
    const response = {
        statusCode: 200,
        headers: {"Access-Control-Allow-Origin" : "*"},
        body: null
    };

    //Response.Body Template
    const body = {
        message: ''
    };
    
    try {
        const result = await recordRide(rideId, event);
        response.statusCode = 200;
        body.message = 'Success';
        body.key = rideId;
        response.body = JSON.stringify(body);
    } catch(e) {
        //Exception
        response.statusCode = 500;
        body.message = e.message;
        response.body = JSON.stringify(body);
    }
  return response;
};

function recordRide(rideId, event) {
    return ddb.put({
        TableName: 'todo-data',
        Item: {
            key: rideId,
            todos: event.body,
            RequestTime: new Date().toISOString(),
        },
    }).promise();
}
function toUrlString(buffer) {
    return buffer.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

