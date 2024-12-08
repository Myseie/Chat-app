import React, {useState} from "react";

function MessageInput({ onSendMessage }) {
    const [message, setMessage] = useState('');
    
    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="input-wrapper">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Skriv ett meddelande"
            />
            <button onClick={handleSendMessage} disabled={!message.trim()}>Skicka</button>
        </div>
    );
}

export default MessageInput;