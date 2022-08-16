import { useEffect, useState } from "react";
import PersonTile from "./PersonTile";

import "./style/tile-container.sass";

interface User {
  username: string;
  name?: string;
  isempty?: boolean;
}

export default function TileContainer() {
  const [tiles, setUsers] = useState<User[]>([{ isempty: true, username: "" }]);

  useEffect(() => {
    window
      .fetch("//jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data: User[]) => setUsers(data));
  }, []);

  return (
    <div className="tile__container">
      <div className="tile__container__inner">
        {!tiles[0].isempty &&
          tiles.map((tile: User) => (
            <PersonTile
              key={tile.username}
              name={tile.name}
              username={tile.username}
            />
          ))}
      </div>
    </div>
  );
}
