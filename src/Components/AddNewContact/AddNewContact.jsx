import React from 'react'
import "./AddNewContact.css"

const AddNewContact = ({ addNewContact }) => {

    const handleSubmitNewContactForm = (event) => {
        event.preventDefault();

        const formulario = event.target;
        const name = formulario.name.value;

        addNewContact(name);
        formulario.reset();
    }

    return (
        <form onSubmit={handleSubmitNewContactForm}>
            <div>
                <label htmlFor="name">Nombre: </label>
                <input
                    name="name"
                    id="name"
                    placeholder="Ingrese el nombre del nuevo contacto"
                />
            </div>

            <button type="submit">Crear Contacto</button>
        </form>
    );
}

export default AddNewContact;
