import io from './socket';

// Helper function to handle requests
const makeRequest = async (
  method,
  entity,
  id = null,
  attributes = {},
  cb = null,
) => {
  const url = id ? `/${entity}/${id}` : `/${entity}`;
  const reqOptions = {
    method,
    url,
    data: attributes,
    headers: {},
  };

  return await io.socket.request(reqOptions, cb);
};

// Generic POST request for creating an entity
export const postEntity = (entity, attributes, cb) => {
  makeRequest('post', entity, null, attributes, cb);
};

// Generic GET request to fetch an entity or a list of entities
export const getEntity = async (entity, id = null, handleResponse) => {
  return await makeRequest('get', entity, id, {}, handleResponse);
};

// Generic PUT request for updating an entity
export const putEntity = async (entity, id, attributes, cb) => {
  return await makeRequest('put', entity, id, attributes, cb);
};

// Generic PATCH request for partially updating an entity
export const patchEntity = async (entity, id, attributes, cb) => {
  return await makeRequest('patch', entity, id, attributes, cb);
};

// Generic DELETE request for removing an entity
export const deleteEntity = async (entity, id, cb) => {
  return await makeRequest('delete', entity, id, {}, cb);
};

// Generic create handler
export const createEntity = (entity, msg) => {
  console.log('Executing... entity: ', entity, ' msg: ', msg);
  const attributes = {
    ...msg,
  };
  postEntity(entity, attributes, handleResponse);
};

// Generic update handler
export const updateEntity = (entity, msg) => {
  console.log('Updating... entity: ', entity, ' msg: ', msg);
  const attributes = {
    ...msg,
  };
  patchEntity(entity, msg.id, attributes, handleResponse);
};

// Response handler
export const handleResponse = (body, JWR) => {
  console.log('Body: ', body);
  if (JWR.statusCode === 200) {
    console.log(
      `Success: ${body.id ? 'Created/Updated' : 'Fetched'} entity. ID: `,
      body.id,
    );
  } else {
    console.log('Error: ', JWR);
  }
};

// Example usage for a "device" entity
// export const createDevice = (msg) => {
//   createEntity('device', msg);
// };

// export const updateDevice = (msg) => {
//   updateEntity('device', msg);
// };

// export const deleteDevice = async (id) => {
//   await deleteEntity('device', id, handleResponse);
// };

// export const getDevices = async () => {
//   return await getEntity('device', null, handleResponse);
// };
