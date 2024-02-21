import { BACKEND_URL, BACKEND_PORT } from '../config/config';

export function fetchUtils(url, method = 'GET', data = {}, needAuth = true) {
    let headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('token');
    url = `${BACKEND_URL}:${BACKEND_PORT}${url}`;
    if (needAuth) {
        if (!token) {
            window.location.href = '/login';
            return;
        }
        headers = {
            ...headers,
            Authorization: `Bearer ${token}`
        };
    }
    const body = method === 'POST' || method === 'PUT' || method === 'DELETE' ? JSON.stringify(data) : null;

    return fetch(url, {
        method,
        body,
        headers
    }).then(async (res) => {
        if (!res.ok) {
            const e = await res.json();
            if (res.status === 401) {
                window.location.href = '/login';
                localStorage.removeItem('token');
            }

            throw { status: res.status, message: e.error };
        }
        return res.json();
    });
}
