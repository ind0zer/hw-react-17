export const ContactItem = ({ id, name, onDelete }) => {
    return <li>
    {name}{' '}
    <button onClick={() => onDelete(id)} style={{ marginLeft: 10 }}>
      Delete
    </button>
  </li>
  }
  
  