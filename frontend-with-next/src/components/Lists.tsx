import React from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Lists = ({ listItems, deleteItemHandler, setEditItem }) => {
  return (
    <div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Age</th>
            <th className="px-4 py-2">up</th>
            <th className="px-4 py-2">del</th>
          </tr>
        </thead>

        <tbody>
          {listItems?.map((item) => (
            <tr key={item._id}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.age}</td>
              <td
                onClick={() => setEditItem(item)}
                className="border px-4 py-2"
              >
                <FiEdit />
              </td>
              <td
                onClick={() => deleteItemHandler(item._id)}
                className="border px-4 py-2"
              >
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
