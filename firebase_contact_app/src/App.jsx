import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase.js";
import ContactCard from "./components/ContactCard.jsx";
import AddAndUpdateContact from "./components/AddAndUpdateContact.jsx";
import useDisclouse from "./hooks/useDisclouse.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from "./components/NotFoundContact.jsx";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsCollectionRef = collection(db, "Contacts");

        onSnapshot(contactsCollectionRef, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
          setContacts(contactsList);
          return contactsList;
        });
      } catch (error) {
        console.error("Error fetching contacts: ", error);
      }
    };

    getContacts();
  }, []);

  const filteredContacts = (e) => {
    const searchValue = e.target.value;

    const contactsCollectionRef = collection(db, "Contacts");

    onSnapshot(contactsCollectionRef, (snapshot) => {
      const contactsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      const filteredContacts = contactsList.filter((contact) =>
        contact.name.toLowerCase().includes(searchValue.toLowerCase())
      );

      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4 border border-white min-h-lvh">
        <Navbar />
        <div className="flex gap-2 items-center my-4">
          <div className="flex relative items-center flex-grow">
            <FiSearch className="text-white text-3xl absolute ml-2" />
            <input
              onChange={filteredContacts}
              type="text"
              className="bg-transparent border border-white rounded-md h-10 flex-grow text-white pl-10"
              placeholder="Search contacts"
            />
          </div>
          <div>
            <FaPlusCircle
              onClick={onOpen}
              className="text-white text-4xl cursor-pointer"
            />
          </div>
        </div>
        {/* Display contacts */}
        <div className="mt-4  flex flex-col gap-1">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="top-center" />
    </>
  );
};

export default App;
