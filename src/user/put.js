const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

dynamodb.put({
	TableName: 'sgfaws_user',
	Item: { 
		id : process.argv[2],
		email : 'foo@gmail.com',
		createdAt : new Date().getTime(),
		addresses : [{
			type : 'Home',
			streets : [ '123 Main St', 'Apt 3A'],
			city : 'Springfield',
			state : 'MO',
			country : 'US',
			zip : 65807
		}]
	},
	ConditionExpression : 'id <> :id',
	ExpressionAttributeValues : {
		':id' : process.argv[2]
	}
}).promise().then(data => {
	console.log(data);
}).catch(err => {
	console.log(err);
});
