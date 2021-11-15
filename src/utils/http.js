import axios from "axios"

const host = "https://calories-tracker-api-server.herokuapp.com"
const apiVersion = "/api/v1"

const access_token = window.localStorage.getItem("access_token")

const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": access_token,
}

function getAccessToken() {
    const access_token_exp = window.localStorage.getItem('access_token_exp')
    const refresh_access_token = window.localStorage.getItem('refresh_access_token')
    const nowDate = Date.now() / 1000
    const url = host + apiVersion + '/auth/refresh_access'

    if (access_token_exp < nowDate) {
        axios.post(url, { "refresh_access_token": refresh_access_token }, { headers }).then(response => {
            window.localStorage.setItem('access_token', response.data.data.access_token)
            window.localStorage.setItem('access_token_exp', response.data.data.access_token_exp)
        })
    } else if (access_token_exp > nowDate) {
        return
    }
}



function get(path, params = {}) {
    getAccessToken()
    const url = host + apiVersion + path
    return axios.get(url, { params, headers})
}

function post(path, body) {
    getAccessToken()
    const url = host + apiVersion + path
    return axios.post(url, body, { headers })
}

function del(path, body) {
    getAccessToken()
    const url = host + apiVersion + path
    return axios.delete(url, {data: body, headers: headers})
}

export default { get, post, delete: del }
