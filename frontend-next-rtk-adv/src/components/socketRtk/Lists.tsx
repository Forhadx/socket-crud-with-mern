import React, { useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  selectAllUsers,
  selectAllUsersStatus,
  selectAllUsersError,
  deleteHandler,
  selectConnectionStatus,
} from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import socketService from "@/socket/socketService";

const Lists = ({ setUpdateUser }) => {
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);
  const status = useSelector(selectAllUsersStatus);
  const error = useSelector(selectAllUsersError);
  const connStatus = useSelector(selectConnectionStatus);

  const deleteItemHandler = async (id) => {
    dispatch({ type: "socket/delete_person", payload: { _id: id } });
  };

  return (
    <div>
      <h1 className="text-green-500">connection status: {connStatus}</h1>
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
                  onClick={() => setUpdateUser(item)}
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
      )}
    </div>
  );
};

export default Lists;
