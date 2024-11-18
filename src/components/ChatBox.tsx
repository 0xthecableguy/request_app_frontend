import React, { useState } from 'react';

interface ChatBoxProps {
    messages: string[];
    onSendMessage: (message: string) => void;
    buttons: string[];
    actionButtons: string[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, onSendMessage, buttons, actionButtons }) => {
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    const handleButtonClick = (buttonText: string) => {
        onSendMessage(buttonText); // Отправляем текст кнопки на сервер
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
                    placeholder="Введите ваше сообщение..."
                />
                <button onClick={handleSendMessage}>Отправить</button>
            </div>

            {/* Отображение кнопок */}
            <div className="button-box">
                {/* Первая строка кнопок */}
                <div className="button-row">
                    {buttons.map((buttonText, index) => (
                        <button key={index} onClick={() => handleButtonClick(buttonText)}>
                            {buttonText}
                        </button>
                    ))}
                </div>
                {/* Вторая строка кнопок */}
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
