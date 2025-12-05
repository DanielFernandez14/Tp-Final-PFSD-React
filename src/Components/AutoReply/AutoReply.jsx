import React, { useEffect, useState } from 'react';
import TypingIndicator from '../TypingIndicator/TypingIndicator';

const RANDOM_MESSAGES = [
    'Sí, te entiendo. ¿Me contás un poco más?',
    'Ok, suena interesante eso que decís.',
    'Jajaja, me hizo gracia lo que dijiste',
    'Mmm, no estoy del todo seguro, pero suena lógico.',
    'Claro, puedo darte una mano con eso.',
    'Bien, ¿y cómo te hace sentir eso?',
    'Opa, eso no me lo esperaba.',
    'Entiendo. ¿Qué pensás hacer con eso entonces?',
    'Perfecto, quedamos así entonces.',
    'Dale, lo vemos con más calma después.'
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
