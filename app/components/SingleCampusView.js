import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { fetchCampus, fetchStudents } from '../store';
import Campus from './Campus';

class SingleCampusView extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount () {
    store.dispatch(fetchStudents());
    store.dispatch(fetchCampus(this.props.match.params.id));
  }

  render () {
    return (
      <div>
      <Campus campus={this.props.campus} />
          {this.props.students.filter(student => {
            return student.campusId === this.props.campus.id;
          })
            .map(student => {
            return <div key={student.id}> {student.name} </div>
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
    fetchCampus(campus){
      dispatch(fetchCampus(campus))
    },
    fetchStudents(students){
      dispatch(fetchStudents(students))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCampusView);
