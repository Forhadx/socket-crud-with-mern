"use client";

import { store } from "../store/store";
import { Provider, useDispatch } from "react-redux";
// import socketService from "../socket/socketService";
// import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   socketService.connect();

  //   return () => {
  //     socketService.disconnect();
  //   };
  // }, []);


  return <Provider store={store}>{children}</Provider>;
}
