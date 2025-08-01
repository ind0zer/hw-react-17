import { useReducer, useCallback } from 'react';
import { useContacts } from '../contexts/ContactsContext';

const initialFormState = {
  name: '',
  number: '',
  isSubmitting: false,
  errors: {},
};

const formActionTypes = {
  SET_FIELD: 'SET_FIELD',
  SET_SUBMITTING: 'SET_SUBMITTING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  RESET_FORM: 'RESET_FORM',
};

const formReducer = (state, action) => {
  switch (action.type) {
    case formActionTypes.SET_FIELD:
      return {
        ...state,
        [action.field]: action.value,
        errors: {
          ...state.errors,
          [action.field]: '',
        },
      };
    case formActionTypes.SET_SUBMITTING:
      return {
        ...state,
        isSubmitting: action.payload,
      };
    case formActionTypes.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.message,
        },
      };
    case formActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };
    case formActionTypes.RESET_FORM:
      return initialFormState;
    default:
      return state;
  }
};

export const useContactForm = () => {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const { addContact } = useContacts();

  const validateForm = useCallback(() => {
    const errors = {};
    
    if (!formState.name.trim()) {
      errors.name = 'Name is required';
    } else if (formState.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formState.number.trim()) {
      errors.number = 'Number is required';
    } else if (!/^\d{3}-\d{2}-\d{2}$/.test(formState.number.trim())) {
      errors.number = 'Number must be in format: 123-45-67';
    }

    return errors;
  }, [formState.name, formState.number]);

  const setField = useCallback((field, value) => {
    dispatch({ type: formActionTypes.SET_FIELD, field, value });
  }, []);

  const setError = useCallback((field, message) => {
    dispatch({ type: formActionTypes.SET_ERROR, field, message });
  }, []);

  const clearErrors = useCallback(() => {
    dispatch({ type: formActionTypes.CLEAR_ERRORS });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: formActionTypes.RESET_FORM });
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    dispatch({ type: formActionTypes.SET_SUBMITTING, payload: true });
    dispatch({ type: formActionTypes.CLEAR_ERRORS });

    const errors = validateForm();
    
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        dispatch({ type: formActionTypes.SET_ERROR, field, message });
      });
      dispatch({ type: formActionTypes.SET_SUBMITTING, payload: false });
      return false;
    }

    const success = addContact({
      name: formState.name.trim(),
      number: formState.number.trim(),
    });

    if (success) {
      dispatch({ type: formActionTypes.RESET_FORM });
    }

    dispatch({ type: formActionTypes.SET_SUBMITTING, payload: false });
    return success;
  }, [formState.name, formState.number, addContact, validateForm]);

  return {
    formState,
    setField,
    setError,
    clearErrors,
    resetForm,
    handleSubmit,
    validateForm,
  };
}; 