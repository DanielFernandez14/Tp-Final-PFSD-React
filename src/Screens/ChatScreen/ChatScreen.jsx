import React, { useState, useEffect } from 'react';
import ChatList from "../ChatList/ChatList";
import { getContacts } from '../../Servicios/contactServices';
import { useParams } from 'react-router-dom';
import ChatDetail from '../../Components/ChatDetail/ChatDetail';
import './ChatScreen.css';
import ContactInfoPanel from '../../Components/ContactInfoPanel/ContactInfoPanel';

const ChatScreen = () => {
    const [contacts, setContacts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chatDetail, setChatDetail] = useState(null);

    const [showContactInfo, setShowContactInfo] = useState(false);

    const { chat_id } = useParams();

    function loadContacts() {
        setLoading(true);
        setError(null);

        setTimeout(() => {
            try {
                const data = getContacts()
                    .map((contact) => ({
                        ...contact,
                        last_message_at: contact.last_message_at || 0
                    }))
                    .sort((a, b) => b.last_message_at - a.last_message_at);

                setContacts(data);
            } catch (err) {
                setError('Error al cargar los contactos');
            } finally {
                setLoading(false);
            }
        }, 1000);
    }

    function addNewContact(name) {
        const new_contact = {
            id: Date.now(),
            user_id: Date.now(),
            user_name: name,
            profile_pic:
                "https://img.freepik.com/vector-gratis/icono-personaje-tecnologia-robot-ai_24877-83742.jpg?semt=ais_hybrid&w=740&q=80",
            last_connection: "Ahora",
            isConected: false,
            messages: [],
            last_message_at: Date.now()
        };

        setContacts((prev) => {
            if (!prev) return [new_contact];
            const updated = [...prev, new_contact];
            updated.sort((a, b) => b.last_message_at - a.last_message_at);
            return updated;
        });
    }

    function createNewMessage(message, sender = 'me') {
        if (!chatDetail) return;

        const isMe = sender === 'me';

        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');

        const new_message = {
            id: crypto.randomUUID(),
            content: message,
            author_id: isMe ? 0 : chatDetail.user_id,
            author_name: isMe ? 'Yo' : chatDetail.user_name,
            created_at: `Hoy ${hours}:${minutes}`,
            created_at_timestamp: now.getTime(),
            status: isMe ? 'ENVIADO' : 'VISTO',
            sender: sender,
            read: isMe ? true : false
        };

        setContacts((prev_state) => {
            if (!prev_state) return prev_state;

            const updated = prev_state.map((chat) => {
                if (Number(chat.id) === Number(chat_id)) {
                    const isContactSender = sender === 'contact';

                    return {
                        ...chat,
                        messages: [...chat.messages, new_message],
                        last_message_at: now.getTime(),
                        isConected: isContactSender ? true : chat.isConected,
                        last_connection: isContactSender
                            ? `Hoy ${hours}:${minutes}`
                            : chat.last_connection
                    };
                }
                return chat;
            });

            updated.sort((a, b) => b.last_message_at - a.last_message_at);

            return updated;
        });
    }

    function deleteMessage(messageId) {
        setContacts((prev_state) => {
            if (!prev_state) return prev_state;

            const updated = prev_state.map((chat) => {
                if (Number(chat.id) === Number(chat_id)) {
                    return {
                        ...chat,
                        messages: chat.messages.filter((msg) => msg.id !== messageId),
                        last_message_at: Date.now()
                    };
                }
                return chat;
            });

            return updated;
        });
    }

    function loadChatDetail() {
        if (contacts && !loading && chat_id) {
            const chat_selected = contacts.find(
                (contact) => Number(contact.id) === Number(chat_id)
            );
            setChatDetail(chat_selected || null);
        }
    }

    useEffect(loadChatDetail, [chat_id, contacts]);
    useEffect(loadContacts, []);

    function handleEditContact(updatedContact) {
        setContacts((prev) => {
            if (!prev) return prev;

            return prev.map((contact) => {
                if (Number(contact.id) !== Number(updatedContact.id)) return contact;
                return {
                    ...contact,
                    ...updatedContact
                };
            });
        });

        setChatDetail((prevChatDetail) => {
            if (!prevChatDetail) return prevChatDetail;
            if (Number(prevChatDetail.id) !== Number(updatedContact.id)) {
                return prevChatDetail;
            }
            return {
                ...prevChatDetail,
                ...updatedContact
            };
        });
    }

    function handleDeleteContact(contactId) {
        setContacts((prev) => {
            if (!prev) return prev;
            return prev.filter(
                (contact) => Number(contact.id) !== Number(contactId)
            );
        });

        setChatDetail((prevChatDetail) => {
            if (!prevChatDetail) return prevChatDetail;
            if (Number(prevChatDetail.id) === Number(contactId)) {
                return null;
            }
            return prevChatDetail;
        });

        setShowContactInfo(false);
    }

    function handleShowContactInfo() {
        setShowContactInfo(true);
    }

    function handleCloseContactInfo() {
        setShowContactInfo(false);
    }

    useEffect(() => {
        setShowContactInfo(false);
    }, [chat_id]);

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
