import React, { useState, useRef, useEffect } from "react";
import AddNewContact from "../../Components/AddNewContact/AddNewContact";
import ContactSearchBar from "../../Components/ContactSearchBar/ContactSearchBar";
import ChatItem from "../../Components/ChatItem/ChatItem";
import "./ChatList.css";

const ChatList = ({ contacts, addNewContact, selectedChatId }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const listRef = useRef(null);

    useEffect(() => {
        if (!listRef.current || !contacts) return;
        listRef.current.scrollTop = 0;
    }, [contacts?.length]);

    if (!contacts) return null;

    const filteredContacts = contacts.filter((contact) =>
        contact.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getLastMessagePreview = (contact) => {
        if (!contact.messages || contact.messages.length === 0) {
            return "Sin mensajes";
        }

        const lastMessage = contact.messages[contact.messages.length - 1];
        const text = (lastMessage.content || "").trim();

        if (!text) return "Sin mensajes";

        const words = text.split(/\s+/);
        const maxWords = 2;

        if (words.length <= maxWords) {
            return words.join(" ");
        }

        return `${words.slice(0, maxWords).join(" ")}...`;
    };

    return (
        <div className="chat-list">
            <div className="chat-list-header">
                <h1>Chat-UTN</h1>
            </div>

            <ContactSearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
            />

            <div className="chat-list-items" ref={listRef}>
                {filteredContacts.length === 0 ? (
                    <span className="no-contacts">
                        No se encontraron contactos
                    </span>
                ) : (
                    filteredContacts.map((contact) => {
                        const isActive =
                            Number(contact.id) === Number(selectedChatId);
                        const lastMessagePreview =
                            getLastMessagePreview(contact);

                        return (
                            <ChatItem
                                key={contact.id}
                                contact={contact}
                                isActive={isActive}
                                lastMessagePreview={lastMessagePreview}
                            />
                        );
                    })
                )}
            </div>

            <div className="chat-list-add-contact">
                <AddNewContact addNewContact={addNewContact} />
            </div>
        </div>
    );
};

export default ChatList;
