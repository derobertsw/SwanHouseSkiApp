const AWS = require('aws-sdk');

AWS.config.update({ endpoint: 'https://dynamodb.us-east-1.amazonaws.com' });

let docClient = new AWS.DynamoDB.DocumentClient();

var table = 'UserTable';

var year = 2015;
var title = 'The Big New Movie';

var params = {
	TableName: table,
	Item: {
		year: year,
		title: title,
		info: {
			plot: 'Nothing happens at all.',
			rating: 0
		}
	}
};

const addUser = () => {
	let output = 'nothing';
	docClient.put(params, function (err, data) {
		if (err) {
			console.error(
				'Unable to add item. Error JSON:',
				JSON.stringify(err, null, 2)
			);
			output = 'error: ' + JSON.stringify(err, null, 2);
		} else {
			console.log('Added item:', JSON.stringify(data, null, 2));
			output = 'IT WORKKKS: ' + JSON.stringify(data, null, 2);
		}
	});
	return output;
};

module.exports = { addUser };
