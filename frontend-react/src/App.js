import React, { useEffect, useState } from "react";
import "./App.css";
import InputForm from "./InputForm";
import Lists from "./Lists";
import io from "socket.io-client";
import axios from "axios";

const socket = io.connect("http://localhost:5951");

function App() {
  const [listItems, setListItems] = useState([]);
  const [editItem, setEditItem] = useState(null);

  // ------ FETCH -------
  useEffect(() => {
    axios.get("http://localhost:5951").then((res) => {
      setListItems(res.data.persons);
    });
  }, []);

  //----- ADD ----
  const addItemHandler = async (data) => {
    await socket.emit("client:add_person", data);
  };

  useEffect(() => {
    const handler = (data) => {
      setListItems((list) => [data, ...list]);
    };
    socket.on("server:add_person", handler);
    return () => socket.off("server:add_person", handler);
  }, []);

  //------ DELETE -------
  const deleteItemHandler = async (id) => {
    await socket.emit("client:delete_person", { _id: id });
  };

  useEffect(() => {
    const handler = (data) => {
      setListItems((items) => items.filter((i) => i._id !== data._id));
    };
    socket.on("server:delete_person", handler);
    return () => socket.off("server:delete_person", handler);
  }, []);

  // ------- UPDATE ------
  const updateItemHandler = async (data) => {
    await socket.emit("client:update_person", data);
  };

  useEffect(() => {
    const handler = (data) => {
      setListItems((items) => {
        let index = items.findIndex((i) => i._id === data._id);
        items[index] = data;
        return [...items];
      });
    };
    socket.on("server:update_person", handler);
    return () => socket.off("server:update_person", handler);
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

export default App;
