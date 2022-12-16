import React, {useContext} from 'react';
import AuthContext from '../Context/AuthContext';
import LogOutBtn from './Login/LogoutBtn';
import {Navbar, Nav} from 'react-bootstrap';

function NavbarCustom() {
    var {loggedIn} = useContext(AuthContext);

    return(
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top">
            <Navbar.Brand href="/">Expense Recorder Management</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            <Nav>
                {
                    loggedIn === false && (
                        <>
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link eventKey={2} href="/login">Login</Nav.Link>
                            <Nav.Link eventKey={3} href="/register">Register</Nav.Link>
                            <Nav.Link eventKey={4} href="/about">About</Nav.Link>
                        </>
                    )
                }
                {
                    loggedIn === true && (
                        <>
                            <Nav.Link href="/home">Home</Nav.Link>
                            <Nav.Link href="/income">Income</Nav.Link>
                            <Nav.Link eventKey={2} href="/expense">Expense</Nav.Link>
                            <Nav.Link eventKey={3} href="/addData">Add Data</Nav.Link>
                            <Nav.Link eventKey={5} href="/montlyReport">Report</Nav.Link>
                            <Nav.Link eventKey={6} href="/customTime">Report for Custom time</Nav.Link>
                            <Nav.Link eventKey={7} href="/category">Category</Nav.Link>
                            <Nav.Link eventKey={8} href="/about">About</Nav.Link>
                            <LogOutBtn></LogOutBtn>
                        </>
                    )
                }
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavbarCustom;