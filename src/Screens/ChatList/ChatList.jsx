import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddNewContact from "../../Components/AddNewContact/AddNewContact";
import ContactSearchBar from "../../Components/ContactSearchBar/ContactSearchBar";
import './ChatList.css';

const ChatList = ({ contacts, addNewContact, selectedChatId }) => {

    const [searchTerm, setSearchTerm] = useState('');

    if (!contacts) return null;

    const filteredContacts = contacts.filter((contact) =>
        contact.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="chat-list">
            <div className="chat-list-header">
                <h1>Chat-UTN</h1>
            </div>

            <ContactSearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <div className="chat-list-items">
                {filteredContacts.length === 0 ? (
                    <span className="no-contacts">
                        No se encontraron contactos
                    </span>
                ) : (
                    filteredContacts.map((contact) => (
                        <div
                            key={contact.id}
                            className={
                                `chat-item ${
                                    Number(contact.id) === Number(selectedChatId)
                                        ? 'chat-item--active'
                                        : ''
                                }`
                            }
                        >
                            <Link to={`/chat/${contact.id}`} className="chat-item-link">
                                <img
                                    src={contact.profile_pic}
                                    alt={contact.user_name}
                                    className="chat-item-avatar"
                                />
                                <div className="chat-item-info">
                                    <h2>{contact.user_name}</h2>
                                    <span>Última conexión: {contact.last_connection}</span>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>
            <div className="chat-list-add-contact">
                <AddNewContact addNewContact={addNewContact} />
            </div>
        </div>
    );
};

export default ChatList;