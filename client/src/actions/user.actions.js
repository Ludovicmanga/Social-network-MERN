import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";

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
                .post(`${process.env.REACT_APP_API_URL}/api/user/upload`, data, {withCredentials: true})
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
                dispatch({type: UPDATE_BIO, payload: res.data.bio})
            })
            .catch(error => console.log(error))
    }
}