import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStudent, fetchCampuses, updateStudent } from '../store';

class SingleStudentView extends Component {
constructor (props) {
  super(props);
  this.state = {
    nameInputValue: {name: ''},
    emailInputValue: {email: ''},
    campusInputValue: {campusId: ''},
  }
  this.handleEmailChange = this.handleEmailChange.bind(this);
  this.handleNameChange = this.handleNameChange.bind(this);
  this.handleCampusChange = this.handleCampusChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}

handleNameChange (evt) {
  const value = evt.target.value
  this.setState({
    nameInputValue: {name: value}
  })
}

handleEmailChange (evt) {
  const value = evt.target.value
  this.setState({
    emailInputValue: {email: value}
  })
}

handleCampusChange (evt) {
  const value = evt.target.value
  this.setState({
    campusInputValue: {campusId: value}
  })
}

handleSubmit (evt) {


  if (this.state.nameInputValue.name.length > 0) {
    this.props.connectUpdateStudent(this.props.match.params.id, this.state.nameInputValue)
  }
    if (this.state.emailInputValue.email.length !== 0) {
      this.props.connectUpdateStudent(this.props.match.params.id, this.state.emailInputValue)
    }

    let test = this.props.campuses.find((campus) => {
      return campus.id == this.state.campusInputValue.campusId;
    });

    if (test !== undefined) {
      this.props.connectUpdateStudent(this.props.match.params.id, this.state.campusInputValue)
    }

    this.setState({
      nameInputValue: null
    })

}

  componentDidMount () {
    this.props.connectFetchCampuses();
    this.props.connectFetchStudent(this.props.match.params.id);
  }

  componentWillUpdate () {
    this.props.connectUpdateStudent(this.props.match.params.id, this.props.match.params);
  }

  render () {
    const filterCampuses = this.props.campuses.filter(campus => {return campus.id === this.props.student.campusId});
    let classList;

    return (
      <div>
      <h1>{this.props.student ? this.props.student.name : null}</h1>
      <h3>{this.props.student ? this.props.student.email : null}</h3>
      <h3>{filterCampuses.length > 0 ? <Link to={`/campuses/${filterCampuses[0].id}`}>{filterCampuses[0].name}</Link> : null}</h3>

      <form className="form-horizontal">
      <fieldset>
        <legend>Update Student Info</legend>
        <div className="form-group">
          <label className="col-xs-2 control-label">Name</label>
          <div className="col-xs-10">
            <input className="form-control" type="text" onChange={this.handleNameChange} value={this.nameInputValue} />
          </div>
        </div>

        <div className="form-group">
          <label className="col-xs-2 control-label">Email</label>
          <div className="col-xs-10">
            <input className="form-control" type="text" onChange={this.handleEmailChange} value={this.emailInputValue} />
          </div>
        </div>

        <div>
        <label className="col-xs-2 control-label">Campus</label>
          <select onChange={this.handleCampusChange}>
            {this.props.campuses.map(campus => {
              return <option key={campus.id} value={campus.id}>{campus.name}</option>
            })}
          </select>
        </div>
        <div className="form-group">
          <div className="col-xs-10 col-xs-offset-2">
            <button onClick={this.handleSubmit} className="btn btn-success">Update Student</button>
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
    campuses: state.campuses,
    student: state.student
  })
};

const mapDispatchToProps = function (dispatch) {
  return {
    connectUpdateStudent(studentId, student){
      dispatch(updateStudent(studentId, student))
    },
    connectFetchCampuses(campuses){
      dispatch(fetchCampuses(campuses))
    },
    connectFetchStudent(student){
      dispatch(fetchStudent(student))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStudentView);
