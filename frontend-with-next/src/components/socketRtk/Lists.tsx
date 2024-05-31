import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  selectAllUsers,
  selectAllUsersStatus,
  selectAllUsersError,
} from "@/store/userSlice";
import { useSelector } from "react-redux";

const Lists = () => {
  const users = useSelector(selectAllUsers);
  const status = useSelector(selectAllUsersStatus);
  const error = useSelector(selectAllUsersError);

  return (
    <div>
      {(status === "loading" || status === "idle") && (
        <p className="text-3xl text-red-500">Loading...</p>
      )}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && (
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
            {users?.map((item) => (
              <tr key={item._id}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.age}</td>
                <td
                  // onClick={() => setEditItem(item)}
                  className="border px-4 py-2"
                >
                  <FiEdit />
                </td>
                <td
                  // onClick={() => deleteItemHandler(item._id)}
                  className="border px-4 py-2"
                >
                  <MdOutlineDeleteOutline />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Lists;
