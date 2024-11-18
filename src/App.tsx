import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import './App.css';
import {sendMessageToServer} from "./services/api";

export interface ServerResponse {
    message: string;
    buttons?: string[];
}

const App = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [buttons, setButtons] = useState<string[]>([]);

    const handleSendMessage = async (message: string) => {
        setMessages([...messages, message]);

        try {
            const { message: serverMessage, buttons: serverButtons } = await sendMessageToServer(message);
            setMessages((prevMessages) => [...prevMessages, `Server's response: ${serverMessage}`]);

            if (serverButtons) {
                setButtons(serverButtons); // Обновляем кнопки, если они есть в ответе
            } else {
                setButtons([]); // Очищаем кнопки, если ответ не содержит информации о них
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="App">
            <h1 className="chat-header">reQuest App</h1>
            <ChatBox messages={messages} onSendMessage={handleSendMessage} buttons={buttons} />
        </div>
    );
};

export default App;