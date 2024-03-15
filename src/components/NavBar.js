import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom'
import { logout } from "../actions/UserActions";
import { useNavigate } from "react-router-dom";

// import login from '../pages/Login'

const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
        if (window.scrollY > 50) {
        setScrolled(true);
        } else {
        setScrolled(false);
        }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
    }, [])

    const onUpdateActiveLink = (value) => {
    setActiveLink(value);
    }

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/user/login')
    }

    const navigate = useNavigate()
    const loginHandler = () => {
        navigate('/user/login')
    }

  return (
    // <Router>
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            {/* <img src={logo} alt="Logo" /> */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'Home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('Home')}>Home</Nav.Link>
              <Nav.Link href="myFeed" className={activeLink === 'myFeed' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('myFeed')}>My Feed</Nav.Link>
              <Nav.Link href="#explore" className={activeLink === 'explore' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('explore')}>Explore</Nav.Link>
            </Nav>

            {userInfo? (
                <span className="navbar-text">
                    <button className="vvd" onClick={logoutHandler}><span>Logout</span></button>
                </span>
            ) : 
                <span className="navbar-text">
                    <button className="vvd" onClick={loginHandler}><span>Login</span></button>
                </span>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    // </Router> 
  )
}

export default NavBar;
