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

    function addNewContact(data) {
        const name =
            typeof data === 'string'
                ? data
                : (data && data.name) || '';

        const phone =
            typeof data === 'string'
                ? ''
                : (data && data.phone) || '';

        const now = Date.now();

        const newContact = {
            id: now,
            user_id: now,
            user_name: name,
            phone: phone,
            profile_pic: '/Bot/bot.avif',
            last_connection: 'Ahora',
            isConected: false,
            messages: [],
            last_message_at: now
        };

        setContacts((prev) => {
            if (!prev) return [newContact];

            const updated = [...prev, newContact];
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

        const newMessage = {
            id: crypto.randomUUID(),
            content: message,
            author_id: isMe ? 0 : chatDetail.user_id,
            author_name: isMe ? 'Yo' : chatDetail.user_name,
            created_at: `Hoy ${hours}:${minutes}`,
            created_at_timestamp: now.getTime(),
            // única fuente de verdad para leído/no leído
            status: 'VIEWED',
            sender: sender
        };

        setContacts((prevState) => {
            if (!prevState) return prevState;

            const updated = prevState.map((chat) => {
                if (Number(chat.id) === Number(chatId)) {
                    const isContactSender = sender === 'contact';

                    return {
                        ...chat,
                        messages: [...chat.messages, newMessage],
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
        setContacts((prevState) => {
            if (!prevState) return prevState;

            const updated = prevState.map((chat) => {
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
        if (!contacts || loading || !chatId) return;

        const chatSelected = contacts.find(
            (contact) => Number(contact.id) === Number(chatId)
        );

        setChatDetail(chatSelected || null);
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
