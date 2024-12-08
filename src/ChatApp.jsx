import React, { useEffect, useState } from "react";
import MessageInput from './components/MessageInput';
import MessageList from  './components/MessageList';
import { io } from "socket.io-client";

const socket = io("http://192.168.0.169:4000", {
    transport: ["websocket", "polling"],
});


function ChatApp() {
    const [messages, setMessages] = useState([]);
    const [currentUser, setCurrentUser] = useState("Du");

    useEffect(() => {
        const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
        setMessages(savedMessages);

        socket.on("receiveMessage", (newMessage) => {
            console.log("Meddelande mottaget från servern:", newMessage);
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages, newMessage];
                localStorage.setItem("messages", JSON.stringify(updatedMessages));
                return updatedMessages;
            });
        });
        socket.on("connect", () => {
            console.log("Ansluten till servern med socket-id", socket.id);
        });
        socket.on("connect_error", (err) => {
            console.log("WebSocket-anslutningen misslyckades", err);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, []);

    const addMessage = (message) => {
        if(message.trim()) {
            const timestamp = new Date().toLocaleTimeString();
            const newMessage = {text: message, user: currentUser, timestamp};
            const updatedMessages = [...messages, newMessage];
            setMessages(updatedMessages);
            localStorage.setItem("messages", JSON.stringify(updatedMessages));

            console.log("Skickar meddelande till servern:", newMessage)
            socket.emit("sendMessage", newMessage);
        }
    };

    return (
    <div className="chat-container">
        <h1>Chat-app</h1>
        <select value={currentUser} onChange={(e) => setCurrentUser(e.target.value)}>
            <option value="Du">Du</option>
            <option value="Användare 2">Användare 2</option>
        </select>
        <MessageInput onSendMessage={addMessage} />
        <MessageList key={messages.length} messages={messages} />
    </div>
    );
}

export default ChatApp;