import { Link } from 'react-router-dom';
import './ChatItem.css';

const ChatItem = ({ contact, isActive, lastMessagePreview }) => {
    const statusText = contact.isConected
        ? 'En línea'
        : `Última conexión: ${contact.last_connection}`;

    return (
        <div className={`chat-item ${isActive ? 'chat-item--active' : ''}`}>
            <Link to={`/chat/${contact.id}`} className="chat-item-link">
                <img
                    src={contact.profile_pic}
                    alt={contact.user_name}
                    className="chat-item-avatar"
                />

                <div className="chat-item-info">
                    <div className="chat-item-top">
                        <h2 className="chat-item-name">{contact.user_name}</h2>

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
                            {statusText}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default ChatItem;
