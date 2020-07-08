/* eslint-disable-line */ const aws = require('aws-sdk');
const ddb = new aws.DynamoDB({apiVersion: '2012-10-08'});

exports.handler = async (event, context) => {
  console.log(event);

  let date = new Date();
  let timeStamp = new Date().getTime();

  const region = process.env.REGION;

  console.log('date=' + date);
  console.log('timeStamp=' + timeStamp);

  aws.config.update({region: region});

  // If the required parameters are present, proceed
  if (event.request.userAttributes.sub) {
    // -- Write data to DDB
    let ddbParamsUserTable = {
      Item: {
        id: {S: event.request.userAttributes.sub},
        __typename: {S: 'User'},
        _version: {N: '1'},
        _lastChangedAt: {N: `${timeStamp}`},
        email: {S: event.request.userAttributes.email},
        family_name: {S: event.request.userAttributes.family_name},
        given_name: {S: event.request.userAttributes.given_name},
        createdAt: {S: date.toISOString()},
        updatedAt: {S: date.toISOString()},
      },
      TableName: 'User-fiebfmwsfjc45mzbgtnps5chzi-dev',
    };

    let ddbParamsDataTable = {
      Item: {
        id: {S: event.request.userAttributes.email},
        cat: {N: '0'},
        dog: {N: '0'},
        createdAt: {S: date.toISOString()},
        updatedAt: {S: date.toISOString()},
      },
      TableName: 'Data-fiebfmwsfjc45mzbgtnps5chzi-dev',
    };

    // Call DynamoDB for User table
    try {
      await ddb.putItem(ddbParamsUserTable).promise();
      console.log('User table insert success');
    } catch (err) {
      console.log('User table error', err);
    }

    // Call DynamoDB for Data table
    try {
      await ddb.putItem(ddbParamsDataTable).promise();
      console.log('Data table insert success');
    } catch (err) {
      console.log('Data table error', err);
    }

    console.log('Success: Everything executed correctly');
    context.done(null, event);
  } else {
    // Nothing to do, the user's email ID is unknown
    console.log('Error: Nothing was written to DDB or SQS');
    context.done(null, event);
  }
};
