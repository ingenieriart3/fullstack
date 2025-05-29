import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';

const API_URL = import.meta.env.VITE_API_URL;

var io = sailsIOClient(socketIOClient);
io.sails.url = API_URL;
io.sails.environment = 'development';

export default io;
