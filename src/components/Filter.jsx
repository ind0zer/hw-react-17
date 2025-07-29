import { useRef } from 'react';
import { useContacts } from '../contexts/ContactsContext';

export const Filter = () => {
  const filterInputRef = useRef(null);
  const { filter, handleFilterChange } = useContacts();

  const handleChange = (e) => {
    handleFilterChange(e.target.value);
  };

  return (
    <div className="filter">
      <label>
        Find contacts by name
        <input 
          ref={filterInputRef}
          type="text" 
          value={filter} 
          onChange={handleChange} 
        />
      </label>
    </div>
  );
};
  
  