import { kafka } from "../../config/kafkaClient";
import { handleMessage } from "./handleMessage";



const consumer = kafka.consumer({
    groupId: 'admin-service'
})

export const consumeUser = async () => {
    try {
        await consumer.connect()
        console.log('consumer connected');
        
        await consumer.subscribe({ topic: 'add-post', fromBeginning: true })
        await consumer.run({
            eachMessage: async ({ message }:any) => {
                
                const parsedMessage = JSON.parse(message.value);
                const messageType = parsedMessage.type; // Extract the 'type' property
                handleMessage(parsedMessage.data,messageType)
                console.log("Received message type:", messageType);
                console.log("Parsed message:", parsedMessage);
            }
        })
    } catch (err) {
        console.log('//////////errror///////',err);
        
    }

}



