import { io } from "socket.io-client";

export const connectSocket = (token) => {
  return io("http://localhost:3000", {
    auth: {
      token,
    },
  });
};