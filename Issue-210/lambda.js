let AWS = require('aws-sdk');
const sqs = new SL_AWS.SQS(AWS);
let SL_AWS = require('slappforge-sdk-aws');
let connectionManager = require('./ConnectionManager');
const rds = new SL_AWS.RDS(connectionManager);

exports.handler = function (event, context, callback) {

    // You must always end/destroy the DB connection after it's used
    rds.beginTransaction({
        instanceIdentifier: 'Test'
    }, function (error, connection) {
        if (error) {
            throw error;
        }
        connection.end();
        sqs.receiveMessage({
            QueueUrl: 'https://sqs.us-east-1.amazonaws.com/318300609668/test-queue.fifo',
            AttributeNames: ['All'],
            MaxNumberOfMessages: '1',
            VisibilityTimeout: '30',
            WaitTimeSeconds: '0'
        }).promise()
            .then(receivedMsgData => {
                if (!!(receivedMsgData) && !!(receivedMsgData.Messages)) {
                    let receivedMessages = receivedMsgData.Messages;
                    receivedMessages.forEach(message => {
                        // your logic to access each message through out the loop. Each message is available under variable message 
                        // within this block
                    });
                } else {
                    // No messages to process
                }
            })
            .catch(err => {
                // error handling goes here
            });
    });

    callback(null, { "message": "Successfully executed" });
}