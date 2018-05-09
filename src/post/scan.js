const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

dynamodb.scan({
	TableName: 'sgfaws_post',
	Select: 'COUNT'
}).promise().then(data => {
	console.log('No Filter');
	console.log(data);
}).catch(err => {
	console.log(err);
});

dynamodb.scan({
	TableName: 'sgfaws_post',
	FilterExpression: '#ttlHolder < :ttl',
	ExpressionAttributeNames: {
		'#ttlHolder' : 'ttl'
	},
	ExpressionAttributeValues: {
		':ttl' : parseInt(new Date().getTime() / 1000 + (Math.random() * 3600))
	},
	Select: 'COUNT'
}).promise().then(data => {
	console.log('Filter');
	console.log(data);
}).catch(err => {
	console.log(err);
});
