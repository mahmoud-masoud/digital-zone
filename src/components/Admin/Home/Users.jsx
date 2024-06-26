import { useEffect, useState } from "react";
import { UsersIcon } from "@heroicons/react/24/solid";

import { collection, getCountFromServer, query } from "firebase/firestore";
import { db } from "../../../Utils/firebaseConfig";
const Users = () => {
  const [usersCount, setUsersCount] = useState(0);
  useEffect(() => {
    const getUsers = async () => {
      const usersColRef = collection(db, "users");
      const snapshot = await getCountFromServer(usersColRef);
      setUsersCount(snapshot.data().count);
    };
    getUsers();
  }, []);

  return (
    <div className="flex-1 rounded-md bg-amber-100 p-4 ">
      <div className="mb-4 flex gap-4">
        <span className="">Users</span>
        <UsersIcon className="h-7 w-7 text-after" />
      </div>
      <p className="font-semibold">{usersCount}</p>
    </div>
  );
};
export default Users;
