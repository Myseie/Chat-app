import React from "react";

function MessageItem({ message, user, timestamp, isNew }) {
    return (
        <li className={isNew ? "new-message" : ""}>
       <strong>{user}</strong>
       <span className="timestamp">[{timestamp}]</span>: {message}
        </li>
    );
}


export default MessageItem;