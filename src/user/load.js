const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const crypto = require('crypto');

for(let i = 0; i < 300; i++) {
	dynamodb.put({
		TableName: 'sgfaws_user',
		Item: { 
			id : crypto.randomBytes(16).toString('hex'),
			createdAt : new Date().getTime(),
			email : parseInt(Math.random() * 10000) + '@gmail.com'
		}
	}).promise().then(data => {
//		console.log(data);
	}).catch(err => {
		console.log(err);
	});
}
