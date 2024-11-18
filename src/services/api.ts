import { ServerResponse } from '../App';

export const sendMessageToServer = async (message: string): Promise<ServerResponse> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Пример ответа от сервера
            resolve({
                message: `${message}`,
                buttons: message === 'Показать кнопки' ? ["Опция 1", "Опция 2", "Опция 3"] : []
            });
        }, 1000);
    });
};