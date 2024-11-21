export interface ServerResponse {
    action_buttons: string[];
    message: string;
    buttons: string[];
}

export const sendMessageToServer = async (message: string): Promise<ServerResponse> => {
    const response = await fetch('https://195.200.18.50:3000/user_action', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: 5964236329, action: message }),
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
        throw new Error('Ошибка сети');
    }

    return response.json();
};