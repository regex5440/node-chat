import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NotFound from "../NotFound";
import "../style/App.sass";
import ChatWindow from "./ChatWindow/ChatWindow";
import LoginTab from "./Login/Login";
import LoginWindow from "./Login/LoginWindow";
import SignupTab from "./Login/Signup";
import MainWindow from "./MainWindow/MainWindow";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<MainWindow />} />

        <Route path="/" element={<LoginWindow />}>
          <Route path="login" element={<LoginTab/>}/>
          <Route path="signup" element={<SignupTab/>}/>
        </Route>

        <Route path="/user/:username" element={<ChatWindow />}></Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
