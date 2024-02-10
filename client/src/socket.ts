import { io } from 'socket.io-client';
import { URLpath } from './constants/URLpath';

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : URLpath;

export const socket = io(URLpath);
