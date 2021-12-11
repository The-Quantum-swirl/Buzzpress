
const baseURL = () => {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
        // return process.env.REACT_APP_API_BASE_URL;
        return "https://backend-bz.herokuapp.com/";
    }
}
const frontendURL = () => {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
        return process.env.REACT_APP_FRONTEND_URL;
    }
}
const accessToken = () => process.env.REACT_APP_ACCESS_TOKEN;
const googleAuthURL = () => {
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
        // return process.env.REACT_APP_API_BASE_URL +"oauth2/authorize/google?redirect_uri="+process.env.REACT_APP_OAUTH2_REDIRECT_URI
        return "https://backend-bz.herokuapp.com/"+"oauth2/authorize/google?redirect_uri="+process.env.REACT_APP_OAUTH2_REDIRECT_URI       
    }
}
export {
    baseURL,
    frontendURL,
    accessToken,
    googleAuthURL
}