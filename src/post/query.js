const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

dynamodb.query({
	TableName: 'sgfaws_post',
	KeyConditionExpression: 'userId = :userId',
	IndexName: 'userId-createdAt-ix',
	Limit : 5,
	ExpressionAttributeValues: {
		':userId' : process.argv[2]
	},
	//ScanIndexForward : false
}).promise().then(data => {
	console.log('Ascending');
	console.log(data);
}).catch(err => {
	console.log(err);
});
