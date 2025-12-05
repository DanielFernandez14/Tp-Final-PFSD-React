import React, { useState } from 'react';
import './EditContactModal.css';

const EditContactModal = ({ contact, onCancel, onSave }) => {
    const [name, setName] = useState(contact.user_name || '');

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedName = name.trim();

        if (trimmedName.length === 0) {
            return;
        }

        const updatedContact = {
            ...contact,
            user_name: trimmedName
        };

        onSave(updatedContact);
    };

    return (
        <div className="ec-modal-overlay" onClick={onCancel}>
            <div
                className="ec-modal-content"
                onClick={(event) => event.stopPropagation()}
            >
                <h2 className="ec-modal-title">Editar contacto</h2>

                <form onSubmit={handleSubmit} className="ec-modal-form">
                    <div className="ec-modal-field">
                        <label htmlFor="ec-name">Nombre</label>
                        <input
                            id="ec-name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="Nombre del contacto"
                        />
                    </div>

                    <div className="ec-modal-actions">
                        <button
                            type="button"
                            className="ec-button ec-button-cancel"
                            onClick={onCancel}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="ec-button ec-button-save"
                        >
                            Guardar cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditContactModal;
