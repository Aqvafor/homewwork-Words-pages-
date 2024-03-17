import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

const words = [
  'Apple', 'Banana', 'Cherry', 'Almond', 'Elderberry', 'Fig', 'Grape', 'Honeydew',
  'Iceberg', 'Jackfruit', 'Kiwi', 'Lemon', 'Mango', 'Nectarine', 'Orange',
  'Papaya', 'Quince', 'Raspberry', 'Strawberry', 'Tomato', 'Peanut',
  'Vanilla', 'Watermelon', 'Avocado', 'Cranberry', 'Gooseberry', 'Artichoke', 'Broccoli',
  'Carrot', 'Daikon'
];

const getUniqueLetters = words => {
  const letters = words
    .join('')
    .toLowerCase()
    .split('')
    .filter((value, index, self) => self.indexOf(value) === index);
  return letters.sort();
};

const Words = () => {
  const letters = getUniqueLetters(words);
  return (
    <div>
      <div>
        {letters.map(letter => (
          <Link key={letter} to={`/letter/${letter}`} style={{ padding: '5px' }}>
            {letter.toUpperCase()}
          </Link>
        ))}
      </div>
      <div>
        {words.map(word => (
          <Link key={word} to={`/word/${word}`} style={{ display: 'block', margin: '5px 0' }}>
            {word}
          </Link>
        ))}
      </div>
    </div>
  );
};

const WordPage = () => {
  const { word } = useParams();
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      textAlign: 'center',
      fontSize: '2rem'
    }}>
      {word}
      <p>
        <Link to="/">На главную</Link>
      </p>
    </div>
  );
};


const LetterPage = () => {
  const { letter } = useParams();
  const startsWith = words.filter(word => word.toLowerCase().startsWith(letter));
  const includes = words.filter(word => !word.toLowerCase().startsWith(letter) && word.toLowerCase().includes(letter));

  return (
    <div>
      <h2>Starts with "{letter.toUpperCase()}"</h2>
      {startsWith.map(word => <div key={word}>{word}</div>)}
      <h2>Includes "{letter.toUpperCase()}"</h2>
      {includes.map(word => <div key={word}>{word}</div>)}
      <p>
        <Link to="/">На главную</Link> 
      </p>
    </div>
  );
};


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Words />} />
        <Route path="/word/:word" element={<WordPage />} />
        <Route path="/letter/:letter" element={<LetterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
