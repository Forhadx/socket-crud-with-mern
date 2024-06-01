import { addHandler } from "@/store/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import socketService from "../../socket/socketService";

const InputForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const addItemHandler = async (data: any) => {
    await socketService.emit("client:add_person", data);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    addItemHandler({ name, age });

    setName("");
    setAge("");

    // dispatch(addHandler()).unwrap();

    /*
    if (!editItem) {
      // addItemHandler({ name, age });
      setName("");
      setAge("");
    } else {
      // updateItemHandler({ name, age, _id: editItem._id });
      setName("");
      setAge("");
    }*/
  };

  useEffect(() => {
    socketService.connect();
    socketService.on("server:add_person", (data) => {
      dispatch(addHandler(data));
    });
    return () =>
      socketService.off("server:add_person", (data) => {
        dispatch(addHandler(data));
        socketService.disconnect();
      });
  }, [dispatch]);

  // useEffect(() => {
  //   if (editItem) {
  //     setName(editItem.name);
  //     setAge(editItem.age);
  //   }
  // }, [editItem]);

  return (
    <div>
      <form
        onSubmit={submitFormHandler}
        className="w-96 flex gap-4 bg-white shadow-md rounded p-2 mb-4"
      >
        <input
          type="text"
          placeholder="enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="number"
          placeholder="enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >{`${0 ? "EDIT" : "ADD"}`}</button>
      </form>
    </div>
  );
};

export default InputForm;
