import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios';


// INITIAL STATE

// const initialState = {
//   campuses: [],
//   campus: '',
//   students: [],
//   student: ''
// };

// ACTION TYPES
export const GET_CAMPUS = 'GET_CAMPUS';
export const UPDATE_STUDENT = 'UPDATE_STUDENT';
export const GET_CAMPUSES = 'GET_CAMPUSES';
export const GET_STUDENTS = 'GET_STUDENTS';
export const GET_STUDENT = 'GET_STUDENT';
export const CREATE_STUDENT = 'CREATE_STUDENT';
export const EDIT_STUDENT = 'EDIT_STUDENT';

// ACTION CREATORS
export function getStudents (students) {
  const action = { type: GET_STUDENTS, students };
  return action;
}

export function getStudent (student) {
  const action = { type: GET_STUDENT, student };
  return action;
}

export function editStudent (student) {
  const action = { type: EDIT_STUDENT, student };
  return action;
}

export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses };
  return action;
}

export function getCampus (campus) {
  const action = { type: GET_CAMPUS, campus };
  return action;
}

// THUNK CREATORS
export function fetchStudents () {
    return function thunk (dispatch) {
      axios.get('/api/students')
        .then(res => res.data)
        .then(students => {
          const action = getStudents(students);
          dispatch(action);
        })
        .catch(console.error);
    }
}
export function fetchStudent (studentId) {
    return function thunk (dispatch) {
      axios.get(`/api/students/${studentId}`)
        .then(res => res.data)
        .then(student => {
          console.log('this is the student', student);
          const action = getStudent(student);
          dispatch(action);
        })
        .catch(console.error);
    }
}

export function fetchCampuses () {
    return function thunk (dispatch) {
      axios.get('/api/campuses')
        .then(res => res.data)
        .then(campuses => {
          const action = getCampuses(campuses);
          dispatch(action);
        })
        .catch(console.error);
    }
  }

export function fetchCampus (campusId) {
    return function thunk (dispatch) {
      axios.get(`/api/campuses/${campusId}`)
        .then(res => res.data)
        .then(campus => {
          const action = getCampus(campus);
          dispatch(action);
        })
        .catch(console.error);
    }
}

export function updateStudent (studentId, student) {
    return function thunk (dispatch) {
      axios.put(`/api/students/${studentId}`, student)
        .then(res => dispatch(editStudent(res.data)))
        .catch(console.error);
    }
}


export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))
