import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

export const getUser = (uid) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}/api/user/${uid}`, { withCredentials: true })
            .then(res => {
                console.log(res)
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