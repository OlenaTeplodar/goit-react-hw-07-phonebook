import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getContacts } from 'redux/contacts/contacts-selector';
import { fetchContacts } from 'redux/operations';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

const App = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const isContacts = Boolean(contacts.length);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      {isContacts && <Filter />}
      {isContacts && <ContactList />}
      {!isContacts && <p>No contacts in list</p>}
    </div>
  );
};

export default App;
