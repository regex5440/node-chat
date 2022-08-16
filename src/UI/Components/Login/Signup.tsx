import { Button, CircularProgress, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { checkUsernameFromDb } from "../../../Store/Actions/checkUsername";
import debounceBy from "../../../Utils/debounce";
import "./style/signup.sass";

const debouce = debounceBy(500);

export default function SignupTab() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [userValid, setUserValid] = useState({
    isUsernameValid: false,
    isPasswordStrong: false,
    isFormSubmitted: false,
  });

  const [isUsernameChecking, setCheckingUsername] = useState(false);
  const usernameIsMin = user.username.length >= 2;
  const usernameHasValue = !isUsernameChecking && usernameIsMin;
  const showingCircularLoading = usernameIsMin && isUsernameChecking;

  const handleUsernameInput = ({ target }) => {
    let username = target.value;

    if (usernameIsMin) {
      debouce(() => {
        setCheckingUsername(true);

        checkUsernameFromDb(username)
          .then((isAvailable) => {
            setUserValid({
              ...userValid,
              isUsernameValid: isAvailable as boolean,
            });
            setCheckingUsername(false);
          })
          .catch((err) => {
            setCheckingUsername(false);
            console.error(err);
          });
      });
    }
    setUser({ ...user, username });
  };

  const handlePasswordInput = (e) => {
    const password = e.target.value;
    let isValid =
      password.length > 8 && /(\w+[&@#$%^*]+)|([&@#$%^*]+\w+)/.test(password);

    setUser({ ...user, password });
    setUserValid({ ...userValid, isPasswordStrong: isValid });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let [firstname, lastname] = [e.target.firstname, e.target.lastname];
    if (!firstname.value) {
      firstname.classList.add("failed");
      return;
    } else {
      firstname.classList.remove("failed");
    }
    setUserValid({ ...userValid, isFormSubmitted: true });
    // Handle Signup including error handling
    //Create New profile and create the store
    // Redirect to homepage
  };

  const renderForm = () => {
    return (
      <form className="signup__form" onSubmit={handleSignup}>
        <div className="signup__name">
          <input
            type="text"
            placeholder="First name"
            className="firstname"
            name="firstname"
          />
          <input
            type="text"
            placeholder="Last name"
            className="lastname"
            name="lastname"
          />
        </div>

        <div className="signup__username">
          <TextField
            type="text"
            error={usernameHasValue && !userValid.isUsernameValid}
            color={
              usernameHasValue
                ? userValid.isUsernameValid
                  ? "success"
                  : "error"
                : "info"
            }
            placeholder="Username"
            className="username"
            name="username"
            value={user.username}
            onChange={handleUsernameInput}
            fullWidth={true}
            helperText={`${
              usernameHasValue
                ? userValid.isUsernameValid
                  ? "Available!"
                  : "Not available or invalid"
                : ""
            }`}
          />
          {showingCircularLoading && (
            <CircularProgress
              size={20}
              className="username__check"
              sx={{
                position: "absolute",
                top: "28%",
                right: "5px",
              }}
              variant="indeterminate"
              color="inherit"
              thickness={3}
            />
          )}
        </div>

        <div className="signup__password">
          <TextField
            type="password"
            error={Boolean(user.password) && !userValid.isPasswordStrong}
            color={
              Boolean(user.password)
                ? userValid.isPasswordStrong
                  ? "success"
                  : "error"
                : "info"
            }
            placeholder="Set a new password"
            className="password"
            name="password"
            value={user.password}
            onChange={handlePasswordInput}
            fullWidth={true}
            helperText={`${
              Boolean(user.password)
                ? userValid.isPasswordStrong
                  ? ""
                  : "Password is weak!"
                : ""
            }`}
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          className="signup__cta"
          fullWidth={true}
          disabled={!(userValid.isUsernameValid && userValid.isPasswordStrong)}
        >
          {userValid.isFormSubmitted ? "Creating your account" : "Sign Up"}
          {userValid.isFormSubmitted && 
          <Box
          sx={{
            position: 'absolute',
            left: '0',
            top: '0',
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(150,81,214,0.8)'
          }}
          >
          <CircularProgress 
            color="inherit"
            size={25}
            sx={{
              position: 'absolute',
              left: '46%',
              top: '15%'
            }}
          />
          </Box>}
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
