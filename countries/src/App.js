import React, { Component } from 'react';


class App extends Component {

  constructor()
  {
    super();
    this.state = {
      title: 'Simple CRUD app',
      countries: []
    }
  }

  componentDidMount(){
    var that = this;
    console.log('component mounted');
    fetch('http://localhost:3000/api/countries')
    .then(function(response){
      response.json()
      .then(function(data){
        let countries = that.state.countries;
        countries.push(data);
        that.setState({countries: countries})
      })
    })
  }

  addCountry(event)
  {
    event.preventDefault();
      let data = {
      country_name: this.refs.country_name.value,
      continent_name: this.refs.continent_name.value,
      id:Math.random().toFixed(3)
    };
    
  var request = new Request('http://localhost:3000/api/new-country',{
      method: 'POST',
      headers: new Headers({ 'Content-Type':'application/json'}),
      body: JSON.stringify(data)
    });
console.log("dsdsds");
    fetch(request)
    .then(function(response){
      response.json()
      .then(function(data){
        console.log(data)
      })
    })
    .catch(function(err){
      console.log(err);
    })
  }

  render() {
    let title = this.state.title;
    let countries = this.state.countries;
    return (
      <div className="App">
        <h1>{title}</h1>
       <form ref="countryForm">
       <input type="text" ref="country_name" placeholder="country name" />
       <input type="text" ref="continent_name" placeholder="continent name" />
       <button onClick={this.addCountry.bind(this)}> Save </button>
       </form>
      <pre>{JSON.stringify(countries)}</pre>
      </div>
    );
  }
}

export default App;
