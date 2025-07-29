import { ContactItem } from './ContactItem';

export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className="contact-list">
      {contacts.map(({ id, name, number }) => (
        <ContactItem 
          key={id} 
          id={id} 
          name={name} 
          number={number}
          onDelete={onDeleteContact} 
        />
      ))}
    </ul>
  );
};