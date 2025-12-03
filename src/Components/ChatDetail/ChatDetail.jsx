import React from 'react';
import MessagesList from '../MessagesList/MessagesList';
import CreateNewMessage from '../CreateNewMessage/CreateNewMessage';

const ChatDetail = ({ chatDetail, createNewMessage }) => {

    if (!chatDetail) return null;

    return (
        <div>
            <h2>{chatDetail.name}</h2>
            <MessagesList messages={chatDetail.messages} />
            <CreateNewMessage createNewMessage={createNewMessage}/>
        </div>
    );
};

export default ChatDetail;
