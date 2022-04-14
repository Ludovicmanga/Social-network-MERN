import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`, { withCredentials: true })
            .then(res => {
                dispatch({ type: GET_USER, payload: res.data });
            })
            .catch(error => console.log(error))
    }
}

export const uploadPicture = (data, userId) => {
    return (dispatch) => {
        return axios
                .post(`${process.env.REACT_APP_API_URL}/api/user/upload`, data , {withCredentials: true})
                .then(res => {
                    return axios
                        .get(`${process.env.REACT_APP_API_URL}/api/user/${userId}`)
                        .then(res => {
                            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture})
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
    }
}

export const updateBio = (bio, userId) => {
    return (dispatch) => {
        return axios
            .put(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, { bio }, {withCredentials: true})
            .then(res => {
                console.log(res.data.bio)
                dispatch({type: UPDATE_BIO, payload: res.data.bio})
            })
            .catch(error => console.log(error))
    }
}

export const followUser = (idToFollow, followerId) => {
    return (dispatch) => {
        return axios
            .patch(`${process.env.REACT_APP_API_URL}/api/user/follow/${followerId}`, { idToFollow }, {withCredentials: true})
            .then(res => {
                dispatch({type: FOLLOW_USER, payload: { idToFollow }})
            })
            .catch(error => console.log(error))
    }
}

export const unfollowUser = (idToUnfollow, unfollowerId) => {
    return (dispatch) => {
        return axios
            .patch(`${process.env.REACT_APP_API_URL}/api/user/unfollow/${unfollowerId}`, { idToUnfollow }, {withCredentials: true})
            .then(res => {
                dispatch({type: UNFOLLOW_USER, payload: { idToUnfollow }})
            })
            .catch(error => console.log(error))
    }
}