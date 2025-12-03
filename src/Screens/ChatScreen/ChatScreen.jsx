import React from 'react'
import ChatList from "../ChatList/ChatList";
import { useState, useEffect } from 'react';
import { getContacts } from '../../Servicios/contactServices';
import { useParams } from 'react-router-dom';
import ChatDetail from '../../Components/ChatDetail/ChatDetail';

const ChatScreen = () => {
    const [contacts, setContacts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chatDetail, setChatDetail] = useState(null);

    const { chat_id } = useParams();

    function loadContacts() {
        setLoading(true);

        setTimeout(() => {
            const data = getContacts();
            setContacts(data);
            setLoading(false);
        }, 1000);
    }

    function addNewContact(name) {
        const new_contact = {
            id: Date.now(),
            user_id: Date.now(),
            user_name: name,
            profile_pic: "https://img.freepik.com/vector-gratis/icono-personaje-tecnologia-robot-ai_24877-83742.jpg?semt=ais_hybrid&w=740&q=80",
            last_connection: "Ahora",
            isConected: true,
            messages: []
        };

        setContacts(prev => [...prev, new_contact]);
    }

    function createNewMessage(message) {

        if (!chatDetail) return;

        const new_message = {
            id: crypto.randomUUID(), 
            content: message,
            author_id: chatDetail.user_id,
            author_name: chatDetail.user_name,
            created_at: "Hoy",
            status: 'VIEWED'
        };

        setContacts(prev_state =>
            prev_state.map(chat => {
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


    function sendAutomaticMessage(){
        const new_message = {
            id: crypto.randomUUID(), 
            content: "Tu mensaje fue recibido",
            author_id: chatDetail.user_id,
            author_name: chatDetail.name,
            created_at: "Hoy",
            status: 'VIEWED'
        };

        setContacts(prev_state =>
            prev_state.map(chat => {
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
                contact => Number(contact.id) === Number(chat_id)
            );
            setChatDetail(chat_selected);
        }
    }

    useEffect(loadChatDetail, [chat_id, contacts]);
    useEffect(loadContacts, []);

    return (
        <div>
            {loading ? (
                <span>Cargando contactos...</span>
            ) : (
                contacts && (
                    <ChatList
                        contacts={contacts}
                        addNewContact={addNewContact}
                    />
                )
            )}

            {!loading && (
                !chat_id
                    ? <h2>Aun no has seleccionado ningun chat</h2>
                    : <ChatDetail
                        chatDetail={chatDetail}
                        createNewMessage={createNewMessage}
                    />
            )}
        </div>
    );
};

export default ChatScreen;