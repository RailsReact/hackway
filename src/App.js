import React from 'react';
import './App.css';

const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

function isSearched(searchTerm){
  return function(item){
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

class App extends React.Component  {
  constructor(props){
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchChange=this.onSearchChange.bind(this);
    this.onDismiss= this.onDismiss.bind(this);
  }

  setSearchTopStories(result){
    this.setState({result});
  }

  componentDidMount(){
    const {searchTerm} = this.state;

    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(error => error);
  }

  onSearchChange(event){
    this.setState({ searchTerm: event.target.value })
  }

  onDismiss(id){
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
      //result: Object.assign({}, this.state.result, { hits: updatedHits })
    });
  }

  render(){
    const {searchTerm, result}=this.state
    if(!result){return null;}
    console.log(this.state);
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
          list = {result.hits}
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
        <div key={item.objectID} className="table-row">
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
              onClick={() => onDismiss(item.objectID)}
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
