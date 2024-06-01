// socketMiddleware.js
import { addHandler, deleteHandler, updateHandler } from "@/store/userSlice";
import { io } from "socket.io-client";
// import { addMessage, setConnectionStatus } from "./socketSlice";

const socketMiddleware = (store) => {
  let socket;
  let reconnectAttempts = 0;
  console.log("con..");

  const connectSocket = () => {
    socket = io("http://localhost:5951", {
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      reconnectAttempts = 0;
      //   store.dispatch(setConnectionStatus("connected"));
      console.log("Socket connected");
    });

    socket.on("disconnect", () => {
      //   store.dispatch(setConnectionStatus("disconnected"));
      console.log("Socket disconnected");
    });

    socket.on("reconnect_attempt", () => {
      reconnectAttempts += 1;
      console.log(`Reconnection attempt #${reconnectAttempts}`);
    });

    socket.on("reconnect_failed", () => {
      //   store.dispatch(setConnectionStatus("reconnect_failed"));
      console.log("Reconnection failed");
    });

    socket.on("server:add_person", (data) => {
      store.dispatch(addHandler(data));
    });

    socket.on("server:delete_person", (data) => {
      store.dispatch(deleteHandler(data));
    });

    socket.on("server:update_person", (data) => {
      store.dispatch(updateHandler(data));
    });


    // Additional event listeners
    socket.on("error", (error) => {
      console.error("Socket error:", error);
    });
  };

  return (next) => (action) => {
    switch (action.type) {
      case "socket/connect":
        if (socket) {
          socket.disconnect();
        }
        connectSocket();
        break;
      case "socket/disconnect":
        if (socket) {
          socket.disconnect();
        }
        break;

      case "socket/add_person":
        if (socket) {
          socket.emit("client:add_person", action.payload);
        }
        break;

      case "socket/update_person":
        if (socket) {
          socket.emit("client:update_person", action.payload);
        }
        break;

      case "socket/delete_person":
        if (socket) {
          socket.emit("client:delete_person", action.payload);
        }
        break;

      default:
        break;
    }

    return next(action);
  };
};

export default socketMiddleware;
