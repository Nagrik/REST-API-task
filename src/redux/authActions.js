import axios from "axios";
import {AUTH_SUCCESS, SHOW_CONTENT} from "./types";


function saveToken(token) {
    sessionStorage.setItem('tokenData', JSON.stringify(token));
}

function saveUserInfo(data) {
    sessionStorage.setItem('userInfo', JSON.stringify(data));
}


// Add a request interceptor
axios.interceptors.request.use(
    (config, token) => {
        refreshToken(token)
        return config;
    },
    error => {
        Promise.reject(error)
    });


//Add a response interceptor
axios.interceptors.response.use((response) => {
    return response
}, function (error, token, response) {
    if (error.response.statusCode === 401) {
        refreshToken( token)
        return Promise.reject(error);
    }
    return response
});


function refreshToken(token) {
    return async () => {
        let refreshUrl = `http://142.93.134.108:1111/refresh`
        await axios.post(refreshUrl, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                const tokenData = res.data.body
                saveToken(JSON.stringify(tokenData)); // сохраняем полученный обновленный токен в sessionStorage, с помощью функции, заданной ранее
            }
        });
    }
}


export function login(email, password) {
    return async (dispatch) => {
        const authData = {
            email, password,
        }

        let LogUrl = `http://142.93.134.108:1111/login?email=${email}&password=${password}`

        await axios.post(LogUrl, authData).then((res) => {
            const tokenData = res.data.body
            saveToken(JSON.stringify(tokenData))
            dispatch(authSuccess(res.data))
            if (res.data.statusCode === 200) {
                dispatch(showContent(res.data))
            } else {
                alert(res.data.message || 'user not found')
            }
        })

    }
}

export function registration(email, password) {
    return async () => {
        const authData = {
            email, password,
        }
        let RegUrl = 'http://142.93.134.108:1111/sign_up'

        const response = await axios.post(RegUrl, authData)
        const data = response.data
        alert(data.message)

    }
}

export function authSuccess(data) {
    return {
        type: AUTH_SUCCESS,
        data
    }
}

export function showContentToPage(data) {
    return {
        type: SHOW_CONTENT,
        data
    }
}

export function showContent(data) {
    return async (dispatch) => {
        let ShowUrl = `http://142.93.134.108:1111/me`
        const response = await axios.get(ShowUrl, {
            headers: {
                Authorization: `Bearer ${data.body.access_token}`
            }
        })
        const resData = response.data
        dispatch(showContentToPage(resData.body.message))
        saveUserInfo(JSON.stringify(resData.body.message))
    }
}





