import React from 'react';
import UploadPhoto from '../components/uploadPhoto';
import UploadProPic from '../components/uploadProPic';
import withAuth from '../hocs/withAuth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUserById } from '../actions/usersActions';
import ProfilePhotos from '../components/ProfilePhotos';
import ProfilePosts from '../components/ProfilePosts';

// make a working redux fetch for the specific profile you are on

class ProfilePage extends React.Component {

  state = {
    iconClicked: false
  }
  componentDidMount = () => {
    if (!localStorage.token && this.props.hasOwnProperty('history')) this.props.history.push("/")
    // if (this.props.location.pathname === "/profile") {
    //   console.log(this.props)
    //   this.setState({user: this.props.user})
    // }
    // this.setState({userID: this.props.location.pathname.split("/")[2]})
    this.props.getUserById(this.props.location.pathname.split("/")[2]);
  }

  handleIconClick = () => {
    this.setState({iconClicked: true})
    if (this.props.user.id === parseInt(this.props.location.pathname.split("/")[2])) {
      console.log("they are the same")
    }
  }

  render = () => {
    if (!Object.keys(this.props.profileUser).length) return null;
    console.log(this.props)
    return (
      <div className="/profile">
        <div className="ProfilePage">
          <h1 className="Hi"> {this.props.profileUser.username ? `${this.props.profileUser.username}'s page` : 'Getting your profile...'}</h1>
          <div className="profile-icon-div">
            {this.props.profileUser.pro_pic.length ?
              <img onClick={this.handleIconClick} className="profile-icon" src={this.props.profileUser.pro_pic.picture.url} />
            :
              <img onClick={this.handleIconClick} className="profile-icon" src='https://image.flaticon.com/icons/png/512/17/17479.png' />
            }
            <h2 className="profile-username">{this.props.profileUser.username}</h2>
          </div>
          <div className="posts-photos-div">
            {this.props.profileUser.posts.length ? 
              <div className="profile-posts-container">
                <h2> Posts</h2>
                <ProfilePosts user={this.props.profileUser} />
              </div>
            :
              <h2 className="no-posts-to-show">No posts to show...</h2>
            }

            {this.props.profileUser.photos.length ? 
              <div className="profile-photos">
                <h2> Photos</h2>
                <ProfilePhotos photos={this.props.profileUser.photos}/>
                <UploadPhoto userInfo={this.props.userInfo}/>
              </div>
            :
              <div className="profile-photos">
                <h2 className="no-photos-to-show">No photos to show...</h2>
                <UploadPhoto userInfo={this.props.userInfo}/>
              </div>
            }
          </div>
          <div className="upload-pro-pic">
            <UploadProPic userInfo={this.props.userInfo}/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state)
  return {
    user: state.currentUser,
    profileUser: state.usersReducer.user
  }
}

const mapDispatchToProps = {
  getUserById: getUserById
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePage)))