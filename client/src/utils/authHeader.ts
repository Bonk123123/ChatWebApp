import { getCookie } from './getCookie';

export default function authHeader() {
    const user = getCookie('Authentication');
    if (user) {
        return { Authorization: user };
    } else {
        return {};
    }
}
