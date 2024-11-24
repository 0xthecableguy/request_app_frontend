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
    const [username, setUsername] = useState<string>('Unknown User');
    const [canInput, setCanInput] = useState<boolean>(true);

    const initializeUser = async () => {
        try {
            if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe) {
                const user = window.Telegram.WebApp.initDataUnsafe.user;
                if (user && user.id) {
                    setUserId(user.id);
                    setUsername(user.username || 'Unknown User');

                    const response = await sendMessageToServer(user.id, 'Mini-app initialized', user.username || 'Unknown User');
                    setMessages([{ type: 'response', text: response.message }]);
                    setButtons(response.buttons || []);
                    setActionButtons(response.action_buttons || []);
                    setCanInput(response.can_input);
                    return;
                }
                console.error('User data not found in Telegram WebApp');
            }
            await initializeTestUser();
        } catch (error) {
            console.error('Error initializing user:', error);
        }
    };

    const initializeTestUser = async () => {
        const testUserId = 303808909;
        const testUsername = 'Test_user';
        setUserId(testUserId);
        setUsername(testUsername);

        const response = await sendMessageToServer(testUserId, 'Mini-app initialized', testUsername);
        setMessages([{ type: 'response', text: response.message }]);
        setButtons(response.buttons || []);
        setActionButtons(response.action_buttons || []);
        setCanInput(response.can_input);
    };

    useEffect(() => {
        initializeUser().catch((error) => {
            console.error('Error initializing user:', error);
        });
    }, []);

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
            const serverResponse = await sendMessageToServer(userId, message, username);

            setMessages((prevMessages) => [
                ...prevMessages,
                { type: 'response', text: serverResponse.message || 'Server error' },
            ]);

            setButtons(serverResponse.buttons || []);
            setActionButtons(serverResponse.action_buttons || []);
            setCanInput(serverResponse.can_input);
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
                canInput={canInput}
            />
        </div>
    );
};

export default App;