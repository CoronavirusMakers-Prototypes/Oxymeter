var amqp = require('amqplib/callback_api');

amqp.connect('amqp://vitalox:vitalox@localhost:5672', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    const dummyProbeMsg = {"spo2": 322, "ppm": 226, "sequence": "1984", "batt":"23", "auth_id": "f00b4r" }

    const queue = 'open-vitalox-0';
    var msg = JSON.stringify(dummyProbeMsg)

    channel.assertQueue(queue, {
      durable: false
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);

    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);

  });
});
