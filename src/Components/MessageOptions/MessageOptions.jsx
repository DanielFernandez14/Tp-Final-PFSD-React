import React, { useState, useRef, useEffect } from 'react';
import './MessageOptions.css';

const MessageOptions = ({ message, onDelete, onCopy, isOwnMessage }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const menuEl = menuRef.current;
            const buttonEl = buttonRef.current;

            if (
                menuEl &&
                !menuEl.contains(event.target) &&
                (!buttonEl || !buttonEl.contains(event.target))
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

    const handleToggle = (event) => {
        event.stopPropagation();
        setIsOpen((prev) => !prev);
    };

    const handleDelete = (event) => {
        event.stopPropagation();
        if (onDelete) {
            onDelete(message.id);
        }
        setIsOpen(false);
    };

    const handleCopy = (event) => {
        event.stopPropagation();

        if (navigator.clipboard?.writeText) {
            navigator.clipboard.writeText(message.content);
        }

        if (onCopy) {
            onCopy();
        }

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
                    className={`message-options-menu ${
                        isOwnMessage ? 'menu-right' : 'menu-left'
                    }`}
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
