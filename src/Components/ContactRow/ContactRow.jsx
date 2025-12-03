import React from 'react';
import { Link } from 'react-router-dom';
import './ContactRow.css';

const ContactRow = ({ contact, isActive }) => {
    const hasMessages = contact.messages && contact.messages.length > 0;
    const lastMessage = hasMessages
        ? contact.messages[contact.messages.length - 1]
        : null;

    const getLastMessageText = () => {
        if (!lastMessage) return 'Sin mensajes aún';
        if (!lastMessage.content) return 'Sin contenido';

        const text = lastMessage.content;
        return text.length > 35 ? text.slice(0, 35) + '...' : text;
    };

    const getLastMessageTime = () => {
        if (lastMessage && lastMessage.created_at) return lastMessage.created_at;
        return contact.last_connection;
    };

    return (
        <div className={`contact-row ${isActive ? 'contact-row--active' : ''}`}>
            <Link to={`/chat/${contact.id}`} className="contact-row-link">
                <img
                    src={contact.profile_pic}
                    alt={contact.user_name}
                    className="contact-row-avatar"
                />
                <div className="contact-row-info">
                    <div className="contact-row-header">
                        <h2>{contact.user_name}</h2>
                        <span className="contact-row-time">
                            {getLastMessageTime()}
                        </span>
                    </div>
                    <span className="contact-row-last-message">
                        {getLastMessageText()}
                    </span>
                </div>
            </Link>
        </div>
    );
};

export default ContactRow;
