import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Profile = {
  isloading: boolean;
  name?: string;
};

export default function ChatHeader({ username }: { username?: string }) {
  const [userData, setUserData] = useState<Profile>({ isloading: true });
  const isUserLoading = userData.isloading;
  useEffect(() => {
    window
      .fetch(
        `https://jsonplaceholder.typicode.com/users?username=${encodeURIComponent(
          username || ""
        )}`
      )
      .then((data) => data.json())
      .then(([user]) => {
        if (userData.isloading) {
          setUserData({
            isloading: false,
            name: user.name,
          });
        }
      });
  }, []);

  return (
    <header className="chat__header">
      <div className="chat__header_container">
        <Link className="back" to="/">
          ←
        </Link>
        {isUserLoading ? (
          <Skeleton variant="text" className="chat__header_username loading" />
        ) : (
          <div className="chat__header_username">{userData.name}</div>
        )}
      </div>
    </header>
  );
}
