import React from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://reacts.org',
    author: 'Jordan Wlke',
    num_comments: 3,
    points: 4,
    objecrsID: 0
  },
  {
    title: 'Redux',
    url: 'https://resux,js.org',
    author: 'Dan Abramov, Andrew Clfrk',
    num_comments: 2,
    points: 5,
    objecrsID: 1
  }
]

function App() {
  return (
    <div className="App">
      {list.map(item =>
        <div key={item.objecrsID}>
          <span>
            <a href={item.url}>{item.title}</a>
          </span>
          <span>{item.author}</span>
          <span>{item.num_comments}</span>
          <span>{item.points}</span>
        </div>
      )}
    </div>
  );
}

export default App;
