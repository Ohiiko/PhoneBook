import { SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Contact } from '../types/Contact';

type Props = {
  contacts: Contact[],
  addContact:(contact: Contact) => void,
  setVisibleContactInfo: (condition: boolean) => void,
  editContact: Contact,
  setEditContact: (contact: Contact) => void,
  updateContact:(contact: Contact) => void,
};

export const ContactInfo: React.FC<Props> = ({

  addContact,
  setVisibleContactInfo,
  editContact,
  setEditContact,
  updateContact,
}) => {
  const [countEmail, setCountEmail] = useState(editContact.emails.length);
  const [countNumber, setCountNumber] = useState(
    editContact.phoneNumbers.length,
  );
  const [name, setName] = useState(editContact.name);
  const [lastName, setlastName] = useState(editContact.lastName);
  const [address, setAddress] = useState(editContact.address);
  const [city, setCity] = useState(editContact.city);
  const [country, setCountry] = useState(editContact.country);
  const [email, setEmail] = useState(editContact.emails);
  const [phoneNumber, setPhoneNumber] = useState(editContact.phoneNumbers);

  const handleEmailChange = (index: number, value: string) => {
    setEmail(prev => ({ ...prev, [index]: value }));
  };

  const handlePhoneNumberChange = (index: number, value: string) => {
    setPhoneNumber(prev => ({ ...prev, [index]: value }));
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setInputName: (value: string) => void,
  ) => {
    setInputName(event.target.value);
  };

  const addInput = (count: number,
    setCount: { (value: SetStateAction<number>): void;
      (arg0: number): void; }) => {
    setCount(count + 1);
  };

  const newContact = (contactId = uuidv4()) => {
    return (
      {
        id: contactId,
        name,
        lastName,
        address,
        city,
        country,
        emails: Object.values(email),
        phoneNumbers: Object.values(phoneNumber),
      }
    );
  };

  const clearForm = () => {
    return (
      {
        id: '',
        name: '',
        lastName: '',
        address: '',
        city: '',
        country: '',
        emails: [''],
        phoneNumbers: [''],
      }
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editContact.id.length) {
      updateContact(newContact(editContact.id));
    } else {
      addContact(newContact());
    }

    setVisibleContactInfo(false);
    setEditContact(clearForm());
  };

  return (
    <>
      <div className="content">
        <h2 className="content__title">Register new contact</h2>
      </div>
      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label">
            Name:
            <div className="control">
              <input
                key="name"
                className="input"
                type="text"
                placeholder="Enter the Name"
                value={name}
                onChange={(event) => handleChange(event, setName)}
              />
            </div>
          </label>
        </div>
        <div className="field">
          <label className="label">
            Last Name:
            <div className="control">
              <input
                key="lastName"
                className="input"
                type="text"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(event) => handleChange(event, setlastName)}
              />
            </div>
          </label>
        </div>
        <div className="field">
          <label className="label">
            Address:
            <div className="control">
              <input
                key="address"
                className="input"
                type="text"
                placeholder="Enter Address"
                value={address}
                onChange={(event) => handleChange(event, setAddress)}
              />
            </div>
          </label>
        </div>
        <div className="field">
          <label className="label">
            City:
            <div className="control">
              <input
                key="city"
                className="input"
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={(event) => handleChange(event, setCity)}
              />
            </div>
          </label>
        </div>
        <div className="field">
          <label className="label">
            Counrty:
            <div className="control">
              <input
                key="country"
                className="input"
                type="text"
                placeholder="Enter counrty"
                value={country}
                onChange={(event) => handleChange(event, setCountry)}
              />
            </div>
          </label>
        </div>
        <div className="field">
          <label className="label">
            Email:
            <div
              className="control"

            >
              {[...Array(countEmail)].map((_, index) => (
                <input
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  id={`${index}`}
                  className="input"
                  type="email"
                  placeholder="Enter the Email"
                  value={email[index]}
                  onChange={(event => handleEmailChange(
                    index, event.target.value,
                  ))}
                />
              ))}
              <button
                type="button"
                className="button is-info"
                onClick={() => addInput(countEmail, setCountEmail)}
              >
                Add
              </button>
            </div>
          </label>
        </div>
        <div className="field">
          <label className="label">
            Number:
            <div
              className="control"
            >
              {[...Array(countNumber)].map((_, index) => (
                <input
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  id={`${index}`}
                  className="input"
                  type="tel"
                  placeholder="Enter the Number"
                  value={phoneNumber[index]}
                  onChange={(event => handlePhoneNumberChange(
                    index, event.target.value,
                  ))}
                />
              ))}
              <button
                type="button"
                className="button is-info"
                onClick={() => addInput(countNumber, setCountNumber)}
              >
                Add
              </button>
            </div>
          </label>
        </div>
        <button
          type="submit"
          className="button is-info"
        >
          Save
        </button>
      </form>
    </>
  );
};
