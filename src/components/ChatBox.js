import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from 'react';
const ChatBox = ({ messages, onSendMessage, buttons, actionButtons }) => {
    const [message, setMessage] = useState('');
    const messagesEndRef = useRef(null);
    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };
    const handleButtonClick = (buttonText) => {
        onSendMessage(buttonText);
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (_jsxs("div", { className: "chat-box", children: [_jsxs("div", { className: "messages", children: [messages.map((msg, idx) => (_jsxs("div", { className: `message ${msg.type}`, children: [_jsx("div", { className: "circle", children: msg.type === 'user' ? 'U' : 'R' }), _jsx("div", { className: "message-text", children: msg.text })] }, idx))), _jsx("div", { ref: messagesEndRef })] }), _jsxs("div", { className: "input", children: [_jsx("input", { type: "text", value: message, onChange: (e) => setMessage(e.target.value), onKeyDown: handleKeyDown, placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435..." }), _jsx("button", { onClick: handleSendMessage, children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C" })] }), _jsxs("div", { className: "button-box", children: [_jsx("div", { className: "button-row", children: buttons.map((buttonText, index) => (_jsx("button", { onClick: () => handleButtonClick(buttonText), children: buttonText }, index))) }), _jsx("div", { className: "button-row", children: actionButtons.map((buttonText, index) => (_jsx("button", { onClick: () => handleButtonClick(buttonText), children: buttonText }, index))) })] })] }));
};
export default ChatBox;
