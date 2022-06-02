import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

// start wih npm run start
function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/test")
    .then(response => response.text())
    .then(message => {
      setMessage(message);
    });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          react test <code>src/App.js</code> : {message}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="Oauth login link"
          href="http://localhost:8080/oauth2/authorization/google"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Login
        </a>
      </header>
    </div>
  );
}

export default App;
