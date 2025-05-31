import { ContactItem } from './ContactItem';

export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <ul>
      {contacts.map(({ id, name }) => (
        <ContactItem key={id} id={id} name={name} onDelete={onDeleteContact} />
      ))}
    </ul>
  );
}