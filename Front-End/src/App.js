import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import ImageCard from './components/ImageCard';
import Search from './components/Search';
import WelcomeComponent from './components/WelcomeComponent';

function App() {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const unsplash = process.env.REACT_APP_UNSPLASH_KEY;
  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/new-image?query=${word}`)
      .then((res) => res.json())
      .then((data) => {
        setImages([{ ...data, title: word }, ...images]);
      })
      .catch((err) => {
        console.log(err);
      });
    setWord('');
  };
  const handleDeleteImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };
  return (
    <div className="App">
      <Header title="Images Gallery" />
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit} />
      <Container className="mt-4">
        {!!images.length ? (
          <Row xs={1} md={2} lg={3}>
            {!!images.length &&
              images.map((image, index) => (
                <Col key={index} className="pb-3">
                  <ImageCard image={image} deleteImage={handleDeleteImage} />
                </Col>
              ))}
          </Row>
        ) : (
          <WelcomeComponent />
        )}
      </Container>
    </div>
  );
}

export default App;
