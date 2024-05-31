"use client";

import { selectAllUsers } from "@/store/userSlice";
import { useSelector } from "react-redux";

export default function RtkDataPage() {
  const users = useSelector(selectAllUsers);

  return (
    <div>
      <h1 className="font-bold text-3xl mb-4">FetchDataPage</h1>
      <div className="w-96">
        {users.map((item: any, idx: number) => (
          <div
            className="flex justify-between py-2 px-4 gap-4 border-b"
            key={idx}
          >
            <p>{item?.name}</p>
            <p>{item?.age}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
