/*eslint-disable*/ 

import {useState} from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import { Link, Route, Switch } from 'react-router-dom';
import Detail from './Detail.js';
import axios from 'axios';

function App() {
  
  let [shoes, change_shoes] = useState(Data);
  let [loading, change_loading] = useState(false);
  let [stock, change_stock] = useState([10,11,12]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">detail</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <div className="background">
            <h1>Welcome, genieshop</h1>
            <p>안녕하세요. 지니샵입니다. <br/>신발 제품들을 판매하고 있습니다. 저렴한 가격으로 구매하세요. </p>
            <p>
              <Button variant="secondary">Learn more</Button>
            </p>
          </div>        
          <div className="container">
            <div className="row">
              {
                shoes.map((a, i)=>{
                  return <Card shoes={a} i={i} key={i} />
                })
              }
            </div>            
          </div>
          <button className="btn btn-primary" onClick={()=>{

            //loading ui 띄우기
            

            axios.get('https://codingapple1.github.io/shop/data2.json')
            .then((result)=>{
              
              //loading ui 지우기
              
              change_shoes([...shoes, ...result.data])
            })
            .catch(()=>{ 

              //loading ui 지우기              

              console.log('실패~')
            })

          }}>더보기</button>              
        </Route>

        <Route path="/detail/:id">
          <Detail shoes={shoes} stock={stock} change_stock={change_stock}/>
        </Route>

      </Switch>
    </div>
  );  
}

function Card(props) {    
  return (
    <div className="col-md-4">
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg' } width="100%"/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content} & {props.shoes.price}</p>
    </div>
  )
}

export default App;
