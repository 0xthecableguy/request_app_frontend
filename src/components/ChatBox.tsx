import React, { useState, useEffect, useRef } from 'react';

interface ChatBoxProps {
    messages: { type: 'user' | 'response'; text: string }[];
    onSendMessage: (message: string) => void;
    buttons: string[];
    actionButtons: string[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSendMessage, buttons, actionButtons }) => {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    const handleButtonClick = (buttonText: string) => {
        onSendMessage(buttonText);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="chat-box">
            <div className="messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.type}`}>
                        <div className="circle">{msg.type === 'user' ? 'U' : 'R'}</div>
                        <div className="message-text">{msg.text}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here..."
                />
                <button onClick={handleSendMessage}>SEND</button>
            </div>

            <div className="button-box">
                <div className="button-row">
                    {buttons.map((buttonText, index) => (
                        <button key={index} onClick={() => handleButtonClick(buttonText)}>
                            {buttonText}
                        </button>
                    ))}
                </div>
                <div className="button-row">
                    {actionButtons.map((buttonText, index) => (
                        <button key={index} onClick={() => handleButtonClick(buttonText)}>
                            {buttonText}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChatBox;
