import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://6407a22d8ee73db92e2e5659.mockapi.io/contacts',
});

export const getAllContacts = async () => {
  const { data } = await contactsInstance.get('/');
  return data;
};

export const addContactData = async data => {
  const { data: result } = await contactsInstance.post('/', data);
  return result;
};

export const deleteContactById = async id => {
  const { data } = await contactsInstance.delete(`/${id}`);
  return data;
};
