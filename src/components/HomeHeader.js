import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from '../actions/userActions';
import SearchBar from './SearchBar';

class HomeHeader extends React.Component {

  onLogout = () => {
    this.props.logOut()
  }

  render = () => {
  	if (!localStorage.token && this.props.hasOwnProperty('history')) this.props.history.push("/")
      // console.log(this.props)
    return (
      <div className="dropdownmenu">
        <ul>
          <li><h2>furbook</h2></li>
          <li><SearchBar/></li>
          <li><Link to="/home">Feed</Link></li> 
        	<li><Link to="/profile">Profile</Link></li> 
          <li onClick={this.onLogout}><Link to="/login">Logout</Link></li>
        </ul>
      </div>
    );
  }
}

// <div className="profile-icon-combo"> { this.props.user.id ? <img className="profile-link-icon" src={`${this.props.user.pro_pic.picture.url}`}/> : null} Profile </div>

const mapStateToProps = state => {
  return {
    user: state.currentUser
  }
}

const mapDispatchToProps = {
  logOut: logOut
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader)