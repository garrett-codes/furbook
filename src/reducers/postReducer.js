const defaultState = {
	posts: []
}

export default (state = defaultState, action) => {
  // console.log('in messages reducer', action);

  switch (action.type) {
  	case 'FETCH_MY_POSTS':
      return {
        ...state,
        posts: action.payload
      }
    case 'CREATE_POST':
    	// debugger
    	let post = {...action.payload.object, comments:[], user:{id: action.payload.object.user_id}}
      return {
      	...state,
        posts: [post, ...state.posts]
      }
    default:
      return state
  }
}
