import { useState } from 'react';
import { Notify } from 'notiflix';
import { useSelector, useDispatch } from 'react-redux';

import { addNewContact } from 'redux/contacts/contacts-slice';
import { getContacts } from 'redux/contacts/contacts-selector';
import css from './ContactForm.module.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        throw new Error('This option is not true');
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const isNameAdded = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    const isNumberAdded = contacts.some(contact => contact.number === number);

    if (isNameAdded) {
      Notify.failure(`${name} is alredy in contacts`);
      return;
    } else if (isNumberAdded) {
      Notify.failure(`${number} is alredy in contacts`);
      return;
    }
    dispatch(addNewContact(name, number));
    setName('');
    setNumber('');
  };

  return (
    <div className={css.wrapper}>
      <div className={css.contactFormBlock}>
        <form onSubmit={handleSubmit}>
          <div className={css.container}>
            <label className={css.label} htmlFor={name}>
              Name
            </label>
            <input
              className={css.input}
              value={name}
              onChange={handleChange}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              id={name}
            />
          </div>
          <div className={css.container}>
            <label className={css.label} htmlFor={number}>
              Phone Number
            </label>
            <input
              className={css.input}
              value={number}
              onChange={handleChange}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </div>
          <button className={css.btnContactAdd} type="submit">
            Add contact
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
