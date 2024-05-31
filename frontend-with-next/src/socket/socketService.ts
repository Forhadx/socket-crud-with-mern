// socketService.js
import { io } from "socket.io-client";

class SocketService {
  //   socket: any;

  constructor() {
    this.socket = null;
  }

  connect() {
    this.socket = io("http://localhost:5951");
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
    }
  }
}

const socketService = new SocketService();
export default socketService;
