import io from './socket';

export const postDevice = (attributes, cb) => {
  const reqOptions = {
    method: 'post',
    url: '/device',
    data: {
      alias: attributes.alias,
      kind: attributes.kind,
      port: attributes.port,
      // status: { test: 'test' } || {},
    },
    headers: {},
  };
  io.socket.request(reqOptions, cb);
  // io.socket.post('device', attributes, cb);
};

export const getDevice = async (id, handleResponse) => {
  const reqOptions = {
    method: 'get',
    url: `/device/${id}`,
    headers: {},
  };
  return await io.socket.request(reqOptions, handleResponse);
};

export const putDevice = async (id, attributes, cb) => {
  // const { id } = attributes;
  const reqOptions = {
    method: 'put',
    url: `/device/${id}`,
    data: {
      alias: attributes.alias,
      kind: attributes.kind,
      port: attributes.port,
      // status: { test: 'test' } || {},
    },
    headers: {},
  };
  console.log('reqOptions ', reqOptions);
  return await io.socket.request(reqOptions, cb);
  // io.socket.post('device', attributes, cb);
};

export const patchDevice = async (id, attributes, cb) => {
  // const { id } = attributes;
  const data = {
    id: id,
    alias: attributes.alias,
    kind: attributes.kind,
    port: attributes.port,
    // status: { test: 'test' } || {},
  };

  // console.log('reqOptions ', reqOptions);
  return await io.socket.patch(`/device/${id}`, data, cb);
  // io.socket.post('device', attributes, cb);
};

export const handleResponse = (body, JWR) => {
  console.log('body ', body);
  if (JWR.statusCode === 200) {
    console.log('Created device. ID: ', body.id);
    //     // setState({creating: false});
    //     // props.onCreated();
  } else {
    console.log('Error: ', JWR);
  }
};
// const handleSubmit=(event)=>{
export const createDevice = (msg) => {
  console.log('ejecutando...io ', io);
  console.log('ejecutando...msg ', msg);
  const attributes = {
    alias: msg.alias,
    kind: msg.kind,
    port: msg.port,
    status: {},
    plan: {},
  };
  postDevice(attributes, handleResponse);
  // event.preventDefault();
};

export const updateDevice = (msg) => {
  console.log('msg .... ', msg);
  const attributes = {
    alias: msg.alias,
    kind: msg.kind,
    port: msg.port,
    // status: {},
    // plan: {},
  };
  // putDevice(msg.id, attributes, handleResponse);
  patchDevice(msg.id, attributes, handleResponse);
  // postDevice(attributes, handleResponse);
  // event.preventDefault();
};

export const deleteDevice = async (id): Promise<string> => {
  const reqOptions = {
    method: 'delete',
    url: `/device/${id}`,
    headers: {},
  };
  console.log('reqOptions ', reqOptions);
  return await io.socket.request(reqOptions, handleResponse);
};

export const getDevices = async () => {
  // const cbGetDevices = (body, JWR) => {
  //   console.log('body ', body);
  //   if (JWR.statusCode === 200) {
  //     console.log('Get Devices: 200 ok');
  //     // console.log('Get Devices: ', body);
  //     return body;
  //   } else {
  //     console.log('Error: ', JWR);
  //   }
  // };
  function cbGetDevices(body, JWR) {
    return function () {
      console.log('body ', body);
      if (JWR.statusCode === 200) {
        console.log('Get Devices: 200 ok');
        // console.log('Get Devices: ', body);
        return body;
      } else {
        console.log('Error: ', JWR);
      }
    };
  }
  const reqOptions = {
    method: 'get',
    // url: '/device',
    url: '/device/get-my-devices',
    headers: {},
  };
  const devices = await io.socket.request(reqOptions, cbGetDevices);
  console.log('devices ', devices);
  // return devices;
};

// export const getDevice = async (id) => {
//   function cbGetDevices(body, JWR) {
//     return function () {
//       console.log('body ', body);
//       if (JWR.statusCode === 200) {
//         console.log('Get Devices: 200 ok');
//         // console.log('Get Devices: ', body);
//         return body;
//       } else {
//         console.log('Error: ', JWR);
//       }
//     };
//   }
//   const reqOptions = {
//     method: 'get',
//     url: `/device/${id}`,
//     headers: {},
//   };
//   const devices = await io.socket.request(reqOptions, cbGetDevices);
//   console.log('get /device/id ', id, devices);
//   // return devices;
// };

// import http from '../http-common'

// const getAll = () => {
//   return http.get('/gym')
// }

// const get = (id) => {
//   return http.get(`/gym/${id}`)
// }

// const create = (data) => {
//   console.log(data)
//   return http.post('/gym', data)
// }

// const update = (id, data) => {
//   return http.put(`/gym/${id}`, data)
// }

// const remove = (id) => {
//   return http.delete(`/gym/${id}`)
// }

// const findByName = (name) => {
//   return http.get(`/gym?search=${name}`)
// }

// export default {
//   getAll,
//   get,
//   create,
//   update,
//   remove,
//   findByName,
// }
