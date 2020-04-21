import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    values: []
  }
  componentDidMount(){
    axios.get('http://localhost:5000/api/values')
    .then((response) => {
      console.log(response);
      this.setState({
        values: response.data
      })
  })
}
  
  render() {
    return (
      <div className ='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo'/>
          <ul>
            {
              this.state.values.map((value: any) => (
              <li>{value.name}</li>
              ))}
            {/* { this.state.values.map((value: any) => (
              <li key={value.id}>{value.name}</li>
            ))} */}
          </ul>
          </header>          
      </div>
    );
    // <ul>
    // {cars.map((car2) => (
    //   //<li>{car2.color}</li>
    //   <CarItem car={car2}/>
    // ))}
  }
}
export default App;
