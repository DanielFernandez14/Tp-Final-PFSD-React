import React, { useState, useRef, useEffect } from 'react';
import './MessageOptions.css';

const MessageOptions = ({ message, onDelete, onCopy, isOwnMessage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                !buttonRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleToggle = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete(message.id);
        setIsOpen(false);
    };

    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(message.content);
        onCopy && onCopy();
        setIsOpen(false);
    };

    return (
        <div className="message-options">
            <button
                ref={buttonRef}
                className="message-options-button"
                onClick={handleToggle}
                aria-label="Opciones del mensaje"
            >
                <span className="options-icon">⋮</span>
            </button>

            {isOpen && (
                <div 
                    ref={menuRef} 
                    className={`message-options-menu ${isOwnMessage ? 'menu-right' : 'menu-left'}`}
                >
                    <button 
                        className="menu-option"
                        onClick={handleCopy}
                    >
                        <span className="menu-icon">📋</span>
                        <span className="menu-text">Copiar</span>
                    </button>

                    {isOwnMessage && (
                        <button 
                            className="menu-option menu-option-danger"
                            onClick={handleDelete}
                        >
                            <span className="menu-icon">🗑️</span>
                            <span className="menu-text">Eliminar</span>
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default MessageOptions;