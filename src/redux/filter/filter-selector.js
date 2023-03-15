import { createSelector } from '@reduxjs/toolkit';
import { getContacts } from 'redux/contacts/contacts-selector';

export const selectFilter = state => state.filter;

export const selectVisibleContacts = createSelector(
  [selectFilter, getContacts],
  (filter, contacts) => {
    const normalizeFilter = filter.trim().toLowerCase();

    return contacts.filter(contact =>
      contact.name.trim().toLowerCase().includes(normalizeFilter)
    );
  }
);
