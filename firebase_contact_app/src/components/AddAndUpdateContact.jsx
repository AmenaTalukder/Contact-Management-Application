import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Modal from "./Model";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid Email Address")
    .required("Email is required")
});

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "Contacts");
      await addDoc(contactRef, contact);
      toast("Contact added successfully");
      onClose();
    } catch (error) {
      console.error("Error adding contact: ", error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "Contacts", id);
      await updateDoc(contactRef, contact);
      toast("Contact update successfully");
      onClose();
    } catch (error) {
      console.error("Error updating contact: ", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        validationSchema={contactSchemaValidation}
        initialValues={
          isUpdate
            ? {
                name: contact.name,
                email: contact.email
              }
            : { name: "", email: "" }
        }
        onSubmit={(values) => {
          console.log(values);
          isUpdate ? updateContact(values, contact.id) : addContact(values);
        }}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-1 ">
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-medium">
                Name
              </label>
              <Field
                name="name"
                type="text"
                className="border rounded-lg h-9 p-2"
                placeholder="Enter contact name"
              />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="name" component="div" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium">
                Email
              </label>
              <Field
                name="email"
                type="email"
                className="border rounded-lg h-9 p-2"
                placeholder="Enter contact @gmail"
              />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="email" component="div" />
              </div>
            </div>
            <button className="bg-orange px-3 py-1.5 border rounded-lg self-center">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddAndUpdateContact;
