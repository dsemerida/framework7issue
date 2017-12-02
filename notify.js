var gcm = require('node-gcm');

// Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
var sender = new gcm.Sender('AIzaSyAbe59_6M_DDnLLTDzAYuawozFzeFVE_Go');

// Prepare a message to be sent
var message = new gcm.Message({
    data: { key1: 'msg1' },
    notification: {
        title: "Hello, World",
        icon: "ic_launcher",
        body: "This is a notification that will be displayed if your app is in the background."
    },
    priority: 'high',
});

// Specify which registration IDs to deliver the message to
var regTokens = ['fCzrNNlHVUw:APA91bHLbyWazu9pc2OLGJhVxB2dcgrf36ncTxYJ1JUvunRadiYQLHFfDYYK5XCFbSyca9X47y0-FJrnMQ9LR7yC2h75LzeO3UEG6hKHXt7-42wGCpyKA57bOI5sr_nXg6wzxXTbIz0W'];

// Actually send the message
sender.send(message, { registrationTokens: regTokens }, function (err, response) {
	if (err) console.error(err);
	else console.log(response);
});