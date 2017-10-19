import React, { Component } from 'react';
import { Link, HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { fetchStudents } from '../store';
function StudentList (props) {
  const { students } = props;

  return (
    <div>
      <ul className="student-list">
      {
        students.map(student => (
          <div key={student.id}> {student.name} </div>
        ))
      }
      </ul>
    </div>
  )
}
class Students extends Component {
  constructor(props){
    super(props);
  }
  compnentDidMount () {
    store.dispatch(fetchStudents());
  }
  render () {
    console.log(this.state);
    return (
      <div>
        {this.props.students.map(student => {
          return <div key={student.id}>
          {student.name} </div>
        })}
      </div>
    )
  }


}

const mapStateToProps = function (state) {
  return ({
    students: state.students
  })
}
const mapDispatchToProps = function (dispatch) {
  return {
    fetchStudents(students){
      dispatch(fetchStudents(students));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Students);
