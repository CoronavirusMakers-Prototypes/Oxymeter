const amqp       = require('amqplib/callback_api');
const { logger } = require('./../../util/logger')
const config     = require('config')

const rabbitmqURL = `amqp://${config.get('queues.consumer.dataProbes.user')}:${config.get('queues.consumer.dataProbes.password')}@${config.get('queues.consumer.dataProbes.ip')}:${config.get('queues.consumer.dataProbes.port')}`
console.log(rabbitmqURL);
const rabbitDataProbesConsumer = amqp.connect(rabbitmqURL, (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        var queue = config.get('queues.consumer.dataProbes.queueName');

        channel.assertQueue(queue, {
            durable: false
        });

        logger.info(`[*] Waiting for messages in ${queue}`);

        channel.consume(queue, (msg) => {
            logger.debug(`[x] Received: ${msg.content.toString()}`);
            // getting the object and check if is an array
            const messageFromDataQueue = JSON.parse(msg.content);
            if (messageFromDataQueue instanceof Array) {
              logger.debug('Received an array! []'); //TODO: remove
              messageFromDataQueue.forEach((data, i) => {
                logger.debug(`[${i}] --> Data: ${data.spo2}`);
              });
            } else {
              logger.debug('Received single payload! {}'); //TODO: remove
              logger.debug(messageFromDataQueue.spo2);
            }
        }, {
            noAck: true
        });
    });
});

module.exports = {
  rabbitDataProbesConsumer,
}
