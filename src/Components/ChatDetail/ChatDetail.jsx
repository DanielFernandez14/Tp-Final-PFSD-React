import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MessagesList from '../MessagesList/MessagesList';
import CreateNewMessage from '../CreateNewMessage/CreateNewMessage';
import AutoReply from '../AutoReply/AutoReply';
import UserProfileModal from '../UserProfileModal/UserProfileModal';
import EditContactModal from '../EditContactModal/EditContactModal';
import ChatHeader from '../ChatHeader/ChatHeader';
import './ChatDetail.css';

const ChatDetail = ({
    chatDetail,
    createNewMessage,
    deleteMessage,
    onEditContact,
    onDeleteContact,
    onShowContactInfo
}) => {
    const [autoReplyActive, setAutoReplyActive] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

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

    const contactName =
        chatDetail.user_name ||
        chatDetail.author_name ||
        chatDetail.name ||
        'Contacto';

    const contactStatus = chatDetail.isConected
        ? 'En línea'
        : chatDetail.last_connection
        ? `Última conexión: ${chatDetail.last_connection}`
        : 'Desconectado';

    const sortedMessages = [...(chatDetail.messages || [])].sort((a, b) => {
        const aTime = a.created_at_timestamp ?? 0;
        const bTime = b.created_at_timestamp ?? 0;
        return aTime - bTime;
    });

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

    const handleBackClick = (event) => {
        event.stopPropagation();
        navigate('/chat');
    };

    const handleDeleteMessage = (messageId) => {
        deleteMessage(messageId);
    };

    const handleHeaderClick = () => {
        if (onShowContactInfo) {
            onShowContactInfo();
        } else {
            setShowProfileModal(true);
        }
    };

    const handleCloseProfileModal = () => {
        setShowProfileModal(false);
    };

    const handleOpenEditModal = () => {
        setShowProfileModal(false);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleSaveEditedContact = (updatedContact) => {
        if (onEditContact) {
            onEditContact(updatedContact);
        }
        setShowEditModal(false);
    };

    const handleDeleteContact = () => {
        if (onDeleteContact) {
            onDeleteContact(chatDetail.id);
        }
        setShowProfileModal(false);
    };

    return (
        <div className="chat-detail">
            <ChatHeader
                contactName={contactName}
                contactStatus={contactStatus}
                profilePic={chatDetail.profile_pic}
                onBack={handleBackClick}
                onHeaderClick={handleHeaderClick}
            />

            <div className="messages-container">
                <div className="messages-container-inner">
                    <MessagesList
                        messages={sortedMessages}
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

            {showProfileModal && (
                <UserProfileModal
                    contact={chatDetail}
                    onClose={handleCloseProfileModal}
                    onEditClick={handleOpenEditModal}
                    onDeleteClick={handleDeleteContact}
                />
            )}

            {showEditModal && (
                <EditContactModal
                    contact={chatDetail}
                    onCancel={handleCloseEditModal}
                    onSave={handleSaveEditedContact}
                />
            )}
        </div>
    );
};

export default ChatDetail;
