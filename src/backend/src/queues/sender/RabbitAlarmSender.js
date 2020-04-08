const amqp       = require('amqplib');
const { logger } = require('./../../util/logger')
const config     = require('config')

const { processPayloadFromProbes } = require('./../../controllers/meassurementController');

const rabbitmqURL = `amqp://${config.get('queues.sender.alarms.user')}:${config.get('queues.consumer.dataProbes.password')}@${config.get('queues.consumer.dataProbes.ip')}:${config.get('queues.consumer.dataProbes.port')}`

let instance = null;

// Dealing with rabbitmq instance to send mesasge
class RabbitAlarmSender {
  async init() {
    this.connection = await amqp.connect(rabbitmqURL);
    this.channel    = await this.connection.createChannel();
    return this;
  }

  async send(alarmMessage, queue = config.get('queues.sender.alarms.queueName')) {
    if (!this.connection) {
      await this.init();
    }
    // we want the sended alarms will remind over broker restarts
    await this.channel.assertQueue(queue, {durable: true});
    this.channel.sendToQueue(queue, Buffer.from(alarmMessage))
  }

}

RabbitAlarmSender.getInstance = async () => {
  if (!instance) {
    const broker = new RabbitAlarmSender();
    instance = broker.init();
  }
  return instance;
};

module.exports = RabbitAlarmSender
