import { useState, useEffect } from 'react';
import { getContacts } from '../Servicios/contactServices';

const useChatManager = (chatId) => {
    const [contacts, setContacts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chatDetail, setChatDetail] = useState(null);
    const [showContactInfo, setShowContactInfo] = useState(false);

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
                '/Bot/bot.avif',
            last_connection: 'Ahora',
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
                if (Number(chat.id) === Number(chatId)) {
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
                if (Number(chat.id) === Number(chatId)) {
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
        if (contacts && !loading && chatId) {
            const chat_selected = contacts.find(
                (contact) => Number(contact.id) === Number(chatId)
            );
            setChatDetail(chat_selected || null);
        }
    }

    useEffect(loadContacts, []);
    useEffect(loadChatDetail, [chatId, contacts, loading]);

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
    }, [chatId]);

    return {
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
    };
};

export default useChatManager;
