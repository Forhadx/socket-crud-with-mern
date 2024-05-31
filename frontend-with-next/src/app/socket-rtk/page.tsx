"use client";

import React, { useEffect, useState } from "react";
import InputForm from "../../components/socketRtk/InputForm";
import Lists from "../../components/socketRtk/Lists";
// import io from "socket.io-client";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUsers } from "@/store/userSlice";

// const socket = io.connect("http://localhost:5951");

export default function SocketPage() {
  /*
  const [listItems, setListItems] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // ------ FETCH -------
  useEffect(() => {
    axios.get("http://localhost:5951").then((res) => {
      setListItems(res.data.persons);
    });
  }, []);

  //----- ADD ----
  const addItemHandler = async (data: any) => {
    await socket.emit("client:add_person", data);
  };

  useEffect(() => {
    const handler = (data: any) => {
      setListItems((list: any) => [data, ...list]);
    };
    socket.on("server:add_person", handler);
    return () => socket.off("server:add_person", handler);
  }, []);

  //------ DELETE -------
  const deleteItemHandler = async (id) => {
    await socket.emit("client:delete_person", { _id: id });
  };

  useEffect(() => {
    const handler = (data: any) => {
      setListItems((items) => items.filter((i) => i._id !== data._id));
    };
    socket.on("server:delete_person", handler);
    return () => socket.off("server:delete_person", handler);
  }, []);

  // ------- UPDATE ------
  const updateItemHandler = async (data: any) => {
    await socket.emit("client:update_person", data);
  };

  useEffect(() => {
    const handler = (data: any) => {
      setListItems((items) => {
        let index = items.findIndex((i) => i._id === data._id);
        items[index] = data;
        return [...items];
      });
    };
    socket.on("server:update_person", handler);
    return () => socket.off("server:update_person", handler);
  }, []);
  */

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
