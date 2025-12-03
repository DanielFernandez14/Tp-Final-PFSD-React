import './ContactSearchBar.css';

const ContactSearchBar = ({ searchTerm, onSearchChange }) => {
    const handleChange = (event) => {
        onSearchChange(event.target.value);
    };

    return (
        <div className="chat-list-search">
            <input
                type="text"
                placeholder="Buscar contacto..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
};

export default ContactSearchBar;
