export interface ServerResponse {
    action_buttons: string[];
    message: string;
    buttons: string[];
}

export const sendMessageToServer = async (userId: number, message: string, username: string, isAppOpened: boolean = false): Promise<ServerResponse> => {
    const response = await fetch('https://v3.spb.ru/user_action', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id: userId,
            username: username,
            action: message,
            is_app_opened: isAppOpened,
        }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
        throw new Error('Network Error');
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
};