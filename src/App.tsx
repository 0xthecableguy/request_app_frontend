import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import './App.css';
import { sendMessageToServer } from "./services/api";

const App = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [buttons, setButtons] = useState<string[]>([]);
    const [actionButtons, setActionButtons] = useState<string[]>([]);// Массив для кнопок, сгенерированных сервером

    const handleSendMessage = async (message: string) => {
        setMessages((prevMessages) => [...prevMessages, `Вы: ${message}`]);

        try {
            const serverResponse = await sendMessageToServer(message);

            // Обновляем сообщения
            setMessages((prevMessages) => [
                ...prevMessages,
                `Ответ: ${serverResponse.message}`,
            ]);

            // Обновляем кнопки
            setButtons(serverResponse.buttons || []); // Устанавливаем основные кнопки
            setActionButtons(serverResponse.action_buttons || []); // Устанавливаем кнопки действий (Назад, Выход)
        } catch (error) {
            console.error('Ошибка отправки сообщения:', error);
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