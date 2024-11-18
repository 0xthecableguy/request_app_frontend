import React, { useState } from 'react';

interface ChatBoxProps {
    messages: string[];
    onSendMessage: (message: string) => void;
    buttons: string[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSendMessage, buttons }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chat-box">
            <div className="messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className="message">{msg}</div>
                ))}
            </div>
            <div className="input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your text here..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
            {buttons.length > 0 && (
                <div className="button-box">
                    {buttons.map((buttonText, index) => (
                        <button key={index} onClick={() => onSendMessage(buttonText)}>
                            {buttonText}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChatBox;