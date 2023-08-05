// import "./navbar.css"
// import searchIcon from "../../assets/images/search.png"
// import {getUserDetails, removeSessions} from "../../helper/SessionHelper.js";
// import Notifications from "../../assets/images/bell.png";
// import Message from "../../assets/images/message.png";
// import {Link} from "react-router-dom";
//
//
// const Navbar = () => {
//     const onLogout=()=>{
//         removeSessions();
//     }
//     return (
//
//
//     <div className='mainNavbar'>
//             <div className='LogoContainer'>
//                 <p>Journal Wheel</p>
//              </div>
//              <div>
//                  <div className='searchInputContainer'>
//                      <img src={`${searchIcon}`} className="searchIcon" alt="" />
//                      <input type="text" className='searchInput' placeholder='search your friends' name="" id="" />
//                  </div>
//              </div>
//              <div className='IconsContainer'>
//                  <img src={`${Notifications}`} className="Icons" alt="" />
//                  <img src={`${Message}`} className="Icons" alt="" />
//                  <Link to={`/Profile`}>
//                      <div style={{display:'flex' , alignItems:'center'}}>
//                          <img className="icon-nav-img icon-nav" src={getUserDetails()['profile']} alt=""/>
//                          <p style={{marginLeft:'5px'}}>{getUserDetails()['username']}</p>
//                      </div>
//                  </Link>
//                  <div style={{marginRight:"30px" , marginLeft:"20px" , cursor:"pointer"}} onClick={onLogout}>
//                      <p>Logout</p>
//                  </div>
//              </div>
//          </div>
//     );
// };
//
// export default Navbar;

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {getUserDetails,removeSessions} from "../../helper/SessionHelper.js";

const NavbarContainer = () => {
    const onLogout=()=>{
         removeSessions();
     }
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary fixed">
                <Container fluid>
                    <Navbar.Brand href="#">Journal Wheel</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/Profile">{getUserDetails()['username']}</Nav.Link>
                            <NavDropdown title="Notification" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/" onClick={onLogout}>
                                Logout
                            </Nav.Link>
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success mt-2">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavbarContainer;
