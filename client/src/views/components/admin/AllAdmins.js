import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/AdminsActions';
import Spinner from '../common/Spinner';
import Admins from './Admins';

class AllAdmins extends Component {
    componentDidMount() {
      this.props.getCurrentProfile();
    }
  
    onDeleteClick(e) {
      this.props.deleteAccount();
    }
  
    render() {
      const { user } = this.props.auth;
      const { profile, loading } = this.props.profile;
  
      let dashboardContent;
  
      if (profile === null || loading) {
          dashboardContent = <Spinner />;
      } else {
          // Check if logged in user has profile data
          if (Object.keys(profile).length > 0) {
            dashboardContent = (
              <div>
              <Admins experience={profile.experience} />
              </div>
            );
          }
        }
  
      return (
        <div className="dashboard">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {dashboardContent}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  
  AllAdmins.propTypes = {
      getCurrentProfile: PropTypes.func.isRequired,
      deleteAccount: PropTypes.func.isRequired,
      auth: PropTypes.object.isRequired,
      profile: PropTypes.object.isRequired
    };
    
    const mapStateToProps = state => ({
      profile: state.profile,
      auth: state.auth
    });
    
    export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
      AllAdmins
    );