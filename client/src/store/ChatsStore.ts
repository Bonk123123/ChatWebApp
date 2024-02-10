import { URLpath } from '@/constants/URLpath';
import { IChat } from '@/models/IChat';
import { IUser } from '@/models/IUser';
import authHeader from '@/utils/authHeader';
import axios from 'axios';
import { action, makeAutoObservable, runInAction } from 'mobx';

class ChatsStore {
    chats: IChat[];
    users: IUser[];
    isLoading: boolean;
    searchParam: string;
    error: string;
    constructor() {
        this.chats = [];
        this.users = [];
        this.isLoading = false;
        this.searchParam = '';
        this.error = '';

        makeAutoObservable(this);
    }

    setSearchParam(search: string) {
        this.searchParam = search;
    }

    fetchChats = async (userId: string | null) => {
        runInAction(() => {
            this.isLoading = true;
        });
        await axios
            .get<IChat[]>(
                `${URLpath}chats/${userId}?searchParam=${this.searchParam}`,
                {
                    headers: authHeader(),
                    withCredentials: true,
                }
            )
            .then((response) => {
                runInAction(() => {
                    this.chats = response.data;
                });
            })
            .catch((error) => {
                runInAction(() => {
                    this.error =
                        typeof error.response.data.message === 'string'
                            ? error.response.data.message
                            : error.response.data.message[0];
                });
            });

        if (this.searchParam) {
            await axios
                .get<IUser[]>(
                    `${URLpath}users?userId=${userId}&searchParam=${this.searchParam}`,
                    {
                        headers: authHeader(),
                        withCredentials: true,
                    }
                )
                .then((response) => {
                    runInAction(() => {
                        this.users = response.data;
                    });
                })
                .catch((error) => {
                    runInAction(() => {
                        this.error =
                            typeof error.response.data.message === 'string'
                                ? error.response.data.message
                                : error.response.data.message[0];
                    });
                });
        }
        runInAction(() => {
            this.isLoading = false;
        });
    };
}

const chatsStore = new ChatsStore();

export default chatsStore;
