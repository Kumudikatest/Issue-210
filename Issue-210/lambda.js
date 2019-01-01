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
    });
        sqs.sendMessage({
            MessageBody: 'Test',
            QueueUrl: 'https://sqs.us-east-1.amazonaws.com/318300609668/test-queue.fifo',
            DelaySeconds: '0',
            MessageDeduplicationId: 'Test',
            MessageAttributes: {}
        }, function (data) {
            // your logic (logging etc) to handle successful message delivery, should be here
        }, function (error) {
            // your logic (logging etc) to handle failures, should be here
            console.log(error);
        });
    callback(null, { "message": "Successfully executed" });
}