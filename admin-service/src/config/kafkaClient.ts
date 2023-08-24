const { Kafka } = require('kafkajs')

export const kafka = new Kafka({
  clientId: 'admin',
  brokers: ['kafka:9092',],
})
