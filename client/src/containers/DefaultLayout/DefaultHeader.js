import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../views/actions/authActions';
import { Link } from 'react-router-dom';
import { clearCurrentProfile } from '../../views/actions/AdminsActions';
import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};


class DefaultHeader extends Component {

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
<DropdownMenu right>
              <DropdownItem header tag="div" className="text-center"><strong>Welcome {user.username}</strong></DropdownItem>
              <DropdownItem onClick={this.onLogoutClick.bind(this)}><i className="fa fa-lock"></i> Logout</DropdownItem>
        </DropdownMenu>
    );
        
    const guestLinks = (
          <Link className="nav-link" to="/admin-login">
          login
          </Link>


    );

    return (
      <React.Fragment>
        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" ><h4>Market</h4></NavLink>
          </NavItem>
          {/* <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppSidebarToggler className="d-md-down-none" display="lg" /> */}
        </Nav>
      <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img src={'../../assets/img/favicon.png'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle>

              {isAuthenticated ? authLinks : guestLinks}

          </UncontrolledDropdown>
          
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

DefaultHeader.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  DefaultHeader
);
