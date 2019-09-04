import React from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';
import withAuth from '../hocs/withAuth';
import { withRouter } from 'react-router-dom';

class CreatePost extends React.Component {
	
	state = {
    // posts: this.props.currentUser.posts,
    postContent: ''
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

	handleSubmit = (event) => {
    event.preventDefault();
     this.props.dispatch(createPost(this.state.postContent, this.props.user.id))
  }

	render = () => {
	  return (
		  <form className="postForm" onSubmit={this.handleSubmit}>
		    <h1>Make a post</h1>
		    <textarea className="postInput" type="text" placeholder="What's on your mind?" value={this.state.postContent} onChange={this.handleChange} name="postContent"/>
		    <input className="postSubmit" type="submit" value="Post"/>
		  </form>
		)
	}
}

const mapStateToProps = state => {
  console.log(state)
  return {
    posts: state.posts
  }
}

export default withAuth(connect(mapStateToProps)(withRouter(CreatePost)));