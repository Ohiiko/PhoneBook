import { Contact } from '../types/Contact';
import { TableItem } from './TableItem';

type Props = {
  contacts: Contact[],
  setVisibleContactInfo:(condition: boolean) => void
  deleteContact: (id: string) => void,
  setEditContact: (contact: Contact) => void
};

export const Table: React.FC<Props> = ({
  contacts,
  setVisibleContactInfo,
  deleteContact,
  setEditContact,
}) => {
  const onContactInfo = () => {
    setVisibleContactInfo(true);
  };

  return (
    <>
      <div className="content">
        <h2 className="content__title">Contacts</h2>
        <div className="buttons">
          <button
            type="button"
            className="button is-info"
            onClick={onContactInfo}
          >
            Add Contact
          </button>
        </div>
      </div>
      <table
        className="table
          is-bordered
          is-striped
          is-narrow
          is-hoverable
          is-fullwidth"
      >
        <thead>
          <tr>
            <th title="Name">Name</th>
            <th title="Last Name">Last Name</th>
            <th title="Address">Address</th>
            <th title="City">City</th>
            <th title="Country">Country</th>
            <th title="Email">Email</th>
            <th title="Number">Number</th>
            <th title="Edit">Edit</th>
            <th title="Delete">Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <TableItem
                contact={contact}
                key={contact.id}
                deleteContact={deleteContact}
                setVisibleContactInfo={setVisibleContactInfo}
                setEditContact={setEditContact}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};
