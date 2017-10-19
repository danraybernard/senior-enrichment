import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
// import { connect } from 'react-redux';
import store from '../store';

export default class Home extends Component {
  render () {
    return (
      <div>
      <h1> This is the homepage </h1>
      </div>
    )
  }
}
