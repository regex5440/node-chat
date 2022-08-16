import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import "./style/login.sass";
export default function LoginTab() {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    username.length && password.length
      ? setSubmitDisabled(false)
      : setSubmitDisabled(true);
  }, [username, password]);

  const onInput = ({ target }) => {
    if (target.name === "username") {
      setUsername(target.value);
    } else {
      setPassword(target.value);
    }
  };

  const renderForm = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      //Handle Submission of Login form including Error Handling
      //Create the store
      //Redirect to homepage
    };

    return (
      <form className="login__form" onSubmit={handleSubmit}>
        <TextField
          type="text"
          label="Username"
          placeholder="Username, email or mobile number..."
          className="login__username"
          name="username"
          fullWidth={true}
          value={username}
          onChange={onInput}
        />
        <TextField
          type="password"
          label="Password"
          name="password"
          placeholder="Password"
          className="login__password"
          fullWidth={true}
          value={password}
          onChange={onInput}
        />
        <Button
          variant="contained"
          type="submit"
          className="login__submit"
          disabled={submitDisabled}
        >
          Login
        </Button>
      </form>
    );
  };

  return (
    <div className="login__outlet">
      <div className="login__outlet__container">{renderForm()}</div>
    </div>
  );
}
