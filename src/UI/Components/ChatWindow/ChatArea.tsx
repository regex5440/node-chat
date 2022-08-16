import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import "./style/chat-area.sass";

function TypeBox() {
  const [message, updateMessage] = useState("");

  const sendMessage = () => {
    //Call a util functions that will receive the message as props
    updateMessage("");
  };

  const messageIsEmpty = () => {
    return !(message.length > 0);
  };

  return (
    <form className="typebox" onSubmit={sendMessage}>
      <input
        className="typebox__input"
        type="text"
        name="typebox__input"
        maxLength={500}
        placeholder="Your Message Here..."
        onChange={(e) => updateMessage(e.target.value)}
        value={message}
      />
      <button
        disabled={messageIsEmpty()}
        className="typebox__submit"
        type="submit"
      >
        <SendIcon />
      </button>
    </form>
  );
}

function Message(props) {
  // This variable will change to the username of the actual user or username
  let isMine = props.username === "harsh"; //window.atob(sessionStorage.getItem('userId') as string);
  return (
    <div className={`message${isMine ? " mine" : ""}`}>
      <div className="message__container">{props.msg}</div>
    </div>
  );
}

function Messages({ messages }) {
  const [userHasNotScrolled, setUserScroll] = useState(true);
  const messageArea: { current: any } = useRef(null);
  let __timeout: null | number = null;

  const updateUserScrollStatus = (val: boolean) => {
    if (__timeout === null) {
      __timeout = setTimeout(() => {
        setUserScroll(val);
      }, 2000) as unknown as number;
    } else {
      clearTimeout(__timeout);
      __timeout = null;
    }
  };

  useEffect(() => {
    if (
      userHasNotScrolled &&
      messageArea.current.scrollHeight > messageArea.current.offsetHeight
    ) {
      messageArea.current.scrollTo(0, messageArea.current.scrollHeight);
    }

    messageArea.current.onscroll = ({ target }) => {
      let scrolled = Math.ceil(target.scrollTop + target.offsetHeight);
      let userReachedBackToEnd = scrolled >= target.scrollHeight;
      updateUserScrollStatus(userReachedBackToEnd ? true : false);
    };
  }, [messages]);

  return (
    <div className="messages__area" ref={messageArea}>
      <div className="message__container">
        <div className="message__list__container">
          {messages.map((message) => (
            <Message {...message} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChatArea() {
  //These messages will be fetched from the server for every f**king chat window
  const messages = [
    { username: "harsh", msg: "Hi" },
    { username: "someone", msg: "Hello" },
    {username: 'harsh', msg: 'This is going to be a very very very very long message. That will aquire all the remaining space between the messages of two different people'}
  ]

  return (
    <div className="chat__window">
      <TypeBox />
      <Messages
        messages={messages}
      />
    </div>
  );
}
