
import { kafka } from '../../../config/kafkaClient';



const producer =  kafka.producer()

export const adminProducer = async (sendData:any,topic:string,type:string) => {
    try {
        if (!sendData) {
            throw new Error("Invalid sendData");
        }
        await producer.connect()
        console.log('producer connected ///////////////////');
        console.log(sendData,'///////sendData');
        const messagePayload = {
            type: type,
            data: sendData // Your actual data here
        };
        const result:any =  await producer.send({
            topic: topic,
            messages: [{ value: JSON.stringify(messagePayload)}]
        })

          // Check for errors
          console.log(result,'////////////result');
          if (result && result[0] && result[0]?.error) {
             throw new Error('Message production failed')
         }
    } catch (err) {
        throw err
    } finally {
        await producer.disconnect()
    }
}
