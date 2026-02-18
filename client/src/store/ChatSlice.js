import { createSlice } from '@reduxjs/toolkit';

const ChatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [], // Saari chat history yahan rahegi
    activeRole: 'Senior Developer',
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setRole: (state, action) => {
      state.activeRole = action.payload;
    },
  },
});

export const { addMessage, setRole } = ChatSlice.actions;
export default ChatSlice.reducer;