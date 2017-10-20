import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { fetchStudents, removeStudent } from '../store';
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

  componentDidMount () {
    this.props.connectFetchStudents();
  }
  render () {
    console.log(this.props);
    return (
      <div>
        {this.props.students.map(student => {
          return (
            <div key={student.id}>
              <Link to={`/students/${student.id}`}>
                <h3>
                  {student.name}
                </h3>
              </Link>
              <button onClick={() => {
                this.props.connectRemoveStudents(student.id);
                this.props.history.push('/')}
              }>
                Delete
              </button>
            </div>
          )
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
    connectFetchStudents(students){
      dispatch(fetchStudents(students));
    },
    connectRemoveStudents(studentId){
      dispatch(removeStudent(studentId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Students);
