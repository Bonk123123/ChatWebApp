import { URLpath } from '@/constants/URLpath';
import { getCookie } from '@/utils/getCookie';
import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

interface ICredentials {
    username: string;
    email: string;
    password: string;
}

class AuthStore {
    credentials: ICredentials;
    isLoading: boolean;
    error: string;
    constructor() {
        this.credentials = {
            username: '',
            email: '',
            password: '',
        };
        this.isLoading = false;
        this.error = '';

        makeAutoObservable(this);
    }

    setUsername(username: string) {
        this.credentials.username = username;
    }

    setEmail(email: string) {
        this.credentials.email = email;
    }

    setPassword(password: string) {
        this.credentials.password = password;
    }

    resetError() {
        this.error = '';
    }

    isLogIn(): string | undefined {
        const user = getCookie('Authentication');
        if (user) return user;
        return undefined;
    }

    async logIn(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.isLoading = true;
        await axios
            .post(
                `${URLpath}authentication/login`,
                {
                    email: this.credentials.email,
                    password: this.credentials.password,
                },
                { withCredentials: true }
            )
            .then((response) => console.log(response))
            .catch((error) => {
                runInAction(() => {
                    this.error =
                        typeof error.response.data.message === 'string'
                            ? error.response.data.message
                            : error.response.data.message[0];
                    this.isLoading = false;
                });
            });

        this.isLoading = false;
    }

    async registration(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.isLoading = true;
        await axios.post(`${URLpath}users`, this.credentials).catch((error) => {
            runInAction(() => {
                this.error =
                    typeof error.response.data.message === 'string'
                        ? error.response.data.message
                        : error.response.data.message[0];
                this.isLoading = false;
            });
        });

        this.isLoading = false;
    }
}

const authStore = new AuthStore();

export default authStore;
