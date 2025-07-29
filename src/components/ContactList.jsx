import { ContactItem } from './ContactItem';
import { useContacts } from '../contexts/ContactsContext';

export const ContactList = () => {
  const { getFilteredContacts, deleteContact } = useContacts();
  const filteredContacts = getFilteredContacts();

  return (
    <ul className="contact-list">
      {filteredContacts.map(({ id, name, number }) => (
        <ContactItem 
          key={id} 
          id={id} 
          name={name} 
          number={number}
          onDelete={deleteContact} 
        />
      ))}
    </ul>
  );
};