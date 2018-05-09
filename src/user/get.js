const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

dynamodb.get({
	TableName: 'sgfaws_user',
	Key: {
		id : process.argv[2]
	},
	ConsistentRead: true
}).promise().then(data => {
	console.log(JSON.stringify(data));
}).catch(err => {
	console.log(err);
});
