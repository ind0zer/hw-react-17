import { useMemo } from 'react';
import { useContacts } from '../contexts/ContactsContext';

export const useContactsSearch = () => {
  const { contacts, filter, handleFilterChange } = useContacts();

  const filteredContacts = useMemo(() => {
    if (!filter) return contacts;
    
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
    );
  }, [contacts, filter]);

  const searchStats = useMemo(() => {
    return {
      totalContacts: contacts.length,
      filteredCount: filteredContacts.length,
      hasFilter: Boolean(filter),
      hasResults: filteredContacts.length > 0,
    };
  }, [contacts.length, filteredContacts.length, filter]);

  return {
    filteredContacts,
    filter,
    handleFilterChange,
    ...searchStats,
  };
}; 