module.exports = {
    create: (api, attributes, cb) => {
        const reqOptions = {
            method: 'post',
            url: '/device',
            data: {
                alias: attributes.alias,
                kind: attributes.kind,
                port: attributes.port
            },
            headers: {}
        }
        api.socket.request(reqOptions, cb);
    }
};
