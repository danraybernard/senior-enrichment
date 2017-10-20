import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeCampus } from '../store';

class CreateCampus extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      image: ''
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange (evt) {
    const value = evt.target.value
    this.setState({
      name: value
    })
  }

  handleImageChange (evt) {
    const value = evt.target.value
    this.setState({
      image: value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault();
    if (this.state.name.length > 0) {
      this.props.connectCreateCampus(this.state);
      this.props.history.push('/');
    }
  }


  render () {
    return (
      <div>
      <form className="form-horizontal">
      <fieldset>
        <legend>Create Campus</legend>
        <div className="form-group">
          <label className="col-xs-2 control-label">Name</label>
          <div className="col-xs-10">
            <input className="form-control" type="text" onChange={this.handleNameChange} value={this.state.name} />
          </div>
        </div>

        <div className="form-group">
          <label className="col-xs-2 control-label">Image</label>
          <div className="col-xs-10">
            <input className="form-control" type="text" onChange={this.handleImageChange} value={this.state.image} />
          </div>
        </div>
        <div className="form-group">
        <div className="col-xs-10 col-xs-offset-2">
          <button onClick={this.handleSubmit} className="btn btn-success">Create Campus</button>
        </div>
      </div>
      </fieldset>
    </form>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return ({

  })
}

const mapDispatchToProps = function (dispatch) {
  return {
    connectCreateCampus(campusInfo){
      dispatch(makeCampus(campusInfo))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCampus);
