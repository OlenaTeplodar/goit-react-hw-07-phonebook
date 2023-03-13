import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix';
import axios from 'axios';

axios.defaults.baseURL = 'https://6407a22d8ee73db92e2e5659.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (data, thunkAPI) => {
    try {
      const { data: result } = await axios.post('/contacts', data);
      return result;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  },
  {
    condition: ({ name, number }, { getState }) => {
      const { contacts } = getState();
      const isNameAdded = contacts.items.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );
      const isNumberAdded = contacts.items.some(
        contact => contact.number === number
      );
      if (isNameAdded) {
        Notify.failure(`${name} is alredy in contacts`);
        return false;
      } else if (isNumberAdded) {
        Notify.failure(`${number} is alredy in contacts`);
        return false;
      }
    },
  }
);

export const deleteContactById = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const { response } = await axios.delete(`/contacts/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
