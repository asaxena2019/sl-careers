import React from 'react';
import logo from './ScottySticker.png';
import './App.css';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

const cards = [1, 2];

function App() {
  
  function getScottyData() {
    console.log("Get Scotty Data")
    fetch("http://localhost:4000/internships",
    {
      method: "GET"
    })
    .then(results => {
      console.log('Request succeeded with POST response', results);
      if(results.status === 200)
      {
        console.log('Request succeeded with POST response 200');
        console.log(results);
      } else {
        console.log('Request FAILED with POST response ');
      }
      return results.json()
    })
    .then(result => {
      console.log("Result " + JSON.stringify(result))
    })
  }

  return (
    <div>

    <div className="App">
      <header className="App-header">
        <img src={logo} alt="logo" width={100} height={100}/>
        <h1>ScottyLabs Career Page</h1>
        <p>*insert description*</p>
      </header>
    </div>
    
    <div className="App">
      <body className="App-body">
        <p>search</p>
      </body>
    </div>
    
    <div className="App">
      <body className="App-body">

        <button className="App-button button1">Jobs</button>
        <button className="App-button button2" onClick={getScottyData}>Internships</button>
        <button className="App-button button3">Research</button>
        <button className="App-button button4">Scholarships</button>
        <button className="App-button button5">Events</button>
        <button className="App-button button6">All</button>
      
      </body>
    </div>
    
    <div className="App">
    <body className="App-body">
      
    <Container className="App-cardGrid" maxWidth="md">
        {cards.map(card => (
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
          </Card.Body>
         </Card>
     ))}
</Container>

    </body>
    </div>
    
    <div className="App">
    <body className="App-body">
      <p>footer</p>
    </body>
    </div>
    </div>
  );
}

export default App;
