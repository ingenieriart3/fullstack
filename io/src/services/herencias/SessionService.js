module.exports = {
    signup: (api, msg, cb) => {
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
          }
          api.socket.request(signupReqOptions, cb);
    },
    logout: (api, cb) => {
        const logoutReqOptions = {
            method: 'get',
            url: '/api/v1/account/logout',
            headers: {
            }
        };
        api.socket.request(logoutReqOptions, cb);
    },
    login: (api, credentials, cb) => {
        const loginReqOptions = {
        method: 'put',
        url: '/api/v1/entrance/login',
        data: {
            emailAddress: credentials.emailAddress,
            password: credentials.password,
        },
        headers: {}
        };
        api.socket.request(loginReqOptions, cb);}
}