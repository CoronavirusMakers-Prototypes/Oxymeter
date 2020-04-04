const amqp       = require('amqplib/callback_api');
const { logger } = require('./../../util/logger')
const config     = require('config')

const { processPayloadFromProbes } = require('./../../controllers/meassurementController');

const rabbitmqURL = `amqp://${config.get('queues.consumer.dataProbes.user')}:${config.get('queues.consumer.dataProbes.password')}@${config.get('queues.consumer.dataProbes.ip')}:${config.get('queues.consumer.dataProbes.port')}`

const rabbitDataProbesConsumer = amqp.connect(rabbitmqURL, (error0, connection) => {
    if (error0) {
        throw error0;
    }
    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }
        logger.info(`Connected to rabbitMQ: ${rabbitmqURL}`);
        var queue = config.get('queues.consumer.dataProbes.queueName');

        channel.assertQueue(queue, {
            durable: false
        });

        logger.info(`[*] Waiting for messages in ${queue}`);

        channel.consume(queue, (msg) => {
            logger.debug(`[x] Received payload from queue ${queue}: ${msg.content.toString()}`);

            const messageFromDataQueue = JSON.parse(msg.content);

            // send the payload to the meassurementController and process there

            processPayloadFromProbes(messageFromDataQueue);

        }, {
            noAck: true
        });
    });
});

module.exports = {
  rabbitDataProbesConsumer,
}
