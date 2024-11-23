import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import './App.css';
import './styles/index.css'
import { sendMessageToServer } from "./services/api";

interface Message {
    type: 'user' | 'response';
    text: string;
}

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [buttons, setButtons] = useState<string[]>([]);
    const [actionButtons, setActionButtons] = useState<string[]>([]);

    const handleSendMessage = async (message: string) => {
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
        } catch (error) {
            console.error('Ошибка отправки сообщения:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'response', text: 'Ошибка связи с сервером.' },
            ]);
        }
    };

    return (
        <div className="App">
            <h1 className="chat-header">reQuest App</h1>
            <ChatBox
                messages={messages}
                onSendMessage={handleSendMessage}
                buttons={buttons}
                actionButtons={actionButtons}
            />
        </div>
    );
};

export default App;