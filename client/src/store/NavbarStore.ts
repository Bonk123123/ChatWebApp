import { makeAutoObservable, runInAction } from 'mobx';

class NavbarStore {
    isOpen: boolean;
    mode: 'options' | 'backgrounds' | 'chats';

    constructor() {
        this.isOpen = true;
        this.mode = 'chats';

        makeAutoObservable(this);
    }

    setMode(mode: 'options' | 'backgrounds' | 'chats') {
        this.mode = mode;
    }

    setShow() {
        this.isOpen = !this.isOpen;
    }

    setIsOpen(modal: boolean) {
        this.isOpen = modal;
    }
}

const navbarStore = new NavbarStore();

export default navbarStore;
