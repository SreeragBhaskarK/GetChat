import kafka from 'kafka-node'
import { User } from '../../entities/userEntity';

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST })
const producer = new kafka.Producer(client)

producer.on('ready', () => {
    console.log('User Producer is ready');
})

producer.on('error', (error: Error) => {
    console.error('Error is User Producer:', error)
    process.exit(1);
})

export const produceUser = (user:User): void => {
    const payload:any = [
        {
            topic: 'user_topic',
            message: JSON.stringify(user)
        }
    ]
    producer.send(payload, (error: Error, data: any) => {
        if (error) {
            console.error('Error sending User message:', error)
        } else {
            console.log('User message sent successfully:', data);
            process.exit(0);
        }
    })
}