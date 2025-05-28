// import _ from 'underscore';
// import { writable } from 'svelte/store';
// import { browser } from '$app/env'
// import { api } from "../stores/api";

// export const state = writable(
// 	browser && (sessionStorage.getItem('state'))
// )
// state.subscribe((val) => browser && (sessionStorage.state = val));

//     // let state = {};

// const handleSocket = (msg) => {
//         console.log('Sails was sent a message: ', msg)
//         // var devices = _.toArray(state.devices)
//         var devices = _.toArray(state.devices)
//         // var devices = _.toArray(this.state.devices)
//         const index = _.findIndex(devices, { id: msg.id })
    
//         console.log(index)
//         console.log(devices)
//         console.log('LLega msge de socket...: ', msg)
//         console.log(devices[index])
        
//         if (msg.data.status !== undefined) {
//             let dev = devices[index]
//             console.log('>>>dev : ', dev)
//             dev['status'] = msg.data.status
//             dev['history'] = msg.previous.history
//             console.log(dev)
//             devices[index] = dev
//         }
        
//         // this.setState({ devices: devices })
//         setState(devices)
//     }

    
//     const setState = (msg) => {
//         console.log('from set state' ,state)
//         state.devices = msg.devices
//         console.log('to set state' ,state)
//         console.log('LOS DEVICES', state.devices)
//     }
    
//     const getDevices = () =>{
//         // this.props.api.socket.get('/device/get', this.handleResponse)
//         api.socket.get('/device/get', handleResponse)
//     }
    
//     const handleResponse = (msg) => {
//         console.log(msg)
//         setState({ devices: msg })
//     }
    
//     api.socket.on('device', handleSocket);
//     getDevices();