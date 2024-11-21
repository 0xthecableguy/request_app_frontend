import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import ChatBox from './components/ChatBox';
import './App.css';
import { sendMessageToServer } from "./services/api";
const App = () => {
    const [messages, setMessages] = useState([]);
    const [buttons, setButtons] = useState([]);
    const [actionButtons, setActionButtons] = useState([]);
    const handleSendMessage = async (message) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'user', text: message },
        ]);
        try {
            const serverResponse = await sendMessageToServer(message);
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'response', text: serverResponse.message || 'Ошибка на сервере' },
            ]);
            setButtons(serverResponse.buttons || []);
            setActionButtons(serverResponse.action_buttons || []);
        }
        catch (error) {
            console.error('Ошибка отправки сообщения:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'response', text: 'Ошибка связи с сервером.' },
            ]);
        }
    };
    return (_jsxs("div", { className: "App", children: [_jsx("h1", { className: "chat-header", children: "reQuest App" }), _jsx(ChatBox, { messages: messages, onSendMessage: handleSendMessage, buttons: buttons, actionButtons: actionButtons })] }));
};
export default App;
