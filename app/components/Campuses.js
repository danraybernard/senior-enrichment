import React, { Component } from 'react';
import { Link, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCampuses, removeCampus} from '../store';
import Campus from './Campus';
function CampusList (props) {

    const { campuses } = props;

    return (
      <div>
        <ul className="campus-list">
        {
          campuses.map(campus => (
            <div key={campus.id}>
              <div className="col-xs-4">
                <Link to={`/campuses/${campus.id}`}>
                  <Campus campus={campus} />
                </Link>
                <button onClick={() => {
                  props.connectRemoveCampus(campus.id);
                  props.history.push('/')}
                }>
                  Delete
                </button>
              </div>
            </div>
          ))
        }
        </ul>
      </div>
    );
  }


class Campuses extends Component {

  componentDidMount () {
    this.props.connectFetchCampuses();
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
        connectFetchCampuses(campuses){
          dispatch(fetchCampuses(campuses));
        },
        connectRemoveCampus(campusId){
          dispatch(removeCampus(campusId));
        }
    };
  };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Campuses);
