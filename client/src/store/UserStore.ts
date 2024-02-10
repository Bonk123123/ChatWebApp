import { URLpath } from '@/constants/URLpath';
import { IUser } from '@/models/IUser';
import authHeader from '@/utils/authHeader';
import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

class UserStore {
    isLoading: boolean;
    user: IUser;
    error: string;

    constructor() {
        this.isLoading = false;
        this.error = '';
        this.user = {
            _id: '',
            username: '',
            email: '',
            isEmailConfirmed: false,
            img: '',
        };

        makeAutoObservable(this);
    }

    async fetchUser() {
        this.isLoading = true;
        await axios
            .get(`${URLpath}authentication`, {
                headers: authHeader(),
                withCredentials: true,
            })
            .then((response) =>
                runInAction(() => {
                    this.user = response.data;
                    this.isLoading = false;
                })
            )
            .catch((error) => {
                runInAction(() => {
                    this.error =
                        typeof error.response.data.message === 'string'
                            ? error.response.data.message
                            : error.response.data.message[0];
                    this.isLoading = false;
                });
            });
    }

    async changeAvatarImg(img: File) {
        const formdata = new FormData()
        formdata.append('img', img);
        await axios
            .put(`${URLpath}users/${this.user._id}`, formdata, {
                headers: authHeader(),
                withCredentials: true,
            })
            .then((response) =>
                runInAction(() => {
                    this.user = response.data;
                })
            )
            .catch((error) => {
                runInAction(() => {
                    this.error =
                        typeof error.response.data.message === 'string'
                            ? error.response.data.message
                            : error.response.data.message[0];
                });
            });
    }

    async changeEmail(email: string) {
        await axios
            .put(`${URLpath}users/${this.user._id}`, {email}, {
                headers: authHeader(),
                withCredentials: true,
            })
            .then((response) =>
                runInAction(() => {
                    this.user = response.data;
                })
            )
            .catch((error) => {
                runInAction(() => {
                    this.error =
                        typeof error.response.data.message === 'string'
                            ? error.response.data.message
                            : error.response.data.message[0];
                });
            });
    }

    async changeUsername(username: string) {
        await axios
            .put(`${URLpath}users/${this.user._id}`, {username}, {
                headers: authHeader(),
                withCredentials: true,
            })
            .then((response) =>
                runInAction(() => {
                    this.user = response.data;
                })
            )
            .catch((error) => {
                runInAction(() => {
                    this.error =
                        typeof error.response.data.message === 'string'
                            ? error.response.data.message
                            : error.response.data.message[0];
                });
            });
    }

    async changePassword(password: string) {
        await axios
            .put(`${URLpath}users/${this.user._id}`, {password}, {
                headers: authHeader(),
                withCredentials: true,
            })
            .then((response) =>
                runInAction(() => {
                    this.user = response.data;
                })
            )
            .catch((error) => {
                runInAction(() => {
                    this.error =
                        typeof error.response.data.message === 'string'
                            ? error.response.data.message
                            : error.response.data.message[0];
                });
            });
    }
}

const userStore = new UserStore();

export default userStore;
