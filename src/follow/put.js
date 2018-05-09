const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

let followerUserId = process.argv[2] || 'foo';
let followingUserId = process.argv[3] || 'bar';

dynamodb.put({
	TableName: 'sgfaws_follow',
	Item: { 
		followerUserId : followerUserId,
		followingUserId : followingUserId,
		createdAt : new Date().getTime()
	},
	ConditionExpression : 'followerUserId <> :followerUserId and followingUserId <> :followingUserId',
	ExpressionAttributeValues : {
		':followerUserId' : followerUserId,
		':followingUserId' : followingUserId
	}
}).promise().then(data => {
	console.log(data);
}).catch(err => {
	console.log(err);
});
