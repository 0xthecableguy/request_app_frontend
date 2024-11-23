import React, { useState, useEffect } from 'react';
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
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
            const user = window.Telegram.WebApp.initDataUnsafe.user;
            if (user && user.id) {
                setUserId(user.id);
                console.log('User ID from Telegram WebApp:', user.id);
            } else {
                console.error('User data not found in Telegram WebApp');
            }
        } else {
            setUserId(303808909);
            console.log('Using test User ID:', 303808909);
        }
    }, []);

    // // Rollback to if there is no need to define test id
    // useEffect(() => {
    //     if (window.Telegram && window.Telegram.WebApp) {
    //         const userId = window.Telegram.WebApp.initDataUnsafe.user.id;
    //         setUserId(userId);
    //         console.log('User ID from Telegram WebApp:', userId);
    //     }
    // }, []);

    const handleSendMessage = async (message: string) => {
        if (!userId) {
            console.error("User ID is not available");
            return;
        }

        setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'user', text: message },
        ]);

        try {
            const serverResponse = await sendMessageToServer(userId, message);

            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'response', text: serverResponse.message || 'Server error' },
            ]);

            setButtons(serverResponse.buttons || []);
            setActionButtons(serverResponse.action_buttons || []);
        } catch (error) {
            console.error('Message sending error:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'response', text: 'Connection error with the server.' },
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