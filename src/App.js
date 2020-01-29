import React from 'react';
import './App.css';

function App() {
  const helloWorld = 'Welcome to the Way React learn!'
  const user = {name: 'Вася', lastname: 'Пупкин'}
  return (
    <div className="App">
      <h2> {helloWorld} </h2>
      <h2>{user.name}</h2>
      <h2>{user.lastname}</h2>
    </div>
  );
}

export default App;
