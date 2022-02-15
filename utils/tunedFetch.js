import getConfig from 'next/config';
import { userService } from 'services';

const { publicRuntimeConfig } = getConfig();

export const tunedFetched = {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    delete: httpDelete
};

const httpGet = async (url) => {
    const requestOptions = {
        method: 'GET',
        headers: getAuthHeader(url)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

const httpPost = async (url, body) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader(url) },
        credentials: 'include',
        body: JSON.stringify(body)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

const httpPut = async (url, body) => {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...autgetAuthHeaderhHeader(url) },
        body: JSON.stringify(body)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);    
}

const httpDelete = async (url) => {
    const requestOptions = {
        method: 'DELETE',
        headers: getAuthHeader(url)
    };
    const response = await fetch(url, requestOptions);
    return handleResponse(response);
}

// util functions

const getAuthHeader = (url) => {
    
    // return auth header with jwt if user is logged in and request is to the API url
    const user = userService.userValue;
    const hasToken = user && user.token;
    
    //checking if request if for the specified API
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (hasToken && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

// centralized pre processing responses
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {

            // parsing unthorized and forbidden http status codes
            if ([401, 403].includes(response.status) && userService.userValue) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                userService.logout();
            }

            //TODO - parse other HTTP status codes 

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}