import { API_BASE_URL } from "../app-config";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type" : "application/json",
    });

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if (accessToken) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        url : API_BASE_URL + api,
        method : method,
        headers : headers,
    };

    if (request) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options).then((response) => 
    response.json().then((json) => {
        if (!response.ok) {
            return Promise.reject(json);
        }
        return json;
    }))
    .catch((error) => {
        if (error.status === 403) {
            window.location.href = "/signin";
        }
        return Promise.reject(error);
    });
}

export function signin(member) {
    return call("/auth/signin", "POST", member)
    .then((response) => {
        console.log(response);
        if (response.data.token) {
            localStorage.setItem("USER_KEY", response.data.id);
            localStorage.setItem("ACCESS_TOKEN", response.data.token);
            window.location.href = "/";
        }
    })
    .catch((error) => {
        window.alert(error.error);
    });
}

export function signup(member) {
    return call("/auth/signup", "POST", member)
    .then((response) => {
        console.log(response);
        if (response.data) {
            if (response.data.id) window.location.href = "/";
        } else if (response.error) {
            window.alert(response.error);
        }
    }).catch((error) => {
        if (error.status === 403) {
            window.location.href = "/signup";
        }
        return Promise.reject(error);
    });
}

export function signout() {
    localStorage.setItem("USER_KEY", "");
    localStorage.setItem("ACCESS_TOKEN", "");
    window.location.href = "/";
}