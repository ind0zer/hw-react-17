import { useRef, useEffect } from 'react';
import { useContactForm } from '../hooks/useContactForm';

export const ContactForm = () => {
  const nameInputRef = useRef(null);
  const { formState, setField, handleSubmit } = useContactForm();

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleNameChange = (e) => {
    setField('name', e.target.value);
  };

  const handleNumberChange = (e) => {
    setField('number', e.target.value);
  };

  const onSubmit = async (e) => {
    const success = await handleSubmit(e);
    if (success) {
      nameInputRef.current?.focus();
    }
  };

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          ref={nameInputRef}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-yaА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={formState.name}
          onChange={handleNameChange}
          disabled={formState.isSubmitting}
        />
        {formState.errors.name && (
          <span className="error-message" style={{ color: 'red', fontSize: 'small' }}>
            {formState.errors.name}
          </span>
        )}
      </div>
      <div className="form-group">
        <label>Number</label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={formState.number}
          onChange={handleNumberChange}
          disabled={formState.isSubmitting}
        />
        {formState.errors.number && (
          <span className="error-message" style={{ color: 'red', fontSize: 'small' }}>
            {formState.errors.number}
          </span>
        )}
      </div>
      <button 
        className="btn" 
        type="submit"
        disabled={formState.isSubmitting}
      >
        {formState.isSubmitting ? 'Adding...' : 'Add contact'}
      </button>
    </form>
  );
};
