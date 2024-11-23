interface TelegramUser {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
}

interface TelegramWebApp {
    initDataUnsafe: {
        user: TelegramUser;
    };
    onEvent: (event: string, callback: Function) => void;
}

interface Window {
    Telegram: {
        WebApp: TelegramWebApp;
    };
}
