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
                const data = getContacts();
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
            messages: []
        };

        setContacts((prev) => [...prev, new_contact]);
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
            sender: sender
        };

        setContacts((prev_state) =>
            prev_state.map((chat) => {
                if (Number(chat.id) === Number(chat_id)) {
                    return {
                        ...chat,
                        messages: [...chat.messages, new_message]
                    };
                }
                return chat;
            })
        );
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

    return (
        <div className="chat-screen">
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
