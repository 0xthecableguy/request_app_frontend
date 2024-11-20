import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import './App.css';
import { sendMessageToServer } from "./services/api";

interface Message {
    type: 'user' | 'response';
    text: string;
}

const App: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [buttons, setButtons] = useState<string[]>([]);
    const [actionButtons, setActionButtons] = useState<string[]>([]); // Массив для кнопок, сгенерированных сервером

    const handleSendMessage = async (message: string) => {
        // Добавляем сообщение пользователя
        setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'user', text: message },
        ]);

        try {
            const serverResponse = await sendMessageToServer(message);

            // Добавляем ответ сервера
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'response', text: serverResponse.message || 'Ошибка на сервере' },
            ]);

            // Обновляем кнопки
            setButtons(serverResponse.buttons || []); // Основные кнопки
            setActionButtons(serverResponse.action_buttons || []); // Кнопки действий (Назад, Выход)
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