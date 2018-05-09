const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

dynamodb.put({
	TableName: 'sgfaws_post',
	Item: { 
		userId : process.argv[2],
		id : process.argv[3],
		createdAt : new Date().getTime(),
		message : 'This is a post #firstpost #newbie',
		images : [
			's3://sgf-aws/images/example1.png',
			's3://sgf-aws/images/example2.png'
		]
	},
}).promise().then(data => {
	console.log(data);
}).catch(err => {
	console.log(err);
});
