import { createSlice } from '@reduxjs/toolkit';

// Helper to get saved data
const savedMessages = JSON.parse(localStorage.getItem('chatHistory')) || [];

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: savedMessages, // Start with saved data!
    role: "User"
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
      // SAVE TO DISK: Update localStorage every time a message is added
      localStorage.setItem('chatHistory', JSON.stringify(state.messages));
    },
    clearChat: (state) => {
      state.messages = [];
      localStorage.removeItem('chatHistory');
    }
  }
});

export const { addMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;