import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header';
import Search from './components/Search';


function App() {
  const [word,setWord] = useState('');
  const unsplash = process.env.REACT_APP_UNSPLASH_KEY;
  const handleSearchSubmit =(e)=>{
    e.preventDefault();
    fetch(`https://api.unsplash.com/photos/random/?query=${word}&client_id=${unsplash}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
    })
    .catch(err=>{
      console.log(err);
    })
    setWord('');
  }
console.log(process.env)
  return (
    <div className="App">
      <Header title="Images Gallery"/>
      <Search word={word} setWord={setWord} handleSubmit={handleSearchSubmit}/>
    </div>
  );
}

export default App;
