import { URLpath } from '@/constants/URLpath';
import { IChat } from '@/models/IChat';
import authHeader from '@/utils/authHeader';
import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

class CurrentChatsStore {
    currentChat: IChat;
    isLoading: boolean;
    error: string;
    constructor() {
        this.currentChat = {
            _id: '',
            chat_name: 'start chatting',
            chat_img: '',
            chat_participants: [],
            messages: [],
            lastMessage: '',
        };
        this.isLoading = false;
        this.error = '';

        makeAutoObservable(this);
    }

    async createChat(ids: string[], func: () => void) {
        runInAction(() => {
            this.isLoading = true;
        });
        await axios
            .post<IChat>(
                `${URLpath}chats`,
                {
                    usersId: ids,
                },
                {
                    headers: authHeader(),
                    withCredentials: true,
                }
            )
            .then((response) => {
                runInAction(() => {
                    this.currentChat = response.data;
                });
                func();
            })
            .catch((error) => {
                runInAction(() => {
                    this.error =
                        typeof error.response.data.message === 'string'
                            ? error.response.data.message
                            : error.response.data.message[0];
                });
            });
        runInAction(() => {
            this.isLoading = false;
        });
    }

    async fetchCurrentChatById(chatId: string, userId: string) {
        runInAction(() => {
            this.isLoading = true;
        });
        await axios
            .get<IChat>(`${URLpath}chats?chatId=${chatId}&userId=${userId}`, {
                headers: authHeader(),
                withCredentials: true,
            })
            .then((response) => {
                runInAction(() => {
                    this.currentChat = response.data;
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

        runInAction(() => {
            this.isLoading = false;
        });
    }
}

const currentChatsStore = new CurrentChatsStore();

export default currentChatsStore;
