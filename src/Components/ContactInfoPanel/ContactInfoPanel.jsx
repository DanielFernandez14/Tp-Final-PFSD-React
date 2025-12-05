import React, { useState } from 'react';
import './ContactInfoPanel.css';

const ContactInfoPanel = ({ contact, onClose, onSave }) => {
    const [editedName, setEditedName] = useState(
        contact.user_name || contact.author_name || contact.name || ''
    );

    const isOnline = contact.isConected;
    const statusText = isOnline
        ? 'En línea'
        : contact.last_connection
        ? `Última conexión: ${contact.last_connection}`
        : 'Desconectado';

    const handleSave = () => {
        onSave({
            ...contact,
            user_name: editedName
        });
        onClose();
    };

    return (
        <aside className="contact-info-panel">
            <div className="contact-info-header">
                <button
                    type="button"
                    className="contact-info-back"
                    onClick={onClose}
                >
                    ←
                </button>
                <h2>Información del contacto</h2>
            </div>

            <div className="contact-info-body">
                {contact.profile_pic && (
                    <img
                        src={contact.profile_pic}
                        alt={editedName}
                        className="contact-info-avatar"
                    />
                )}

                <label className="contact-info-label" htmlFor="contact-name">
                    Nombre
                </label>
                <input
                    id="contact-name"
                    className="contact-info-input"
                    type="text"
                    value={editedName}
                    onChange={(event) => setEditedName(event.target.value)}
                />

                <p className="contact-info-status">{statusText}</p>
            </div>

            <div className="contact-info-footer">
                <button
                    type="button"
                    className="contact-info-save-btn"
                    onClick={handleSave}
                >
                    Guardar cambios
                </button>
            </div>
        </aside>
    );
};

export default ContactInfoPanel;
