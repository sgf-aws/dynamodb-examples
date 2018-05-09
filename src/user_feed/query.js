const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

dynamodb.query({
	TableName: 'sgfaws_user_feed',
	KeyConditionExpression: 'userId = :userId',
	ExpressionAttributeValues: {
		':userId' : process.argv[2]
	},
	ScanIndexForward: false
}).promise().then(data => {
	console.log(JSON.stringify(data));
}).catch(err => {
	console.log(err);
});
