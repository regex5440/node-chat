import "../style/header.sass";
import {Link} from "react-router-dom";

export default function Header(){
    return (
        <header>
            <Link to="/">
            <h2>🙌Chat App🙌</h2>
            </Link>
        </header>
    );
}