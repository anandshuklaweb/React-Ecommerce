import React, { useState } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/Card";

import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { useSelector } from "react-redux";
import { selectpreviousURL } from "../../redux/slice/cartSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const previousURL = useSelector(selectpreviousURL);

  const navigate = useNavigate();

  const redirectUser = () => {
    if(previousURL.includes("cart")){
      return navigate("/cart")
    }

    return navigate("/")
  }

  // Login with Email and Password
  const handleLogin = (e) => {
    e.preventDefault();

    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success("Login Successful..");
        setIsLoading(false);

        redirectUser()
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  // Login with Google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Login Successfull...")

        redirectUser()
      })
      .catch((error) => {
        toast.error(error.message)
      });
  };

  return (
    <>
      {isLoading && <Loader />}

      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="Login" width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="--btn --btn-danger --btn-block" type="submit">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Reset Password</Link>
              </div>
              <p>-- or --</p>
            </form>
            <button
              className="--btn --btn-danger --btn-block"
              onClick={signInWithGoogle}
            >
              <FaGoogle color="#fff" style={{ marginRight: "5px"}}/>  Login With Google
            </button>
            <div className={styles.register}>
              <p style={{ marginRight: "5px"}}>Don't have an account?</p> 
              <Link to="/register">Register</Link>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Login;
