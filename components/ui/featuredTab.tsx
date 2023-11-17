"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import FeaturedAccount from "./featuredAccount";

const FeaturedTab = () => {
  const [searchUsers, setSearchUsers] = useState<any[]>([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await axios.get("/api/users/getAll");
      setSearchUsers(data);
    };
    getAllUsers();
  }, []);
  return (
    <aside className=" hidden h-screen w-full flex-col overflow-y-scroll border-l-2 p-2  lg:col-start-9  lg:col-end-13 lg:flex">
      <div className=" rounded-2xl bg-slate-200 p-2 dark:bg-slate-800">
        <h1 className=" p-2 text-xl font-extrabold">Who to follow</h1>
        <div className=" w-full">
          {searchUsers.map((user) => {
            return <FeaturedAccount user={user} key={user.id} />;
          })}
        </div>
        <p
          className={`${searchUsers.length !== 0 ? "hidden" : ""
            } text-center text-xl font-extrabold `}
        >
          No one With That Name
        </p>
      </div>
    </aside>
  );
};
export default FeaturedTab;
