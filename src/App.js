import "./App.css";
import React from "react";
import { ContactsProvider } from "./contexts/ContactsContext";
import { ContactForm } from "./components/ContactForm";
import { Filter } from "./components/Filter";
import { ContactList } from "./components/ContactList";

const App = () => {
  return (
    <ContactsProvider>
      <div className="phonebook">
        <h1>Phonebook</h1>
        <ContactForm />

        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </div>
    </ContactsProvider>
  );
};

export default App;
