import React, { useState } from 'react';
import MessagesList from '../MessagesList/MessagesList';
import CreateNewMessage from '../CreateNewMessage/CreateNewMessage';
import AutoReply from '../AutoReply/AutoReply';

const ChatDetail = ({ chatDetail, createNewMessage }) => {
    const [autoReplyActive, setAutoReplyActive] = useState(false);

    if (!chatDetail) {
        return null;
    }

    const handleSendMessage = (text) => {
        createNewMessage(text, 'me');
        setAutoReplyActive(true);
    };

    const handleAutoReply = (text) => {
        createNewMessage(text, 'contact');
        setAutoReplyActive(false);
    };

    return (
        <div className="chat-detail">
            <div className="chat-header">
                <h2>{chatDetail.user_name || chatDetail.author_name || chatDetail.name}</h2>
            </div>

            <div className="messages-container">
                <MessagesList messages={chatDetail.messages} />

                <AutoReply
                    active={autoReplyActive}
                    onReply={handleAutoReply}
                />
            </div>

            <CreateNewMessage createNewMessage={handleSendMessage} />
        </div>
    );
};

export default ChatDetail;
