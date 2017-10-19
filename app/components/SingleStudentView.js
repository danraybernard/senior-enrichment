import React, { Component } from 'react';
import { Link, HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { fetchStudent, fetchCampuses } from '../store';

class SingleStudentView extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount () {
    store.dispatch(fetchStudent(this.props.match.params.id));
    store.dispatch(fetchCampuses);
  }

  return () {
    return (
      <div>
      {this.props.campus.name}
      <div>{this.props.campuses.filter(campus => {return campus.id === this.props.student.id})}</div>
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return ({
    campus: state.campus,
    students: state.students
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

