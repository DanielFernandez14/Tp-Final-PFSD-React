import React from 'react';
import './CreateNewMessage.css'

const CreateNewMessage = ({ createNewMessage }) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        const formulario = event.target;
        const message_value = formulario.message.value.trim();

        if (message_value.length === 0) return;

        createNewMessage(message_value);
        formulario.reset();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="message">Mensaje: </label>
                <textarea
                    name="message"
                    id="message"
                    placeholder="Ingrese el mensaje"
                ></textarea>
            </div>

            <button type="submit">Enviar mensaje</button>
        </form>
    );
};

export default CreateNewMessage;
