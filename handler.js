'use strict';
const middy = require('@middy/core')
const jsonBodyParser = require('@middy/http-json-body-parser')

const hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello Serverless',
        input: event,
      },
      null,
      2
    ),
  };
};

const helloUser = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hello User ${event.pathParameters.name}`,
        input: event,
      },
      null,
      2
    ),
  };
};

const createUser = async (event) => {
  const { body } = event;
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Hello User ${body.user}`,
        input: body,
      },
    ),
  };
};

module.exports = {
  createUser: middy(createUser).use(jsonBodyParser()),
  hello,
  helloUser
}
