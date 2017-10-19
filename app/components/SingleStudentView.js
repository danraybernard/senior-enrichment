import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStudent, fetchCampuses } from '../store';

class SingleStudentView extends Component {
constructor (props) {
  super(props);
  this.state = {
    nameInputValue
  }
}

  componentDidMount () {
    this.props.connectFetchCampuses();
    this.props.connectFetchStudent(this.props.match.params.id);
  }

  render () {
    console.log('params id', this.props.match.params.id)

    const filterCampuses = this.props.campuses.filter(campus => {return campus.id === this.props.student.campusId});

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
            <input className="form-control" type="text" />
          </div>
        </div>

        <div className="form-group">
          <label className="col-xs-2 control-label">Email</label>
          <div className="col-xs-10">
            <input className="form-control" type="text" />
          </div>
        </div>

        <div className="form-group">
          <label className="col-xs-2 control-label">Campus</label>
          <div className="col-xs-10">
            <input className="form-control" type="text" />
          </div>
      </div>
        <div className="form-group">
          <div className="col-xs-10 col-xs-offset-2">
            <button type="submit" className="btn btn-success">Update Student</button>
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
