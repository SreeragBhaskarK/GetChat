import { createSlice } from "@reduxjs/toolkit";
import { act } from 'react-dom/test-utils'
interface MessageCount {
    messages_count: {
        recipientId: string
        count: number
        message:{}
    }[]
    notification_indication: boolean

}
const initialState: MessageCount = {
    messages_count: [],
    notification_indication: false
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        increaseMessageCount(state, actions) {
            console.log(actions.payload, '///////in');

            const result = state.messages_count.findIndex((message) => message.recipientId == actions.payload.recipientId)
            console.log(result);

            if (result != -1) {
                state.messages_count[result].count += 1
                state.messages_count[result].message =actions.payload.message
            } else {
                state.messages_count.push({ recipientId: actions.payload.recipientId, count: 1,message:actions.payload.message })
            }

        },
        decreamentMessageCount(state, actions) {
            const result = state.messages_count.findIndex((message) => message.recipientId == actions.payload)
            console.log(result);

            if (result != -1) {
                state.messages_count[result].count = 0
          /*       state.messages_count[result].message=actions.payload.message */
            }
        },
        addNotification(state, actions) {
            state.notification_indication = true
        },
        watchNotification(state, actions) {
            state.notification_indication = actions.payload
        }

    }
})

export const { increaseMessageCount, decreamentMessageCount,addNotification,watchNotification } = messageSlice.actions
export default messageSlice.reducer