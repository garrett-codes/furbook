import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/userActions'

class HomeHeader extends React.Component {

  onLogout = () => {
    this.props.logOut()
  }

  render = () => {
  	if (!localStorage.token && this.props.hasOwnProperty('history')) this.props.history.push("/")
    return (
      <div className="dropdownmenu">
        <ul>
          <li><Link to="/home"> Feed</Link></li> 
        	<li><Link to="/myProfile"> Profile</Link></li> 
          <li onClick={this.onLogout}><Link to="/login">Logout</Link></li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser
  }
}

const mapDispatchToProps = {
  logOut: logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader)