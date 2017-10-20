import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStudent, fetchCampuses } from '../store';

class CreateStudent extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      campusId: null
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCampusChange = this.handleCampusChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange (evt) {
    const value = evt.target.value
    this.setState({
      name: value
    })
  }
  handleEmailChange (evt) {
    const value = evt.target.value
    this.setState({
      email: value
    })
  }
  handleCampusChange (evt) {
    const value = evt.target.value
    this.setState({
      campusId: value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault();

      this.props.connectMakeStudent(this.state);

    this.props.history.push('/');
  }

  componentDidMount () {
    this.props.connectFetchCampuses();

  }

  render () {
    return (
      <div>
      <form className="form-horizontal">
      <fieldset>
        <legend>Create Student</legend>
        <div className="form-group">
          <label className="col-xs-2 control-label">Name</label>
          <div className="col-xs-10">
            <input className="form-control" type="text" onChange={this.handleNameChange} value={this.state.name} />
          </div>
        </div>

        <div className="form-group">
          <label className="col-xs-2 control-label">Email</label>
          <div className="col-xs-10">
            <input className="form-control" type="text" onChange={this.handleEmailChange} value={this.state.email} />
          </div>
        </div>

        <div>
        <label className="col-xs-2 control-label">Campus</label>
          <select onChange={this.handleCampusChange}>
            <option> select a campus </option>
            {this.props.campuses.map(campus => {
              return <option key={campus.id} value={campus.id}>{campus.name}</option>
            })}
          </select>
        </div>

        <div className="form-group">
        <div className="col-xs-10 col-xs-offset-2">
          <button onClick={this.handleSubmit} className="btn btn-success">Create Student</button>
        </div>
      </div>
      </fieldset>
    </form>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    campuses: state.campuses
  }
}

const mapDispatchToProps = function (dispatch) {
  return {
    connectFetchCampuses(){
      dispatch(fetchCampuses())
    },
    connectMakeStudent(info){
      dispatch(makeStudent(info))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateStudent);
