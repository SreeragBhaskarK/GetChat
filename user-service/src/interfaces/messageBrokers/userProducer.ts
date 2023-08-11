
import { kafka } from '../../config/kafkaClient';



const producer =  kafka.producer()

export const userProducer = async (sendData:any,topic:string) => {
    try {
        if (!sendData) {
            throw new Error("Invalid sendData");
        }
        await producer.connect()
        console.log('producer connected ///////////////////');
        console.log(sendData,'///////sendData');
        const messagePayload = {
            type: 'insertUser',
            data: sendData // Your actual data here
        };
        await producer.send({
            topic: topic,
            messages: [{ value: JSON.stringify(messagePayload)}]
        })
    } catch (err) {
        throw err
    } finally {
        await producer.disconnect()
    }
}
