import contacts from "../data/contacts_data";

function getContacts() {
    return contacts;
}

function getContactById(id) {
    const contactFound = contacts.find(
        (contact) => Number(contact.id) === Number(id)
    );

    return contactFound || null;
}

export { getContacts, getContactById };
