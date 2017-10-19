import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import store, { fetchCampuses } from '../store';
import Campus from './Campus';
function CampusList (props) {

    const { campuses } = props;

    return (
      <div>
        <ul className="campus-list">
        {
          campuses.map(campus => (
            <Link to={`/campuses/${campus.id}`} key={campus.id}>
            <div className="col-xs-4">
            <Campus campus={campus} />
            </div>
            </Link>
          ))
        }
        </ul>
      </div>
    );
  }


class Campuses extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount () {
    store.dispatch(fetchCampuses());
  }


  render () {
    return (
      <div>
        <CampusList {...this.props} />
      </div>
    )
  }


}

const mapStateToProps = function (state) {
    return ({
      campuses: state.campuses
    })
};


  const mapDispatchToProps = function (dispatch) {
    return {
        fetchCampuses(campuses){
          dispatch(fetchCampuses(campuses));
        }
    };
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Campuses);
