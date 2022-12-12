import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ContactInfo } from './components/ContactInfo';
import { Header } from './components/Header';
import { Table } from './components/Table';
import { Contact } from './types/Contact';

const state = [
  {
    id: uuidv4(),
    name: 'Max',
    lastName: 'Verbko',
    address: 'Zhilyanska 35, 56',
    city: 'Kyiv',
    country: 'Ukraine',
    emails: ['MaxVerbko@gmail.com'],
    phoneNumbers: ['0509856321'],
  },
  {
    id: uuidv4(),
    name: 'Julia',
    lastName: 'Bondarenko',
    address: 'N. Alekseenko, 21',
    city: 'Dnipro',
    country: 'Ukraine',
    emails: ['JBondarenko@gmail.com', 'JuliaBondarenko@gmail.com'],
    phoneNumbers: ['0977407405', '0671123581'],
  },
  {
    id: uuidv4(),
    name: 'Den',
    lastName: 'Mosyagin',
    address: 'Horodotska 2, 18',
    city: 'Lviv',
    country: 'Ukraine',
    emails: ['Mosyagin@gmail.com',
      'DenMosyagin@gmail.com',
      'MosyaginDen@gmail.com'],
    phoneNumbers: ['0639988556', '0975522119'],
  },
];

export const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[] | []>(state);
  const [visibleContactInfo, setVisibleContactInfo] = useState(false);
  const [editContact, setEditContact] = useState({
    id: '',
    name: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    emails: [''],
    phoneNumbers: [''],
  });

  const addContact = (newContact: Contact) => {
    setVisibleContactInfo(false);
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (idContact: string) => {
    setContacts(prevContacts => prevContacts.filter(
      ({ id }) => id !== idContact,
    ));
  };

  const updateContact = useCallback(
    (updatedContact: Contact) => {
      setContacts(currentContacts => currentContacts.map((contact) => (
        contact.id === updatedContact.id
          ? {
            ...contact,
            name: updatedContact.name,
            lastName: updatedContact.lastName,
            address: updatedContact.address,
            city: updatedContact.city,
            country: updatedContact.country,
            emails: updatedContact.emails,
            phoneNumbers: updatedContact.phoneNumbers,
          }
          : contact)));
    }, [contacts],
  );

  return (
    <div className="phoneContacts">
      <Header />
      <div className="phoneContacts__content">
        {!visibleContactInfo && (
          <Table
            contacts={contacts}
            setVisibleContactInfo={setVisibleContactInfo}
            deleteContact={deleteContact}
            setEditContact={setEditContact}
          />
        )}

        {visibleContactInfo && (
          <ContactInfo
            contacts={contacts}
            addContact={addContact}
            setVisibleContactInfo={setVisibleContactInfo}
            editContact={editContact}
            setEditContact={setEditContact}
            updateContact={updateContact}
          />
        )}

      </div>
    </div>
  );
};
