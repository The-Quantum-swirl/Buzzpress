import axios from "axios";
import { accessToken } from "./ServicePath";

axios.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;

    if (!expectedError) console.log("An unexpected error occurrred" + error);

    return Promise.reject(error);
});

function setJwt(jwt) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
}

function base64urlDecode(str) {
    return new Buffer(base64urlUnescape(str), 'base64').toString();
};
function base64urlUnescape(str) {
    str += Array(5 - str.length % 4).join('=');
    return str.replace(/\-/g, '+').replace(/_/g, '/');
}
function getKeyFromToken(){
    let arr = localStorage.getItem(accessToken()).split('.');
    return JSON.parse( base64urlDecode(arr[1]) ).sub;
}

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt,
    getKeyFromToken,
};