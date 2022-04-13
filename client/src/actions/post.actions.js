import axios from 'axios';

export const GET_POSTS = "GET_POSTS";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";

export const getPosts = () => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}/api/post`, {withCredentials: true})
            .then(res => {
                dispatch({ type: GET_POSTS, payload: res.data })
            })
            .catch(error => console.log(error))
    }
}

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

