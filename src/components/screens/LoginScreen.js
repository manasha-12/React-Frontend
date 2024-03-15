import React, { useState, useEffect } from "react";
// import {Container, Row, Col, Button, Form, Card} from 'react-bootstrap';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../Loader";
import Message from "../Message";
import { validEmail } from "./Regex";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import "./Screens.css";
import { login } from "../../actions/UserActions";

function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);

    if (!validEmail.test(email)) {
      setMessage("Invalid Email Address!!");
      navigate("/user/login");
    } else {
      dispatch(login(email, password));
      setMessage("Login is Successful!");
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        {error && <Message variant="danger">{error}</Message>}

        <form action="" method="POST" onSubmit={submitHandler}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaUserAlt className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FaLock className="icon" />
          </div>

          <div className="remember-forgot">
            <label htmlFor="">
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">Login</button>

          <div className="register-link">
            <p>
              Don't have an account? <Link to="/user/register">Register </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
