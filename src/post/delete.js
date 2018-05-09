const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

dynamodb.delete({
	TableName: 'sgfaws_post',
	Key: { 
		id : process.argv[2]
	},
}).promise().then(data => {
	console.log(data);
}).catch(err => {
	console.log(err);
});
