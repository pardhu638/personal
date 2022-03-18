import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ImageCard({ image, deleteImage }) {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={image.urls.small} />
        <Card.Body>
          <Card.Title>{image.title}</Card.Title>
          <Card.Text>{image.description || image.alt_description}</Card.Text>
          <Button variant="primary" onClick={() => deleteImage(image.id)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ImageCard;
