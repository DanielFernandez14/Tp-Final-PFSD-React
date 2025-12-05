import React from 'react';
import './UserProfileModal.css';

const UserProfileModal = ({ contact, onClose, onEditClick, onDeleteClick }) => {
    if (!contact) return null;

    return (
        <div className="up-modal-overlay" onClick={onClose}>
            <div
                className="up-modal-content"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="up-modal-close"
                    onClick={onClose}
                >
                    ×
                </button>

                <div className="up-modal-header">
                    <img
                        src={contact.profile_pic}
                        alt={contact.user_name}
                        className="up-modal-avatar"
                    />
                    <h2 className="up-modal-name">{contact.user_name}</h2>
                    <span className="up-modal-status">
                        {contact.status && contact.status.trim().length > 0
                            ? contact.status
                            : 'Sin estado'}
                    </span>
                </div>

                <div className="up-modal-actions">
                    <button
                        type="button"
                        className="up-modal-button up-modal-button-edit"
                        onClick={onEditClick}
                    >
                        Editar contacto
                    </button>

                    <button
                        type="button"
                        className="up-modal-button up-modal-button-delete"
                        onClick={onDeleteClick}
                    >
                        Eliminar contacto
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfileModal;
