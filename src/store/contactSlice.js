import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const fetchContacts = async () => {
  try {
    const response = await fetch('https://contact.herokuapp.com/contact');
    const data = await response.json();
    return data.data; 
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

const addContact = async (contactData) => {
  try {
    const response = await fetch('https://contact.herokuapp.com/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

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
      });
  },
});

export default contactSlice.reducer;
