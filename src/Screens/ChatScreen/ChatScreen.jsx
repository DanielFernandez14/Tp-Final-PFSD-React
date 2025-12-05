import React, { useState, useEffect } from 'react';
import ChatList from "../ChatList/ChatList";
import { getContacts } from '../../Servicios/contactServices';
import { useParams } from 'react-router-dom';
import ChatDetail from '../../Components/ChatDetail/ChatDetail';
import './ChatScreen.css';

const ChatScreen = () => {
    const [contacts, setContacts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chatDetail, setChatDetail] = useState(null);

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
            isConected: true,
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

        const new_message = {
            id: crypto.randomUUID(),
            content: message,
            author_id: isMe ? 0 : chatDetail.user_id,
            author_name: isMe ? 'Yo' : chatDetail.user_name,
            created_at: "Hoy",
            status: isMe ? 'ENVIADO' : 'VISTO',
            sender: sender,
            read: isMe ? true : false
        };

        setContacts((prev_state) => {
            if (!prev_state) return prev_state;

            const updated = prev_state.map((chat) => {
                if (Number(chat.id) === Number(chat_id)) {
                    return {
                        ...chat,
                        messages: [...chat.messages, new_message],
                        last_message_at: Date.now()
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
                        messages: chat.messages.filter(msg => msg.id !== messageId),
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
                    />
                )}

                {!loading && chat_id && !chatDetail && (
                    <h2 className="no-chat-selected">
                        El chat seleccionado no existe
                    </h2>
                )}
            </div>
        </div>
    );
};

export default ChatScreen;