export const Filter = ({ value, onChange }) => {
  return (
    <div className="filter">
      <label>
        Find contacts by name
        <input type="text" value={value} onChange={onChange} />
      </label>
    </div>
  );
};
  
  