import kafka from 'kafka-node'

const client = new kafka.KafkaClient({ kafkaHost: process.env.KAFKA_HOST })
const consumer = new kafka.Consumer(
    client,
    [{ topic: 'user_topic', partition: 0 }],
    { autoCommit: false }
)

export const consumeUser = (messageHandler: (message: string) => void): void => {
    consumer.on('message', (message: any) => {
        messageHandler(message.value)
    })

    consumer.on('error', (error: Error) => {
        console.error('Error in User Consumer:', error)
    })

    consumer.on('offsetOutOfRange',(error:Error)=>{
        console.error('Offset out of range error in User Consumer:', error);
    })
}