import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Search(props) {
  return (
    <div>
      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form onSubmit={props.handleSubmit}>
              <Form.Row className="mb-3">
                <Col xs={9}>
                  <Form.Control
                    type="text"
                    value={props.word}
                    onChange={(e) => props.setWord(e.target.value)}
                    placeholder="Search for new image..."
                  />
                </Col>
                <Col>
                  <Button variant="primary" type="submit">
                    Search
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Search;
