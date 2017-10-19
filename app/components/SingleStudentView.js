import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { fetchStudent, fetchCampuses } from '../store';

class SingleStudentView extends Component {


  componentDidMount () {
    store.dispatch(fetchCampuses());
    store.dispatch(fetchStudent(this.props.match.params.id));
  }

  render () {
    const filterCampuses = this.props.campuses.filter(campus => {return campus.id === this.props.student.campusId});
    console.log(filterCampuses[0]);
    return (
      <div>
      <h1>{this.props.student ? this.props.student.name : null}</h1>
      <h3>{this.props.student ? this.props.student.email : null}</h3>
      <h3>{this.props.campuses && this.props.campuses.length > 0 ? filterCampuses[0].name : null}</h3>
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
    fetchCampuses(campuses){
      dispatch(fetchCampuses(campuses))
    },
    fetchStudent(student){
      dispatch(fetchStudent(student))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleStudentView);

//fetch the  campus where campusid === student campus id or pass in student campus id to the fetch

