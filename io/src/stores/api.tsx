import socketIOClient from 'socket.io-client';
import sailsIOClient from 'sails.io.js';

const getApi = () => {
  let api = sailsIOClient(socketIOClient);
  //io.sails.url = 'https://3.137.147.183:80'
  //io.sails.url = 'http://3.137.147.183:80'
  //io.sails.url = 'http://ec2-18-188-86-138.us-east-2.compute.amazonaws.com:1337';
  //io.sails.url = 'http://127.0.0.1:80';

  //io.sails.url = 'https://3.137.147.183:443'
  // api.sails.autoConnect = false;
  api.sails.environment = 'development';

  // api.sails.url = 'http://192.168.1.47:1337';
  // api.sails.url = 'http://localhost:1337';
  api.sails.url = 'http://localhost:3000';
  return api;
};

const fetchCookie = async () => {
  const response = await fetch('http://localhost:3000/__getcookie', {
    mode: 'no-cors',
  });
  // waits until the request completes...
  console.log(response);
  return response;
};

let api = getApi();

// export { getApi, fetchCookie };
export { api, getApi, fetchCookie };
