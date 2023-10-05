
import { Kafka } from'kafkajs'
const {KAFKA_HOST1,KAFKA_HOST2,KAFKA_HOST3} = process.env as{KAFKA_HOST1:string,KAFKA_HOST2:string,KAFKA_HOST3:string}

export const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [KAFKA_HOST1,KAFKA_HOST2,KAFKA_HOST3]
})
