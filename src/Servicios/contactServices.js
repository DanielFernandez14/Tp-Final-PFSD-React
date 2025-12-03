import contacts from "../data/contacts_data";

function getContacts() {
    return contacts;
}

function getContactById(id) {
    const contact_found = contacts.find(
        (contact) => Number(contact.id) === Number(id)
    );

    if (!contact_found) {
        return null;
    } else {
        return contact_found;
    }
}

export { getContacts, getContactById };
