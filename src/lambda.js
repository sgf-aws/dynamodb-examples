const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.updateUserFollow = (event, context, callback) => {
  if(event.Records && event.Records.length > 0) {
    console.log('Processing ' + event.Records.length + ' events');
    event.Records.forEach(async record => {
			console.log(JSON.stringify(record));
      if(record.dynamodb.NewImage) {
				let arn = record.eventSourceARN;
				if(arn.match(/table\/sgfaws_follow\//) && record.dynamodb.NewImage) {
					let change = 0;
					if(record.eventName == 'INSERT' || record.eventName == 'MODIFY') {
						change = 1;
					} else if(record.eventName == 'DELETE') {
						change = -1;
					}
					let [following, follower] = await Promise.all([
						dynamodb.update({
							TableName: 'sgfaws_user',
							Key: { id : record.dynamodb.NewImage.followerUserId.S },
							UpdateExpression: 'add following :val',
							ExpressionAttributeValues : {
								':val' : change
							}
						}).promise(),
						/*, (err, data) => {
							if(err) {
								console.log(err);
							} else {
							}
						}),
						*/
						dynamodb.update({
							TableName: 'sgfaws_user',
							Key: { id : record.dynamodb.NewImage.followingUserId.S },
							UpdateExpression: 'add followers :val',
							ExpressionAttributeValues : {
								':val' : change
							}
						}).promise()
						/*, (err, data) => {
							if(err) {
								console.log(err);
							} else {
							}
						});
						*/
					]);
				}
			}
		});
	}
	callback();
};

exports.updateUserFeed = async (event, context, callback) => {
  if(event.Records && event.Records.length > 0) {
    console.log('Processing ' + event.Records.length + ' events');
    event.Records.forEach(async record => {
			console.log(JSON.stringify(record));
      if(record.dynamodb.NewImage) {
				let arn = record.eventSourceARN;
				if(arn.match(/table\/sgfaws_post\//) && record.dynamodb.NewImage) {
					let change = 0;
					if(record.eventName == 'INSERT' || record.eventName == 'MODIFY') {
						change = 1;
					} else if(record.eventName == 'DELETE') {
						change = -1;
					}
					let promises = [
						dynamodb.update({
							TableName: 'sgfaws_user',
							Key: { id : record.dynamodb.NewImage.userId.S },
							UpdateExpression: 'add posts :val',
							ExpressionAttributeValues : {
								':val' : change
							}
						}).promise()
					];
					//real world add looping using LastEvaluatedKey and use fargate
					dynamodb.query({
						TableName: 'sgfaws_follow',
						IndexName: 'followerUserId-followingUserId-ix',
						KeyConditionExpression: 'followingUserId = :followingUserId',
						ExpressionAttributeValues: {
							':followingUserId': record.dynamodb.NewImage.userId.S
						},
						ProjectionExpression: 'followerUserId'
					}, (err, data) => {
						if(err) {
							console.log(err);
						} else {
							data.Items.forEach(item => {
								promises.push(dynamodb.update({
									TableName: 'sgfaws_user_feed',
									Key: { userId : item.followerUserId, createdAt : new Date().getTime() },
									UpdateExpression: 'set postIds = list_append(if_not_exists(postIds, :empty), :postId)',
									ExpressionAttributeValues : {
										':postId' : [record.dynamodb.NewImage.id.S],
										':empty' : []
									}
								}).promise())
							});
						}
					});
					await Promise.all(promises);
				}
			}
		});
	}
	callback();
};
