const KEY = 'currentUser';

export const getLocalStorage = () => {
    return localStorage.getItem(KEY);
}

export const setLocalStorage = (value: any) => {
    localStorage.setItem(KEY, JSON.stringify(value));
}