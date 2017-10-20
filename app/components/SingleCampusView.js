import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCampus, fetchStudents, updateCampus } from '../store';
import Campus from './Campus';

class SingleCampusView extends Component {
constructor (props) {
  super(props);
  this.state = {
    nameInputValue: {name: ''},
    imageInputValue: {image: ''}
  }
  this.handleNameChange = this.handleNameChange.bind(this);
  this.handleImageChange = this.handleImageChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
}
  handleNameChange (evt) {
    const value = evt.target.value
    this.setState({
      nameInputValue: {name: value}
    })
  }

  handleImageChange (evt) {
    const value = evt.target.value
    this.setState({
      imageInputValue: {image: value}
    })
  }
  componentDidMount () {
    this.props.connectFetchStudents();
    this.props.connectFetchCampus(this.props.match.params.id);
  }
  componentWillUpdate () {
    // this.props.connectUpdateCampus(this.props.match.params.id, this.props.match.params);
  }
  handleSubmit (evt) {
    evt.preventDefault();
    if (this.state.nameInputValue.name.length > 0){
      console.log('hiting sub', this.state.nameInputValue);
      this.props.connectUpdateCampus(this.props.match.params.id, this.state.nameInputValue)
    }

    if (this.state.imageInputValue.image.length > 0){
      console.log('img sub hitting')
      this.props.connectUpdateCampus(this.props.match.params.id, this.state.imageInputValue);
    }

    this.props.history.push('/');
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


          <form className="form-horizontal">
          <fieldset>
            <legend>Update Campus Info</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" onChange={this.handleNameChange} value={this.nameInputValue} />
              </div>
            </div>

            <div className="form-group">
              <label className="col-xs-2 control-label">Image</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" onChange={this.handleImageChange} value={this.imageInputValue} />
              </div>
            </div>

            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button onClick={this.handleSubmit} className="btn btn-success">Update Campus</button>
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
    },
    connectUpdateCampus(campusId, campsInfo){
      dispatch(updateCampus(campusId, campsInfo))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCampusView);
