import React, { Component } from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Campuses from './Campuses';
import Students from './Students';
import SingleCampusView from './SingleCampusView';
import SingleStudentView from './SingleStudentView';
export default class Main extends Component {


    render() {
      return (
        <BrowserRouter>
          <div id="main" className="container-fluid">
            <div className="col-xs-2">
            </div>
            <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
              </Navbar.Brand>
            </Navbar.Header>
          </Navbar>
            <h1>Margaret Hamilton Interplanetary Academy of JavaScript</h1>
            <div className="col-xs-10">
              <Switch>
              <Route exact path="/" component={Campuses} />
              <Route exact path="/campuses" component={Campuses} />
              <Route path="/campuses/:id" component={SingleCampusView} />
              <Route exact path ="/students" component={Students} />
              <Route exact path="/students/:id" component={SingleStudentView} />
              </Switch>
            </div>

          </div>
        </BrowserRouter>
      );
    }
  }
