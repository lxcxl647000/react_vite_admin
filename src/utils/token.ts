
const TOKEN = 'TOKEN';

export const get_token = () => {
    return localStorage.getItem(TOKEN) || '';
}

export const set_token = (token: string) => {
    localStorage.setItem(TOKEN, token);
}

export const remove_token = () => {
    localStorage.removeItem(TOKEN);
}