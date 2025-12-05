import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MessagesList from '../MessagesList/MessagesList';
import CreateNewMessage from '../CreateNewMessage/CreateNewMessage';
import AutoReply from '../AutoReply/AutoReply';
import './ChatDetail.css';

const ChatDetail = ({ chatDetail, createNewMessage, deleteMessage }) => {
    const [autoReplyActive, setAutoReplyActive] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatDetail?.messages]);

    useEffect(() => {
        setAutoReplyActive(false);
        setMessageCount(0);
    }, [chatDetail?.id]);

    if (!chatDetail) {
        return (
            <div className="chat-detail">
                <div className="chat-header">
                    <h2>Seleccioná un contacto</h2>
                </div>
                <div className="messages-container">
                    <div className="messages-container-inner">
                        <span className="no-chat-selected">
                            No hay conversación seleccionada.
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    const handleSendMessage = (text) => {
        const newCount = messageCount + 1;
        
        createNewMessage(text, 'me');
        setMessageCount(newCount);
        setAutoReplyActive(true);
    };

    const handleAutoReply = (text) => {
        createNewMessage(text, 'contact');
        setAutoReplyActive(false);
    };

    const handleBackClick = () => {
        navigate('/chat');
    };

    const handleDeleteMessage = (messageId) => {
        deleteMessage(messageId);
    };

    return (
        <div className="chat-detail">
            <div className="chat-header">
                <button className="back-button" onClick={handleBackClick} aria-label="Volver">
                    ←
                </button>
                <h2>{chatDetail.user_name || chatDetail.author_name || chatDetail.name}</h2>
            </div>

            <div className="messages-container">
                <div className="messages-container-inner">
                    <MessagesList 
                        messages={chatDetail.messages}
                        onDeleteMessage={handleDeleteMessage}
                    />

                    <AutoReply
                        active={autoReplyActive}
                        onReply={handleAutoReply}
                        messageCount={messageCount}
                    />
                    
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="chat-footer">
                <CreateNewMessage createNewMessage={handleSendMessage} />
            </div>
        </div>
    );
};

export default ChatDetail;