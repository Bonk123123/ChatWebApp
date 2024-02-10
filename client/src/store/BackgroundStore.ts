import { URLpath } from '@/constants/URLpath';
import { IBackground } from '@/models/IBackground';
import authHeader from '@/utils/authHeader';
import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

class BackgroundStore {
    isLoading: boolean;
    error: string;
    backgrounds: IBackground[];
    currentBackground: string;

    constructor() {
        this.isLoading = false;
        this.error = '';
        this.backgrounds = [];
        this.currentBackground = '';

        makeAutoObservable(this);
    }

    async fetchBackgrounds(userId: string) {
        this.isLoading = true;
        await axios
            .get<IBackground[]>(`${URLpath}backgrounds/${userId}`, {
                headers: authHeader(),
                withCredentials: true,
            })
            .then((response) => {
                runInAction(() => {
                    this.backgrounds = response.data;
                    this.isLoading = false;
                });
            })
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

    getCurrentBackground() {
        if (typeof window !== 'undefined') {
            let ls = localStorage.getItem('bg');

            if (!ls) ls = '';

            const bg = this.currentBackground ? this.currentBackground : ls;

            return bg;
        }
        return '';
    }

    setCurrentBackground(background: string) {
        if (typeof window !== 'undefined') {
            localStorage.setItem('bg', background);
            this.currentBackground = background;
        }
    }
}

const backgroundStore = new BackgroundStore();

export default backgroundStore;
