import { Contact } from '../types/Contact';

type Props = {
  contact: Contact,
  setVisibleContactInfo: (agr: boolean) => void,
  deleteContact: (id: string) => void,
  setEditContact: (contact: Contact) => void;
};

export const TableItem: React.FC<Props> = ({
  contact,
  deleteContact,
  setVisibleContactInfo,
  setEditContact,
}) => {
  const {
    id,
    name,
    lastName,
    address,
    city,
    country,
    emails,
    phoneNumbers,
  } = contact;

  const onDeleteContact = () => {
    deleteContact(id);
  };

  const onEditContact = () => {
    setEditContact(contact);
    setVisibleContactInfo(true);
  };

  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{lastName}</td>
        <td>{address}</td>
        <td>{city}</td>
        <td>{country}</td>
        <td>
          {Object.values(emails).map((email, index) => {
            return (
              <div key={email} id={`${index}`}>
                {email}
              </div>
            );
          })}
        </td>
        <td>
          {Object.values(phoneNumbers).map((number, index) => {
            return (
              <div key={number} id={`${index}`}>
                {number}
              </div>
            );
          })}
        </td>
        <td>
          <div className="buttons">
            <button
              type="button"
              className="button is-success"
              onClick={onEditContact}
            >
              Edit
            </button>
          </div>
        </td>
        <td>
          <div className="buttons">
            <button
              type="button"
              className="button  is-danger"
              onClick={onDeleteContact}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
