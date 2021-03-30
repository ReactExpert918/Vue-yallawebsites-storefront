
import { authHeader } from './auth-header';

export const userService = {
    login,
    logout,
    register,
    getAll,
};

var backendURL = process.env.VUE_APP_BACKEND_URL;


function login(email, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username_or_email: email,
            password: password
        })
    };

    return fetch(`${backendURL}/api/auth/login`, requestOptions)
        .then(handleResponse)
        .then(resp => {
            var data = JSON.parse(resp).data;
            // login successful if there's a jwt token in the response
            if (data.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(data));
            }
            return resp;
        });



}

function logout() {
    // remove user from local storage to log user out
    alert("Bye Bye world");
    localStorage.removeItem('user');
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(`/users/register`, requestOptions).then(handleResponse);
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
