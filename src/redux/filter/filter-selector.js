import { createSelector } from '@reduxjs/toolkit';
import { getContacts } from 'redux/contacts/contacts-selector';

export const getFilter = state => state.filter;

export const selectVisibleContacts = createSelector(
  [getFilter, getContacts],
  (filter, contacts) => {
    const normalizeFilter = filter.trim().toLowerCase();

    return contacts.filter(contact =>
      contact.name.trim().toLowerCase().includes(normalizeFilter)
    );
  }
);
