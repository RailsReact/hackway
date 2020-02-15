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
      <div className="page">
        <div className="interactions">
          <Search 
            value = {searchTerm}
            onChange = {this.onSearchChange}
          >
            Поиск
          </Search>
        </div>
        <Table 
          list = {list}
          pattern = {searchTerm}
          onDismiss = {this.onDismiss}
        />   
      </div>
    );
  }
}

const Search = ({value, onChange, children }) => {
  return (
    <form>
      { children } <input 
        type="text" 
        value={value}
        onChange={onChange}
      />
    </form>
  )
}

function Table({list, pattern, onDismiss}){
  const largeColumn = {
    width: '40%',
  };
  const midColumn = {
    width: '30%',
  };
  const smallColumn = {
    width: '10%',
  };
  return (
    <div className="table">
      {list.filter(isSearched(pattern)).map(item =>
        <div key={item.objecrsID} className="table-row">
          <span style={largeColumn}>
            <a href={item.url}>{item.title}</a>
          </span>
          <span style={midColumn}>
            {item.author}
          </span>
          <span style={smallColumn}>
            {item.num_comments}
          </span>
          <span style={smallColumn}>
            {item.points}
          </span>
          <span style={smallColumn}>
            <Button
              onClick={() => onDismiss(item.objecrsID)}
              className = "button-inline"
            >
              Отбросить
            </Button>
          </span>
        </div>
      )}
    </div>
  )
}

function Button(props){
  const { 
    onClick, 
    className ='', 
    children 
  } = props;
  return (
    <button
      onClick={onClick}
      className={className}
      type="button"
    >
      {children}
    </button>
  )
}

export default App;
