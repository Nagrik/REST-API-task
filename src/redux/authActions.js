import axios from "axios";
import {AUTH_SUCCESS, SHOW_CONTENT} from "./types";


function saveToken(token) {
    sessionStorage.setItem('tokenData', JSON.stringify(token));
}
function saveUserInfo(data) {
    sessionStorage.setItem('userInfo', JSON.stringify(data));
}

function refreshToken(token) {
    return async () => {
        let refreshUrl = `http://142.93.134.108:1111/refresh`
        await axios.post(refreshUrl,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((res) => {
            if (res.status === 200) {
                const tokenData = res.data.body
                saveToken(JSON.stringify(tokenData)); // сохраняем полученный обновленный токен в sessionStorage, с помощью функции, заданной ранее
            }
        });
    }
}

export async function fetchWithAuth(url, options) {

    const loginUrl = '/'; // url страницы для авторизации
    let tokenData = null; // объявляем локальную переменную tokenData

    if (sessionStorage.tokenData) { // если в sessionStorage присутствует tokenData, то берем её
        tokenData = JSON.parse(localStorage.tokenData);
    } else {
        return window.location.replace(loginUrl); // если токен отсутствует, то перенаправляем пользователя на страницу авторизации
    }

    if (!options.headers) { // если в запросе отсутствует headers, то задаем их
        options.headers = {};
    }

    if (tokenData) {
        if (Date.now() >= tokenData.expires_on * 1000) { // проверяем не истек ли срок жизни токена
            try {
                const newToken = refreshToken() // если истек, то обновляем токен с помощью refresh_token
                saveToken(newToken);
            } catch (e) { // если тут что-то пошло не так, то перенаправляем пользователя на страницу авторизации
                return  window.location.replace(loginUrl);
            }
        }
        console.log('TokenData', tokenData)
        options.headers.Authorization = `Bearer ${tokenData.token}`; // добавляем токен в headers запроса
    }

    return fetch(url, options); // возвращаем изначальную функцию, но уже с валидным токеном в headers
}



export function login(email, password, isLogin) {
    return async (dispatch) => {
        const authData = {
            email, password,
        }

        let  LogUrl = `http://142.93.134.108:1111/login?email=${email}&password=${password}`

         await axios.post(LogUrl, authData).then((res) => {
            const tokenData = res.data.body
            saveToken(JSON.stringify(tokenData))
            dispatch(authSuccess(res.data))
            if(res.data.statusCode === 200){
            dispatch(showContent(res.data))
            }else{
               alert(res.data.message || 'user not found')
            }
        })

    }
}
export function registration(email, password, isLogin) {
    return async () => {
        const authData = {
            email, password,
        }
        let RegUrl = 'http://142.93.134.108:1111/sign_up'

        console.log(isLogin)
        const response = await axios.post(RegUrl, authData)
        const data = response.data
        console.log(data)
        alert(data.message)

    }
}
export function authSuccess(data){
    return{
        type: AUTH_SUCCESS,
        data
    }
}

export function showContentToPage(data){
    return{
        type:SHOW_CONTENT,
        data
    }
}

export function showContent(data){
    return async (dispatch) => {
        let ShowUrl = `http://142.93.134.108:1111/me`
        const response = await axios.get(ShowUrl,{
            headers:{
                Authorization:`Bearer ${data.body.access_token}`
            }
        })
        const resData = response.data
        dispatch(showContentToPage(resData.body.message))
        saveUserInfo(JSON.stringify(resData.body.message))
    }
}



