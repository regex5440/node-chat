import { Link } from "react-router-dom";
import "./style/persontile.sass";

interface Person {
  name?: string;
  username: string;
}

export default function PersonTile({ name, username }: Person) {
  return (
    <Link to={`user/${username}`} className="person__tile">
      <div className="person__tile__container">{name}</div>
    </Link>
  );
}
