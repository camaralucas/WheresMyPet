/* eslint-disable-line */ const aws = require('aws-sdk');
const ddb = new aws.DynamoDB({apiVersion: '2012-10-08'});

exports.handler = async (event, context) => {
  console.log(event);

  let date = new Date();
  let timeStamp = new Date().getTime();

  const tableName = 'User-edlz4o73izcsjkygok7mfv5i2m-dev';
  const region = process.env.REGION;

  console.log('date=' + date);
  console.log('timeStamp=' + timeStamp);
  console.log('table=' + tableName + ' -- region=' + region);

  aws.config.update({region: region});

  // If the required parameters are present, proceed
  if (event.request.userAttributes.sub) {
    // -- Write data to DDB
    let ddbParams = {
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
      TableName: tableName,
    };

    // Call DynamoDB
    try {
      await ddb.putItem(ddbParams).promise();
      console.log('Success');
    } catch (err) {
      console.log('Error', err);
    }

    console.log('Success: Everything executed correctly');
    context.done(null, event);
  } else {
    // Nothing to do, the user's email ID is unknown
    console.log('Error: Nothing was written to DDB or SQS');
    context.done(null, event);
  }
};
