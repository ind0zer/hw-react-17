import { ContactItem } from './ContactItem';
import { useContactsSearch } from '../hooks/useContactsSearch';
import { useContacts } from '../contexts/ContactsContext';

export const ContactList = () => {
  const { deleteContact, clearAllContacts } = useContacts();
  const { filteredContacts, hasFilter, hasResults, totalContacts, filteredCount } = useContactsSearch();

  if (totalContacts === 0) {
    return <p>No contacts found</p>;
  }

  return (
    <div>
      <div className="contacts-info" style={{ marginBottom: '10px', fontSize: 'small', color: '#666' }}>
        {hasFilter ? (
          <span>Showing {filteredCount} of {totalContacts} contacts</span>
        ) : (
          <span>Total contacts: {totalContacts}</span>
        )}
        {totalContacts > 0 && (
          <button
            onClick={clearAllContacts}
            style={{
              marginLeft: '10px',
              padding: '4px 8px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: 'small'
            }}
          >
            Clear All
          </button>
        )}
      </div>
      
      {hasFilter && !hasResults ? (
        <p>No contacts match your search</p>
      ) : (
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
      )}
    </div>
  );
};