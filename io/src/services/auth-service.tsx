import io from './socket';

export const signUp = async (msg, cb) => {
  const signupReqOptions = {
    method: 'post',
    url: '/api/v1/entrance/signup',
    data: {
      emailAddress: msg.emailAddress,
      password: msg.password,
      rememberMe: msg.rememberMe,
      fullName: msg.fullName,
    },
    headers: {},
  };
  io.socket.request(signupReqOptions, cb);
};
export const signOut = (cb) => {
  const logoutReqOptions = {
    method: 'get',
    url: '/api/v1/account/logout',
  };
  io.socket.request(logoutReqOptions, cb);
};
export const signIn = (credentials, cb) => {
  const loginReqOptions = {
    method: 'put',
    url: '/api/v1/entrance/login',
    data: {
      emailAddress: credentials.email,
      password: credentials.password,
    },
  };
  io.socket.request(loginReqOptions, cb);
};

export const getUserInfo = (handleResponse) => {
  try {
    console.log('getuserinfo ');
    const reqOptions = {
      method: 'get',
      url: '/session/get-user-info',
      headers: {},
    };
    io.socket.request(reqOptions, handleResponse);
  } catch (e) {
    console.log('error en getUserINfo ', e);
  }
};
