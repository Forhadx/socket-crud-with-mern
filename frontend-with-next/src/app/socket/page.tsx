"use client";

import React, { useEffect, useState } from "react";
import InputForm from "../../components/InputForm";
import Lists from "../../components/Lists";
import io from "socket.io-client";
import axios from "axios";

const socket = io.connect("http://localhost:5951");

export default function SocketPage() {
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

  //------ DELETE -------
  const deleteItemHandler = async (id) => {
    await socket.emit("client:delete_person", { _id: id });
  };

  // ------- UPDATE ------
  const updateItemHandler = async (data: any) => {
    await socket.emit("client:update_person", data);
  };

  // ------- ALL SOCKET ACTIONS ------
  const addHandler = (data: any) => {
    setListItems((list: any) => [data, ...list]);
  };

  const deleteHandler = (data: any) => {
    setListItems((items) => items.filter((i) => i._id !== data._id));
  };

  const updateHandler = (data: any) => {
    setListItems((items) => {
      let index = items.findIndex((i) => i._id === data._id);
      items[index] = data;
      return [...items];
    });
  };

  useEffect(() => {
    socket.on("server:add_person", addHandler);
    socket.on("server:delete_person", deleteHandler);
    socket.on("server:update_person", updateHandler);
    return () => {
      socket.off("server:add_person", addHandler);
      socket.off("server:delete_person", deleteHandler);
      socket.off("server:update_person", updateHandler);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <InputForm
          addItemHandler={addItemHandler}
          editItem={editItem}
          updateItemHandler={updateItemHandler}
        />
        <Lists
          listItems={listItems}
          deleteItemHandler={deleteItemHandler}
          setEditItem={setEditItem}
        />
      </header>
    </div>
  );
}
