import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const NavStyle = {
  backgroundColor: 'lightblue',
};
function Header(props) {
  return (
    <div>
      <Navbar style={NavStyle} variant="light">
        <Container>
          <Navbar.Brand href="/">{props.title}</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
