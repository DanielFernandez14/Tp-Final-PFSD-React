import React from 'react';
import './MessagesList.css';

const MessagesList = ({ messages }) => {
    return (
        <div className="message-list">
            {messages.length === 0 ? (
                <span className="message-list-empty">
                    Aun no has chateado, envia un mensaje para hacerlo
                </span>
            ) : (
                messages.map((message) => {
                    const isMe = message.sender === 'me';

                    return (
                        <div
                            key={message.id}
                            className={`message-item ${
                                isMe ? 'message-me' : 'message-contact'
                            } ${
                                message.status === 'VIEWED'
                                    ? 'message-read'
                                    : 'message-unread'
                            }`}
                        >
                            <h3 className="message-author">{message.author_name}</h3>
                            <p className="message-content">{message.content}</p>
                            <span className="message-date">{message.created_at}</span>
                            <span className="message-status">
                                {message.status === 'VIEWED'
                                    ? <span>Leído</span>
                                    : <span>No leído</span>
                                }
                            </span>
                            <hr className="message-divider" />
                        </div>
                    );
                })
            )}
        </div>

        
    );
    
};


export default MessagesList;
