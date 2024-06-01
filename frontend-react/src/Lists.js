import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Lists = ({ listItems, deleteItemHandler, setEditItem }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>up</th>
            <th>del</th>
          </tr>
        </thead>

        <tbody>
          {listItems?.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td onClick={() => setEditItem(item)}>
                <FiEdit />
              </td>
              <td onClick={() => deleteItemHandler(item._id)}>
                <MdOutlineDeleteOutline />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Lists;
