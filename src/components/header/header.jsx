import React, { useContext, useRef, useState } from "react";
import { Context } from '../../context/context';
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.css";
import { useEffect } from "react";

const Header = () => {

    const {search, setSearch} = useContext(Context);
    const [clock, setClock] = useState();
    useEffect(() => {
      const tick = setInterval(() => {
        const date = new Date();
        setClock(date.toString().split(' ')[4])
      }, 1000)
    }, [])
    const searchRef = useRef();

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Open Weather app client</Navbar.Brand>
        <p style={{color: 'white', margin: 0}}>{clock || ''}</p>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
         
          <Nav className="me-auto">
            <Link to="/" className="custom-nav-link">
              Home
            </Link>
            <Link to="/about" className="custom-nav-link">
              About
            </Link>
          </Nav>
        </Navbar.Collapse>
        <Form className="d-flex" onSubmit={e => {e.preventDefault(); setSearch(searchRef.current.value);}}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            ref={searchRef}
          />
          <Button variant="outline-success" type="submit">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Header;
