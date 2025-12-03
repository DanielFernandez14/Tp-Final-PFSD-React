import React, { useEffect, useState } from 'react';
import TypingIndicator from '../TypingIndicator/TypingIndicator';

const RANDOM_MESSAGES = [
    'Hola, soy el bot...',
    'Interesante, contame más...',
    'Ahora estoy ocupado, te respondo después...',
    'Jajaja, muy bueno',
    'No estoy seguro, ¿me lo explicás mejor?',
];

const AutoReply = ({ active, onReply }) => {
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!active) return;

        setIsTyping(true);

        const timeoutId = setTimeout(() => {
            const index = Math.floor(Math.random() * RANDOM_MESSAGES.length);
            const randomMessage = RANDOM_MESSAGES[index];

            setIsTyping(false);
            onReply(randomMessage);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [active, onReply]);

    if (!isTyping) {
        return null;
    }

    return <TypingIndicator />;
};

export default AutoReply;
