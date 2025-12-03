import React from 'react';
import { Link } from 'react-router-dom';
import AddNewContact from "../../Components/AddNewContact/AddNewContact";

const ChatList = ({ contacts, addNewContact }) => {

    if (!contacts) return null;

    return (
        <div>
            {contacts.map((contact) => (
                <div key={contact.id}>
                    <Link to={`/chat/${contact.id}`}>
                        <img width="50px" src={contact.profile_pic} />
                        <h2>{contact.user_name}</h2>
                        <span>Ultima conexión: {contact.last_connection}</span>
                    </Link>
                    <hr />
                </div>
            ))}

            <AddNewContact addNewContact={addNewContact} />
        </div>
    );
};

export default ChatList;
