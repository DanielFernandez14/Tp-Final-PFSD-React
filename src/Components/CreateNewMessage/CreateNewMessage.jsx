import React from 'react';
import './CreateNewMessage.css';

const CreateNewMessage = ({ createNewMessage }) => {
    const handleSubmit = (event) => {
        event.preventDefault();

        const formulario = event.target;
        const textarea = formulario.message;
        const message_value = textarea.value.trim();

        if (message_value.length === 0) return;

        createNewMessage(message_value);
        formulario.reset();
        textarea.focus();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            event.target.form.requestSubmit();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="message">Mensaje: </label>
                <textarea
                    name="message"
                    id="message"
                    placeholder="Ingrese el mensaje"
                    onKeyDown={handleKeyDown}
                />
            </div>

            <button type="submit">Enviar mensaje</button>
        </form>
    );
};

export default CreateNewMessage;
