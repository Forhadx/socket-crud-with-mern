"use client";

import React, { useEffect } from "react";
import InputForm from "../../components/socketRtk/InputForm";
import Lists from "../../components/socketRtk/Lists";
import { useDispatch } from "react-redux";
import { fetchUsers } from "@/store/userSlice";

export default function SocketPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers()).unwrap();
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Use rtk with socket api</h1>
      <InputForm />
      <Lists />
    </div>
  );
}
