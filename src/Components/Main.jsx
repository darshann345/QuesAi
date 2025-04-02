import React, { useState ,useEffect} from "react";
import "./Main.css";
import wLogo from "./../assets/wLogo.png";
import Logo from "./../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";

const Main = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  useEffect(() => {
    if (!isRegistering) {
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");
      const storedUser = localStorage.getItem("user")

      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
        setUsername(storedUser)
      }
    } else {
      setEmail("");
      setPassword("");
    }
  }, [isRegistering]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering && !username) {
      showSnackbar("Username is required!", "error");
      return;
    }
    if (!email || !password) {
      showSnackbar("Email and Password are required!", "error");
      return;
    }

    if (isRegistering) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("user",username);
      showSnackbar("Registration successful! Please log in.", "success");
      setIsRegistering(false);
    } else {
      const storedEmail = localStorage.getItem("email");
      const storedPassword = localStorage.getItem("password");

      if (email === storedEmail && password === storedPassword) {
        showSnackbar("Login successful!", "success");
        navigate("/home");
      } else {
        showSnackbar("Invalid email or password!", "error");
      }
    }

    setUsername("");
    setEmail("");
    setPassword("");
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };
  return (
    <>
      <div className="container">
        <div className="quespart1">
          <div className="quesAitext">
            <img src={wLogo} alt="quesAi Logo" />
            <h1 style={{ fontSize: "30px" }}>
              <b>Ques.</b>AI
            </h1>
          </div>
          <div className="quesAi-Header-text">
            <h2>Your Podcast</h2>
            <h2>will no longer</h2>
            <h2>be just a hobby</h2>
            <p>Supercharge Your Distribution</p>
            <p>using our AI assistant</p>
          </div>
        </div>

        <div className="quespart2">
          <div style={{ position: "relative", right: "25px" }}>
            <img src={Logo} alt="Logo" style={{ marginLeft: "100px" }} />
            <h2 style={{ marginLeft: isRegistering ? "80px" : "70px", color: "purple" }}>
              {isRegistering ? "Join Us" : "Welcome To"}
            </h2>
            <h4 style={{ marginLeft: "100px", marginTop: "-10px", color: "lightdarkblue" }}>
              Ques.AI
            </h4>
          </div>

          <br />
          <br />
          <form onSubmit={handleSubmit}>
            <Box style={{ display: "flex", gap: "10px", flexDirection: "column", backgroundColor: "white" }}>
              {isRegistering && (
                <TextField
                  label="Username"
                  placeholder="Enter your username"
                  type="text"
                  sx={{ width: "400px", backgroundColor: "white", position: "relative", right: "100px" }}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                />
              )}

              <TextField
                label="Email Address"
                placeholder="example@gmail.com"
                type="email"
                sx={{ width: "400px", backgroundColor: "white", position: "relative", right: "100px" }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />

              <TextField
                label="Password"
                placeholder="Password"
                type="password"
                sx={{ width: "400px", backgroundColor: "white", position: "relative", right: "100px" }}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Box>

            <br />
            {!isRegistering && (
              <>
                <div>
                  <div style={{ display: "flex", flexDirection: "row", gap: "100px" }}>
                    <h5 style={{ position: "relative", right: "95px" }}>Remember Me</h5>
                    <h5 style={{ position: "relative", right: "45px" }}>Forgot Password?</h5>
                  </div>
                 
                </div>
              </>

            )}


            <button
              type="submit"
              style={{
                position: "relative",
                backgroundColor: "darkblue",
                color: "white",
                width: "20.5vw",
                right: "90px",
                textAlign: "center",
                height: "50px",
                borderRadius: "5px",
              }}
            >
              {isRegistering ? "Register" : "Login"}
            </button>
            {isRegistering && (
              <>
                <div
                  style={{ display: 'flex', flexDirection: 'row', gap: "5px" }}
                >
                  <h4>Already have a account ?</h4>
                  <h4
                    style={{ color: "skyblue", cursor: 'pointer' }}
                    onClick={() => setIsRegistering(false)}

                  >Sign in</h4>
                </div>

              </>

            )}

            {!isRegistering && (
              <>
                <div style={{ position: "relative", textAlign: "center", marginTop: "30px", right: "90px" }}>
                  <hr style={{ border: "1px solid #ccc" }} />
                  <span
                    style={{
                      position: "absolute",
                      top: "-12px",
                      left: "200px",
                      transform: "translateX(10%)",
                      background: "#fff",
                      padding: "0 10px",
                      fontWeight: "bold",
                    }}
                  >
                    Or
                  </span>
                </div>


                {
                  isRegistering ? (
                    <h4
                      onClick={() => setIsRegistering(true)}
                      style={{ color: "skyblue", cursor: "pointer" }}
                    >
                      Sign In
                    </h4>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: "4px",
                        textAlign: "center",
                        alignContent: "center",
                        marginRight: "200px",
                      }}
                    >
                      <h5>Don't have an account?</h5>

                      <h4
                        onClick={() => setIsRegistering(true)}
                        style={{ color: "skyblue", cursor: "pointer" }}
                      >
                        Create Account
                      </h4>





                    </div>
                  )
                }

              </>
            )}
          </form>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: "100%", position: 'relative', top: "80vh" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Main;
