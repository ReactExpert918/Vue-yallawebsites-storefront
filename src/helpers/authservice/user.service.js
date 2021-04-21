
import { authHeader } from './auth-header';
import axios from "axios";

export const userService = {
    login,
    logout,
    register,
    getAll,
};

var backendURL = process.env.VUE_APP_BACKEND_URL;


function login(email, password) {


    const payload = {
        username_or_email: email,
        password: password
    }
    const headers = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return axios
        .post(`${backendURL}/api/auth/login`, payload, headers)
        .then(response => {
            var user = response.data.data;
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }
        }).catch(handleAxiosError);
}

function logout() {
    // remove user from local storage to log user out
    var user = getLoggedInUser();
    if (user) {
        const headers = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        localStorage.removeItem('user');

        axios
            .post(`${backendURL}/api/auth/logout/${user.id}`, headers)
            .catch(error => {
                if (error.response) {
                    window.console.log(error.response.data);
                }
            })
    }


}

export function handleAxiosError(error) {
    if (error.response) {
        var data = error.response.data;
        if (error.response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            location.reload(true);
        }
        const errorMsg = (data && data.message) || error.response.statusText;

        return Promise.reject(errorMsg);
    }
}

function register(user) {

    const payload = {
        first_name: user.firstname,
        last_name: user.lastname,
        username: user.username,
        email: user.email,
        password: user.password,
        password_confirmation: user.passwordConfirm,
    }
    const headers = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return axios
        .post(`${backendURL}/api/auth/signup`, payload, headers)
        .then(response => {
            alert(`User(${response.data.data.id}) signup successful`);
        }).catch(handleAxiosError);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    const data = response.text();
    if (!response.ok) {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            location.reload(true);
        }
        const error = (data && data.message) || response.statusText;

        return Promise.reject(error);
    }
    return data;
}

export function getLoggedInUser() {
    return JSON.parse(localStorage.getItem('user'));
}
