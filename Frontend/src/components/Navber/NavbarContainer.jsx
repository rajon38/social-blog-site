
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./navbar.css"
import { getUserDetails, removeSessions } from "../../helper/SessionHelper.js";

import { GrNotification } from "react-icons/gr"

const NavbarContainer = () => {
    const onLogout = () => {
        removeSessions();
    }
    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary fixed">
                <Container fluid>
                    <Navbar.Brand href="#" > <h5 className='Journal_Wheel'>Journal Wheel</h5> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <div id="from">
                                <Form className="d-flex" >
                                    <Form.Control
                                        type="search"
                                        placeholder="Search"
                                        className="me-2 center"
                                        aria-label="Search"
                                        style={{margin:"13px"}}
                                    />
                                    <Button variant="outline-success mt-2">Search</Button>
                                </Form>
                            </div>

                        </Nav>


                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title={getUserDetails()['username']} id="navbarScrollingDropdown">
                            <Nav.Link href="/Profile" onClick="">
                                Profile
                            </Nav.Link>
                            <Nav.Link href="/" onClick={onLogout}>
                                Logout
                            </Nav.Link>


                        </NavDropdown>

                        <Nav.Link href="/" onClick="">
                            < GrNotification />
                        </Nav.Link>

                        {/* <Nav.Link href="/" onClick={onLogout}>
                            Logout
                        </Nav.Link> */}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavbarContainer;