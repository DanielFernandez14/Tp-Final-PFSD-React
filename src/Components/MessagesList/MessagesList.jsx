import React from 'react'

const MessagesList = ({ messages }) => {
    return (
        <div>
            {messages.length === 0 ? (
                <span>Aun no has chateado, envia un mensaje para hacerlo</span>
            ) : (
                messages.map((message) => {
                    return (
                        <div key={message.id}>
                            <h3>{message.author_name}</h3>
                            <p>{message.content}</p>
                            <span>{message.created_at}</span>
                            <span>
                                {message.status === 'VIEWED'
                                    ? <span>Leído</span>
                                    : <span>No leído</span>
                                }
                            </span>
                            <hr />
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default MessagesList
