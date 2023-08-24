import { Kafka } from'kafkajs'

export const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka:9092',],
})
