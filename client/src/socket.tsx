import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";

// ✅ Create context OUTSIDE the component
const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  // ✅ Initialize socket connection only once using useMemo
  const socket = useMemo(
    () =>
      io("http://localhost:3000", {
        withCredentials: true,
      }),
    []
  );

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

// ✅ Custom hook to use socket easily
export const useSocket = () => {
  return useContext(SocketContext);
};
