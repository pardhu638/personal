import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

function WelcomeComponent() {
  return (
    <Jumbotron>
      <h1>Images Gallery</h1>
      <p>
        This is a simple application that retrives images using Unsplash API.In
        order to start enter any search term in the input field.
      </p>
      <p>
        <Button bsStyle="primary" href="https://unsplash.com" target="_blank">
          Learn more
        </Button>
      </p>
    </Jumbotron>
  );
}

export default WelcomeComponent;
