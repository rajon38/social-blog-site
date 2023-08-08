
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
                            <NavDropdown title={getUserDetails()['username']} id="navbarScrollingDropdown">
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Logout
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/" onClick={onLogout}>
                                Logout
                            </Nav.Link>
                        </Nav>
                        <Form className="d-flex ">
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
