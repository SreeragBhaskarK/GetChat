import { Kafka } from'kafkajs'

export const kafka = new Kafka({
  clientId: 'user',
  brokers: ['kafka:9092',],
})
