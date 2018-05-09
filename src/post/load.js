const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const crypto = require('crypto');

for(let i = 0; i < 300; i++) {
	dynamodb.put({
		TableName: 'sgfaws_post',
		Item: { 
			id : crypto.randomBytes(16).toString('hex'),
			userId : 'foo2',
			createdAt : new Date().getTime(),
			message : 'Example post',
			ttl : parseInt(new Date().getTime() / 1000 + (Math.random() * 3600)) 
		},
	}).promise().then(data => {
//		console.log(data);
	}).catch(err => {
		console.log(err);
	});
}
