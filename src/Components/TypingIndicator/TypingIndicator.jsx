import React, { useState, useEffect } from 'react';
import './TypingIndicator.css';

const TYPING_MESSAGES = [
    'Escribiendo',
    'Grabando audio',
    'Escribiendo'
];

const TypingIndicator = () => {
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessageIndex((prev) => {
                return (prev + 1) % TYPING_MESSAGES.length;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="typing-indicator">
            <span className="typing-text">{TYPING_MESSAGES[currentMessageIndex]}</span>
            <span className="typing-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </span>
        </div>
    );
};

export default TypingIndicator;