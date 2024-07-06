import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Sidebar() {
    return (
        <Navbar bg="light" expand="lg" className="d-flex flex-column sidebar">
            <Container>
                <Navbar.Brand href="#">
                    <img src="http://res.cloudinary.com/dcsdqiiwr/image/upload/v1713969131/nstigastexr3ltx6vafc.png" alt="logo" width="30" height="30" className="d-inline-block align-top sidebar-logo" />
                    {/* <span>WedBliss</span> */}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="flex-column">
                         <Nav.Item>
                            <LinkContainer to="">
                                <Nav.Link><span className="fa fa-solid fa-user mr-5"></span> Profile</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="">
                                <Nav.Link><span className="fa fa-solid fa fa-cog"></span> Settings</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="">
                                <Nav.Link><span className="fa fa-bell"></span> Notifications</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="">
                                <Nav.Link><span className="fa fa-sign-out"></span> Logout</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
                <div className="user-account mt-auto">
                    <div className="user-profile d-flex">
                        <img src="images/profile-img.jpg" alt="Profile Image" className="mr-3" />
                        <div className="user-detail">
                            <h3>Eva Murphy</h3>
                            <span>Web Developer</span>
                        </div>
                    </div>
                </div>
            </Container>
        </Navbar>
    );
}
