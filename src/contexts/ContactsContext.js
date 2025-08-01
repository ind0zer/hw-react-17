import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { nanoid } from 'nanoid';

const ContactsContext = createContext();

const initialState = {
  contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
  filter: '',
};

const actionTypes = {
  SET_CONTACTS: 'SET_CONTACTS',
  ADD_CONTACT: 'ADD_CONTACT',
  DELETE_CONTACT: 'DELETE_CONTACT',
  SET_FILTER: 'SET_FILTER',
  CLEAR_CONTACTS: 'CLEAR_CONTACTS',
};

const contactsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case actionTypes.ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case actionTypes.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
      };
    case actionTypes.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case actionTypes.CLEAR_CONTACTS:
      return {
        ...state,
        contacts: [],
      };
    default:
      return state;
  }
};

export const useContacts = () => {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error('useContacts must be used within a ContactsProvider');
  }
  return context;
};

export const ContactsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contactsReducer, initialState);

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      dispatch({ type: actionTypes.SET_CONTACTS, payload: JSON.parse(savedContacts) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  const addContact = (contactData) => {
    const normalizedName = contactData.name.toLowerCase();
    const isExist = state.contacts.some(
      (contact) => contact.name.toLowerCase() === normalizedName
    );
    
    if (isExist) {
      alert(`${contactData.name} is already in contacts`);
      return false;
    }

    const newContact = {
      id: nanoid(),
      ...contactData,
    };

    dispatch({ type: actionTypes.ADD_CONTACT, payload: newContact });
    return true;
  };

  const deleteContact = (id) => {
    dispatch({ type: actionTypes.DELETE_CONTACT, payload: id });
  };

  const handleFilterChange = (value) => {
    dispatch({ type: actionTypes.SET_FILTER, payload: value });
  };

  const clearAllContacts = () => {
    dispatch({ type: actionTypes.CLEAR_CONTACTS });
  };

  const getFilteredContacts = () => {
    return state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(state.filter.toLowerCase())
    );
  };

  const value = {
    contacts: state.contacts,
    filter: state.filter,
    addContact,
    deleteContact,
    handleFilterChange,
    getFilteredContacts,
    clearAllContacts,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
}; 