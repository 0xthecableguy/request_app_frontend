export interface ServerResponse {
    action_buttons: string[];
    message: string;
    buttons: string[];
}

export const sendMessageToServer = async (message: string): Promise<ServerResponse> => {
    const response = await fetch('/user_action', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: 5964236329, action: message }),
    });

    if (!response.ok) {
        throw new Error('Ошибка сети');
    }

    return response.json();
};