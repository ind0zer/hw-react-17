export const ContactItem = ({ id, name, number, onDelete }) => {
  return (
    <li className="contact-item">
      <div className="contact-info">
        <strong>{name}:</strong> {number}
      </div>
      <button className="btn btn-danger" onClick={() => onDelete(id)}>
        Delete
      </button>
    </li>
  );
};
  
  