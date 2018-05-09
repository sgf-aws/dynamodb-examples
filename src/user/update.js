const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

dynamodb.update({
	TableName: 'sgfaws_user',
	Key: { 
		id : process.argv[2]
	},
	UpdateExpression: 'set email = :email, updatedAt = :updatedAt add updates :val',
	ExpressionAttributeValues : {
		':email' : 'bar@gmail.com',
		':val' : 1,
		':updatedAt' : new Date().getTime()
	}
}).promise().then(data => {
	console.log(data);
}).catch(err => {
	console.log(err);
});
