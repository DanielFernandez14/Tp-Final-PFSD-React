import React, { useState } from 'react';
import './AddNewContact.css';

const AddNewContact = ({ addNewContact }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmitNewContactForm = (event) => {
        event.preventDefault();

        const formulario = event.target;
        const name = formulario.contactName.value.trim();
        const phone = formulario.contactPhone.value.trim();

        if (!name || !phone) return;
        if (!/^\d+$/.test(phone)) {
            return;
        }

        addNewContact({ name, phone });

        formulario.reset();
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <div className="add-contact">
            {!isOpen ? (
                <button
                    type="button"
                    className="add-contact-btn"
                    onClick={() => setIsOpen(true)}
                >
                    Agregar contacto
                </button>
            ) : (
                <form
                    className="add-contact-form"
                    onSubmit={handleSubmitNewContactForm}
                    autoComplete="off"
                >
                    <div className="add-contact-field">
                        <label htmlFor="contactName">Nombre</label>
                        <input
                            name="contactName"
                            id="contactName"
                            placeholder="Nombre del nuevo contacto"
                            autoComplete="off"
                        />
                    </div>

                    <div className="add-contact-field">
                        <label htmlFor="contactPhone">Teléfono</label>
                        <input
                            type="tel"
                            name="contactPhone"
                            id="contactPhone"
                            placeholder="Número de teléfono"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            autoComplete="off"
                        />
                    </div>

                    <div className="add-contact-actions">
                        <button
                            type="button"
                            className="add-contact-cancel"
                            onClick={handleCancel}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="add-contact-submit">
                            Crear contacto
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default AddNewContact;
