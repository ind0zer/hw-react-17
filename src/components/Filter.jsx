import { useRef } from 'react';
import { useContactsSearch } from '../hooks/useContactsSearch';

export const Filter = () => {
  const filterInputRef = useRef(null);
  const { filter, handleFilterChange, totalContacts } = useContactsSearch();

  const handleChange = (e) => {
    handleFilterChange(e.target.value);
  };

  const clearFilter = () => {
    handleFilterChange('');
    filterInputRef.current?.focus();
  };

  if (totalContacts === 0) {
    return null;
  }

  return (
    <div className="filter">
      <label>
        Find contacts by name or number
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            ref={filterInputRef}
            type="text" 
            value={filter} 
            onChange={handleChange}
            placeholder="Search contacts..."
          />
          {filter && (
            <button
              type="button"
              onClick={clearFilter}
              style={{
                padding: '4px 8px',
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: 'small'
              }}
            >
              Clear
            </button>
          )}
        </div>
      </label>
    </div>
  );
};
  
  