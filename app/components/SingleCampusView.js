import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCampus, fetchStudents } from '../store';
import Campus from './Campus';

class SingleCampusView extends Component {

  componentDidMount () {
    this.props.connectFetchStudents();
    this.props.connectFetchCampus(this.props.match.params.id);
  }

  render () {
    return (
      <div>
      <Campus campus={this.props.campus} />
          {this.props.students.filter(student => {
            return student.campusId === this.props.campus.id;
          })
            .map(student => {
            return <div key={student.id}> <Link to={`/students/${student.id}`}>{student.name}</Link> </div>
          })}
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
    connectFetchCampus(campus){
      dispatch(fetchCampus(campus))
    },
    connectFetchStudents(students){
      dispatch(fetchStudents(students))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCampusView);
