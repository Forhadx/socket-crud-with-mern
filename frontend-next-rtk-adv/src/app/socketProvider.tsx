"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "socket/connect" });

    return () => {
      dispatch({ type: "socket/disconnect" });
    };
  }, [dispatch]);

  return <div>{children}</div>;
}
