import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/Image Gallery.svg';

const NavStyle = {
  backgroundColor: '#eeeeee',
};
function Header(props) {
  return (
    <div>
      <Navbar style={NavStyle} variant="light">
        <Container>
          <Logo
            alt={props.title}
            style={{ maxWidth: '10rem', maxHeight: '2rem' }}
          />
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
