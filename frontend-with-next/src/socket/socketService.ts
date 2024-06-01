// socketService.js
import { io } from "socket.io-client";

class SocketService {
  constructor() {
    if (!SocketService.instance) {
      this.socket = null;
      SocketService.instance = this;
    }
    return SocketService.instance;
  }

  connect() {
    if (!this.socket) {
      this.socket = io("http://localhost:5951");
      this.socket.on("connect", () => {
        console.log("Connected to socket server");
      });
      this.socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null; // Reset socket after disconnecting
      console.log("Socket disconnected");
    }
  }

  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
      console.log(`Listening for ${event} event`);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
      console.log(`Stopped listening for ${event} event`);
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, data);
      console.log(`Emitted ${event} event with data:`, data);
    }
  }
}

const socketService = new SocketService();
export default socketService;
