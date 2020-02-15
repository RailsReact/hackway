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

function isSearched(searchTerm){
  return function(item){
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      list: list,
      searchTerm: '',
    };
    this.onSearchChange=this.onSearchChange.bind(this);
    this.onDismiss= this.onDismiss.bind(this);
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value })
  }

  onDismiss(id){
    const isNotId = item => item.objecrsID !== id;
    const updateList = this.state.list.filter(isNotId);
    this.setState({ list: updateList });
  }

  render(){
    const {searchTerm, list}=this.state
    return (
      <div className="App">
        <Seardh 
          value = {searchTerm}
          onChange = {this.onSearchChange}
        />
        <Table 
          list = {list}
          pattern = {searchTerm}
          onDismiss = {this.onDismiss}
        />   
      </div>
    );
  }
}

class Seardh extends React.Component{
  render(){
    const {value, onChange} = this.props;
    return (
      <form>
        <input 
          type="text" 
          value={value}
          onChange={onChange}
        />
      </form>
    )
  }
}

class Table extends React.Component{
  render(){
    const {list, pattern, onDismiss} = this.props;
    return (
      <div>
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objecrsID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => onDismiss(item.objecrsID)}
                type="button"
              >
                Отбросить
              </button>
            </span>
          </div>
        )}
      </div>
    )
  }
}

export default App;
