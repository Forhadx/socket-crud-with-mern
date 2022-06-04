import React, { useEffect, useState } from "react";

const InputForm = ({ addItemHandler, editItem, updateItemHandler }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const submitFormHandler = (event) => {
    event.preventDefault();

    if (!editItem) {
      addItemHandler({ name, age });
      setName("");
      setAge("");
    } else {
      updateItemHandler({ name, age, _id: editItem._id });
      setName("");
      setAge("");
    }
  };

  useEffect(() => {
    if (editItem) {
      setName(editItem.name);
      setAge(editItem.age);
    }
  }, [editItem]);

  return (
    <div>
      <form onSubmit={submitFormHandler}>
        <input
          type="text"
          placeholder="enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">{`${editItem ? "EDIT" : "ADD"}`}</button>
      </form>
    </div>
  );
};

export default InputForm;
