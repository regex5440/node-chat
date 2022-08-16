import { useLocation, useParams } from "react-router-dom";
import "./style/chat-window.sass";
import ChatHeader from "./ChatHeader";
import ChatArea from "./ChatArea";

export default function ChatWindow() {
  const params = useParams();
  const location = useLocation();
  console.log(params);
  console.log(location);
  return (
    <>
      <ChatHeader {...params} />
      <ChatArea />
    </>
  );
}
