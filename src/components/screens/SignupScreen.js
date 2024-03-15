import React, { useState, useEffect } from "react";
// import {Container, Row, Col, Button, Form, Card} from 'react-bootstrap';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Loader from "../Loader";
import Message from "../Message";
import { validEmail } from "./Regex";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import "./Screens.css";
import { signup } from "../../actions/UserActions";

function SignupScreen() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const userSignup = useSelector((state) => state.userSignup);
  const { error, loading, userInfo } = userSignup;

  useEffect(() => {
    console.log(userInfo,error)
    if (userInfo) {
      setMessage("Signup is Successful, Please Activate Your Account!");
      setFname("");
      setLname("");
      setEmail("");
      setPassword("");
      setRepassword("");
    } else if (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.detail === "Email Address already exists"
      ) {
        setMessage(
          "Email Address already exists. Please use a different email or proceed to login."
        );
      } else {
        setMessage(error);
      }
    }
  }, [userInfo, error, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(fname, lname, email, password, repassword);

    if (password !== repassword) {
      setMessage("Passwords Don't Match!!");
      navigate("/user/register");
    }

    if (!validEmail.test(email)) {
      setMessage("Invalid Email Address!!");
    }

    try {
      // Dispatch the signup action
      dispatch(signup(fname, lname, email, password));

      // Clear form fields if signup is successful
      setFname("");
      setLname("");
      setEmail("");
      setPassword("");
      setRepassword("");
    } catch (error) {
      // Handle signup failure
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.detail === "Email Address already exists"
      ) {
        setMessage(
          "test Email Address already exists. Please use a different email or proceed to login."
        );
      } else {
        setMessage(
          error.response && error.response.data.detail
            ? error.response.data.detail
            : "Signup Failed"
        );
      }
    }
  };

  return (
    // <>
    //     <Container className='mt-3'>
    //         <Row>
    //             <Col md={4}></Col>
    //             <Col md={4}>
    //                 <Card>
    //                     <Card.Header as='h3' className='text-center bg-black text-light'>
    //                         Signup
    //                     </Card.Header>

    //                     <Card.Body>

    //                     </Card.Body>

    //                 </Card>
    //             </Col>
    //             <Col md={4}></Col>
    //         </Row>
    //     </Container>
    // </>
    <div className="login">
      <div className="wrapper">
        {message && <Message variant="danger">{message}</Message>}

        <form onSubmit={submitHandler} method="POST">
          <h1>Signup</h1>
          <div className="input-box">
            <input
              type="text"
              placeholder="First Name"
              name="fname"
              required
              value={fname}
              onChange={(e) => setFname(e.target.value)}
            />
            <FaUserAlt className="icon" />
          </div>
          <div className="input-box">
            <input
              type="text"
              placeholder="Last Name"
              name="lname"
              required
              value={lname}
              onChange={(e) => setLname(e.target.value)}
            />
            <FaUserAlt className="icon" />
          </div>
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmpassword"
              required
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          <div className="register-link">
            <p>
              Already have an account? <Link to="/user/login">Login </Link>
            </p>
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default SignupScreen;
