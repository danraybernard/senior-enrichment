import { combineReducers } from 'redux'
import { GET_CAMPUSES, GET_CAMPUS, GET_STUDENTS, GET_STUDENT } from '../store'
const initialState = {
  campuses: [],
  campus: {},
  students: [],
  student: {}
};

const rootReducer = function(state = initialState, action) {
  const nextState = Object.assign({}, state);
  switch (action.type) {
    case GET_CAMPUSES:
      nextState.campuses = action.campuses;
      return nextState;

    case GET_CAMPUS:
      nextState.campus = action.campus;
      return nextState;

    case GET_STUDENTS:
      nextState.students = action.students;
      return nextState;

    case GET_STUDENT:
      nextState.student = action.student;
      return nextState;

    default: return state
  }
}

export default rootReducer
