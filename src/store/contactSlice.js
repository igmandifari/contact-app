import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts, addContact, updateContact, deleteContact } from '../services/services';

export const fetchContactsAsync = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await fetchContacts();
    return response;
  }
);

export const addContactAsync = createAsyncThunk(
  'contacts/addContact',
  async (contactData) => {
    const response = await addContact(contactData);
    return response;
  }
);

export const updateContactAsync = createAsyncThunk(
  'contacts/updateContact',
  async ({ contactId, updatedContactData }) => {
    const response = await updateContact(contactId, updatedContactData);
    return response;
  }
);

export const deleteContactAsync = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId) => {
    const response = await deleteContact(contactId);
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
      })
      .addCase(addContactAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addContactAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addContactAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateContactAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateContactAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(updateContactAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteContactAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteContactAsync.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(deleteContactAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default contactSlice.reducer;
