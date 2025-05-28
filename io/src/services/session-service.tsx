import { lIn } from '../stores/userstore';

// este handler deberia ser un funcion de userstore.js y grabar en un writable session o mismo usuario
const handleResponse = (body, JWR) => {
  if (body === 'OK') {
    console.log('Successfully signed in');
    lIn.set(true);
  } else {
    console.log('Error: ', JWR);
  }
};

const handleLogoutResponse = (body, JWR) => {
  if (body === 'OK') {
    console.log('Successfully logged out', JWR);
    lIn.set(false);
  } else {
    console.log(body);
  }
};

const handleLoginResponse = (body, JWR) => {
  if (body === 'OK') {
    console.log('Successfully logged in', JWR);
    lIn.set(true);
  } else {
    console.log(body);
  }
};

export const signUp = async (api, msg, cb) => {
  const signupReqOptions = {
    method: 'post',
    url: '/api/v1/entrance/signup',
    data: {
      emailAddress: msg.emailAddress,
      password: msg.password,
      rememberMe: msg.remember,
      fullName: 'fullname',
    },
    headers: {},
  };
  let signUpResponse = await api.socket.request(signupReqOptions, cb);
  console.log('la respuesta ', signUpResponse);
};

export const logout = (api, cb) => {
  const logoutReqOptions = {
    method: 'get',
    url: '/api/v1/account/logout',
    headers: {},
  };

  api.socket.request(logoutReqOptions, cb);
};

export const login = (api, credentials, cb) => {
  console.log('credentials ', credentials.emailAddress);
  const loginReqOptions = {
    method: 'put',
    url: '/api/v1/entrance/login',
    data: {
      emailAddress: credentials.emailAddress,
      password: credentials.password,
    },
    headers: {},
  };
  api.socket.request(loginReqOptions, cb);
};

export { handleResponse, handleLoginResponse, handleLogoutResponse };

// export const login = async (data) => {
// 	const response = await fetch('http://localhost:1337/api/v1/entrance/login', {
// 		method: 'PUT',
// 		// mode: 'no-cors',
// 		// redirect: 'follow',
// 		// referrerPolicy: 'no-referrer',
// 		// credentials: 'same-origin', // include, *same-origin, omit
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'Access-Control-Allow-Origin': '*',

// 		// 'Content-Type': 'application/x-www-form-urlencoded',
// 		},
// 		body: JSON.stringify(data)
// 	});
//   	// waits until the request completes...
// 	console.log(response);
// 	// return response.json();
// }

// export const signUp = async () => {
// 	if (loggedIn) return;
// 	const url = `http://localhost:1337/`;
// 	const res = await fetch(url);
// 	const data = await res.json();
// 	console.log(data);
// 	const loadedUser = data.results.map((data, index) => ({
// 		name: data.name,
// 		id: index + 1,
// 		image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
// 			index + 1
// 		}.png`
// 	}));
// 	user.set(loadedUser);
// };
