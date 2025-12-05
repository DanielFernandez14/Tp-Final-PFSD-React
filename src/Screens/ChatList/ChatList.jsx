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

    const getLastMessagePreview = (contact) => {
        if (!contact.messages || contact.messages.length === 0) {
            return 'Sin mensajes';
        }

        const lastMessage = contact.messages[contact.messages.length - 1];
        const text = (lastMessage.content || '').trim();

        if (!text) return 'Sin mensajes';

        const words = text.split(/\s+/);
        const maxWords = 2;

        if (words.length <= maxWords) {
            return words.join(' ');
        }

        return `${words.slice(0, maxWords).join(' ')}...`;
    };

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
                    filteredContacts.map((contact) => {
                        const isActive =
                            Number(contact.id) === Number(selectedChatId);
                        const lastMessagePreview = getLastMessagePreview(contact);

                        return (
                            <div
                                key={contact.id}
                                className={`chat-item ${
                                    isActive ? 'chat-item--active' : ''
                                }`}
                            >
                                <Link
                                    to={`/chat/${contact.id}`}
                                    className="chat-item-link"
                                >
                                    <img
                                        src={contact.profile_pic}
                                        alt={contact.user_name}
                                        className="chat-item-avatar"
                                    />

                                    <div className="chat-item-info">
                                        <div className="chat-item-top">
                                            <h2 className="chat-item-name">
                                                {contact.user_name}
                                            </h2>

                                            <span className="chat-item-last-message">
                                                {lastMessagePreview}
                                            </span>
                                        </div>

                                        <div className="chat-item-bottom">
                                            <span
                                                className={`chat-item-status ${
                                                    contact.isConected
                                                        ? 'chat-item-status--online'
                                                        : ''
                                                }`}
                                            >
                                                {contact.isConected
                                                    ? 'En línea'
                                                    : `Última conexión: ${contact.last_connection}`}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="chat-list-add-contact">
                <AddNewContact addNewContact={addNewContact} />
            </div>
        </div>
    );
};

export default ChatList;
