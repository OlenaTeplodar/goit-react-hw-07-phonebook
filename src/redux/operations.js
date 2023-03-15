import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix';
import {
  getAllContacts,
  addContactData,
  deleteContactById,
} from './contacts-axios';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllContacts();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (data, { rejectWithValue }) => {
    try {
      const result = await addContactData(data);
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
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

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await deleteContactById(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
