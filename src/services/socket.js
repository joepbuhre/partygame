import { io } from 'socket.io-client';


const instance = {
    connect: () => {
        console.log(process.env)
        if(process.env.NODE_ENV === 'development'){
            return io(process.env.VUE_APP_SOCKET_ENDPOINT)
        } else {
            return io()
        }
    }
}

const socket = instance.connect()

export default socket