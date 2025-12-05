import React from 'react';
import { useParams } from 'react-router-dom';
import ChatList from '../ChatList/ChatList';
import ChatDetail from '../../Components/ChatDetail/ChatDetail';
import ContactInfoPanel from '../../Components/ContactInfoPanel/ContactInfoPanel';
import useChatManager from '../../hooks/useChatManager.js';
import './ChatScreen.css';

const ChatScreen = () => {
    const { chat_id } = useParams();

    const {
        contacts,
        loading,
        error,
        chatDetail,
        showContactInfo,
        addNewContact,
        createNewMessage,
        deleteMessage,
        handleEditContact,
        handleDeleteContact,
        handleShowContactInfo,
        handleCloseContactInfo
    } = useChatManager(chat_id);

    const isChatActive = chat_id && chatDetail;

    return (
        <div className={`chat-screen ${isChatActive ? 'chat-active' : ''}`}>
            <div className="chat-list-container">
                {loading && (
                    <span className="loading-text">Cargando contactos...</span>
                )}

                {error && <span className="error-text">{error}</span>}

                {!loading && !error && contacts && (
                    <ChatList
                        contacts={contacts}
                        addNewContact={addNewContact}
                        selectedChatId={chat_id}
                    />
                )}
            </div>

            <div className="chat-detail-container">
                {!loading && !chat_id && (
                    <h2 className="no-chat-selected">
                        Aún no has seleccionado ningún chat
                    </h2>
                )}

                {!loading && chat_id && chatDetail && (
                    <ChatDetail
                        chatDetail={chatDetail}
                        createNewMessage={createNewMessage}
                        deleteMessage={deleteMessage}
                        onEditContact={handleEditContact}
                        onDeleteContact={handleDeleteContact}
                        onShowContactInfo={handleShowContactInfo}
                    />
                )}

                {!loading && chat_id && !chatDetail && (
                    <h2 className="no-chat-selected">
                        El chat seleccionado no existe
                    </h2>
                )}

                {showContactInfo && chat_id && chatDetail && (
                    <ContactInfoPanel
                        contact={chatDetail}
                        onClose={handleCloseContactInfo}
                        onSave={handleEditContact}
                        onDelete={handleDeleteContact}
                    />
                )}
            </div>
        </div>
    );
};

export default ChatScreen;
