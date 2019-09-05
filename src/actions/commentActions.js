
export const createComment = (postContent, userId, postId) => {
  return function(dispatch) {
    fetch('http://localhost:3000/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
         Authorization: localStorage.token
      },
      body: JSON.stringify({
        user_id: userId,
        post_id: postId,
        content: postContent
      })
    })
    .then(res => res.json())
    .then(comment => {
      // ONCE THE FETCH HAS FINISHED WE SHOULD THEN DISPATCH
      dispatch({type: "CREATE_COMMENT", payload: comment })
    })
  }
}

export const getComments = () => {
  return function(dispatch){
    fetch("http://localhost:3000/comments", { 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
         Authorization: localStorage.token
      }})
    .then(res => res.json())
    .then(comments => {
      dispatch({ type: 'FETCH_MY_COMMENTS', payload: comments})
    })
  }
  // Return is an action
  // return { type: FETCH_MY_POSTS, payload: myWallPosts }
}