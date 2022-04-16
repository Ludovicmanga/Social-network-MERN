import axios from 'axios';

export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_COMMENT_POST = "ADD_COMMENT_POST";
export const EDIT_COMMENT_POST = "EDIT_COMMENT_POST";
export const DELETE_COMMENT_POST = "DELETE_COMMENT_POST";
export const GET_POST_ERROR = "GET_POST_ERROR";

export const getPosts = (num) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}/api/post`, {withCredentials: true})
            .then(res => {
                const array = res.data.slice(0, num);
                dispatch({ type: GET_POSTS, payload: array })
            })
            .catch(error => console.log(error))
    }
}

export const addPost = (data) => {
    return (dispatch) => {
      return axios
        .post(`${process.env.REACT_APP_API_URL}/api/post/`, data)
        .then(res => {
            if(res.data.formattedErrors) {
                dispatch({type: GET_POST_ERROR, payload: res.data.formattedErrors})
            } else {
                dispatch({type: GET_POST_ERROR, payload: ''})
            }
        })
    };
  };
  

export const likePost = (userId, postId) => {
    return (dispatch) => {
        return axios
            .patch(`${process.env.REACT_APP_API_URL}/api/post/like-post/${postId}`, { userId }, {withCredentials: true})
            .then(res => {
                dispatch({ type: LIKE_POST, payload: {postId, userId} })
            })
            .catch(error => console.log(error))
    }
}

export const unlikePost = (userId, postId) => {
    return (dispatch) => {
        return axios
            .patch(`${process.env.REACT_APP_API_URL}/api/post/unlike-post/${postId}`, { userId }, {withCredentials: true})
            .then(res => {
                dispatch({ type: UNLIKE_POST, payload: {postId, userId} })
            })
            .catch(error => console.log(error))
    }
}

export const updatePost = (postId, updatedMessage) => {
    return (dispatch) => {
        return axios
            .put(`${process.env.REACT_APP_API_URL}/api/post/${postId}`, { updatedMessage }, {withCredentials: true})
            .then(res => {
                dispatch({ type: UPDATE_POST, payload: { updatedMessage, postId }})
            })
            .catch(error => console.log(error))
    }
}

export const deletePost = (postId) => {
    return (dispatch) => {
        return axios
            .delete(`${process.env.REACT_APP_API_URL}/api/post/${postId}`, {withCredentials: true})
            .then(res => {
                dispatch({ type: DELETE_POST, payload: postId })
            })
            .catch(error => console.log(error))
    }
}

export const addCommentPost = (postId, commenterId, commenterPseudo, text) => {
    return (dispatch) => {
        return axios
            .patch(`${process.env.REACT_APP_API_URL}/api/post/comment-post/${postId}`, { commenterId, commenterPseudo, text }, {withCredentials: true})
            .then(res => {
                dispatch({ type: ADD_COMMENT_POST, payload: {postId} })
            })
            .catch(error => console.log(error))
    }
}

export const editCommentPost = (postId, commentId,  text) => {
    return (dispatch) => {
        return axios
            .patch(`${process.env.REACT_APP_API_URL}/api/post/edit-comment-post/${postId}`, { commentId, text }, {withCredentials: true})
            .then(res => {
                dispatch({ type: EDIT_COMMENT_POST, payload: {postId, commentId, text} })
            })
            .catch(error => console.log(error))
    }
}

export const deleteCommentPost = (postId, commentId) => {
    return (dispatch) => {
        return axios
            .patch(`${process.env.REACT_APP_API_URL}/api/post/delete-comment-post/${postId}`, { commentId }, {withCredentials: true})
            .then(res => {
                dispatch({ type: DELETE_COMMENT_POST, payload: {postId, commentId} })
            })
            .catch(error => console.log(error))
    }
}