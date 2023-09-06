import { createSlice } from "@reduxjs/toolkit";
import { act } from 'react-dom/test-utils'
interface MessageCount {
    messages_count: {
        recipientId: string
        count: number
    }[]

}
const initialState: MessageCount = {
    messages_count: []
}

const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        increaseMessageCount(state, actions) {
            console.log(actions.payload, '///////in');

            const result = state.messages_count.findIndex((message) => message.recipientId == actions.payload)
            console.log(result);

            if (result != -1) {
                state.messages_count[result].count += 1
            } else {
                state.messages_count.push({ recipientId: actions.payload, count: 1 })
            }

        },
        decreamentMessageCount(state, actions) {
            const result = state.messages_count.findIndex((message) => message.recipientId == actions.payload)
            console.log(result);

            if (result != -1) {
                state.messages_count[result].count = 0
            }
        }
    }
})

export const { increaseMessageCount, decreamentMessageCount } = messageSlice.actions
export default messageSlice.reducer