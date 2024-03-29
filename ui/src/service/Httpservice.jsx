import axios from "axios";

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

function deleteJwt() {
    delete axios.defaults.headers.common["Authorization"];
}

const Httpservice = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt,
    deleteJwt,
};
export default Httpservice;