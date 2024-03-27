// contactSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts } from '../services/services';

export const fetchContactsAsync = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await fetchContacts();
    return response;
  }
);

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    contacts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchContactsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.contacts = action.payload;
      })
      .addCase(fetchContactsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;
