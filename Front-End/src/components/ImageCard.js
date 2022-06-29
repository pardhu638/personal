import React from 'react';
import { Card, Button, Row } from 'react-bootstrap';

function ImageCard({ image, deleteImage, saveImage }) {
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={image.urls.small} />
        <Card.Body>
          <Card.Title>{image.title?.toUpperCase()}</Card.Title>
          <Card.Text>{image.description || image.alt_description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Row className="justify-content-around">
            {!image.saved && (
              <Button
                className="btn btn-primary"
                onClick={() => saveImage(image.id)}
              >
                Save
              </Button>
            )}
            <Button
              className="btn btn-danger"
              onClick={() => deleteImage(image.id)}
            >
              Delete
            </Button>
          </Row>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default ImageCard;
