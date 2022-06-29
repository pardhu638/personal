import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import ImageCard from './components/ImageCard';
import Search from './components/Search';
import WelcomeComponent from './components/WelcomeComponent';

function App() {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  //const unsplash = process.env.REACT_APP_UNSPLASH_KEY;
  const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';
  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSavedImages();
  }, []);

  const saveImage = async (id) => {
    const imageToBeSaved = images.filter((image) => image.id === id)[0];
    imageToBeSaved.saved = true;
    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      Object.keys(res.data).length > 1
        ? setImages([{ ...res.data, title: word }, ...images])
        : setImages([...images]);
    } catch (error) {
      console.log(error);
    }
    setWord('');
  };
  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.image_id) {
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
    }
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
                  <ImageCard
                    image={image}
                    deleteImage={handleDeleteImage}
                    saveImage={saveImage}
                  />
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
