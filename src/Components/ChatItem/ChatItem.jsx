import { Link } from 'react-router-dom';
import './ChatItem.css';

const ChatItem = ({ contact, isActive }) => {
    return (
        <div className={`chat-item ${isActive ? 'chat-item--active' : ''}`}>
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
    );
};

export default ChatItem;
