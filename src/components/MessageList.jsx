import React, { useEffect, useState } from "react";
import MessageItem from './MessageItem';

function MessageList({ messages }) {
        const [latestMessageIndex, setLatestMessageIndex] = useState(null);
        const safeMessages = messages || [];

    useEffect(() => {
        if(messages.length > 0) {
            setLatestMessageIndex(messages.length - 1);

            const timeout = setTimeout(() => {
                setLatestMessageIndex(null);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [messages]);
    return (
        <ul>
            {safeMessages.map((msg, index) => (
                <MessageItem 
                key={index} 
                message={msg.text} 
                user={msg.user}
                timestamp={msg.timestamp}
                isNew={index === latestMessageIndex}
            />
            ))}
        </ul>
    );
}

export default MessageList;