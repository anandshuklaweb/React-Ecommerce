import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../components/loader/Loader";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      toast.error("Passwords do not match.");
    }

    setIsLoading(true)

    // Firebase register function
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);

        toast.success("Registration Successful..")

        navigate("/login")
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
    {isLoading && <Loader />}
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Register</h2>
          <form onSubmit={registerUser}>
            <input
              type="text"
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
            <input
              type="password"
              placeholder="Confirm Password"
              required
              value={cPassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <button className="--btn --btn-danger --btn-block" type="submit">
              Register
            </button>
          </form>

          <span className={styles.register}>
            <p style={{ marginRight: "5px"}}>Already an account?</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>

      <div className={styles.img}>
        <img src={registerImg} alt="Login" width="400" />
      </div>
    </section>
    </>
  );
};

export default Register;