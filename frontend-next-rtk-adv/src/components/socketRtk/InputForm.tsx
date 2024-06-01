import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const InputForm = ({ updateUser }: any) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const submitFormHandler = (event) => {
    event.preventDefault();

    let data = {
      name,
      age,
    };

    if (updateUser) {
      dispatch({
        type: "socket/update_person",
        payload: { ...data, _id: updateUser?._id },
      });
    } else {
      dispatch({ type: "socket/add_person", payload: data });
    }

    setName("");
    setAge("");
  };

  useEffect(() => {
    if (updateUser) {
      setName(updateUser.name);
      setAge(updateUser.age);
    }
  }, [updateUser]);

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
