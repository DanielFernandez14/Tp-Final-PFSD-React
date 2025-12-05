import React from 'react';
import MessageOptions from '../MessageOptions/MessageOptions';
import './MessagesList.css';

const MessagesList = ({ messages, onDeleteMessage }) => {
    const handleCopySuccess = () => {
        console.log('Mensaje copiado al portapapeles');
    };

    const safeMessages = Array.isArray(messages) ? messages : [];

    return (
        <div className="message-list">
            <div className="message-list-inner">
                {safeMessages.length === 0 ? (
                    <span className="message-list-empty">
                        No has chateado, envia un mensaje para hacerlo.
                    </span>
                ) : (
                    safeMessages.map((message) => {
                        const isMe = message.sender === 'me';
                        const normalizedStatus = String(message.status || '').toLowerCase();

                        const isRead =
                            normalizedStatus === 'viewed' ||
                            normalizedStatus === 'visto';

                        return (
                            <div
                                key={message.id}
                                className={`message-item ${
                                    isMe ? 'message-me' : 'message-contact'
                                } ${isRead ? 'message-read' : 'message-unread'}`}
                            >
                                <div className="message-header">
                                    <h3 className="message-author">
                                        {message.author_name}
                                    </h3>

                                    <MessageOptions
                                        message={message}
                                        onDelete={onDeleteMessage}
                                        onCopy={handleCopySuccess}
                                        isOwnMessage={isMe}
                                    />
                                </div>

                                <p className="message-content">{message.content}</p>

                                <div className="message-footer">
                                    <span className="message-date">
                                        {message.created_at}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default MessagesList;
