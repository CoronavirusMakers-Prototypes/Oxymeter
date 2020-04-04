var amqp = require('amqplib/callback_api');
// TODO: add some randomize stuff


amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'open-vitalox-0';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
            // getting the object and check if is an array
            const messageFromDataQueue = JSON.parse(msg.content);
            if (messageFromDataQueue instanceof Array) {
              console.log('Received an array! []');
              messageFromDataQueue.forEach((data, i) => {
                console.log(`[${i}] --> Data: ${data.spo2}`);
              });
            } else {
              console.log('Received single payload! {}');
                console.log(messageFromDataQueue.spo2);
            }
        }, {
            noAck: true
        });
    });
});
