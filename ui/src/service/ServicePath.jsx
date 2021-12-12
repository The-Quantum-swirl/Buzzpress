const baseURL = () => {
  if ( process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test" ) {
    // return process.env.REACT_APP_API_BASE_URL;
    return process.env.REACT_APP_API_BASE_URL_PROD;
  } 
  else return process.env.REACT_APP_API_BASE_URL_PROD;
};

const frontendURL = () => {
  if ( process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test" ) {
    return process.env.REACT_APP_FRONTEND_URL;
  } 
  else return process.env.REACT_APP_FRONTEND_URL_PROD;
};

const fURL = () => {
    if ( process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test" ) {
        return '';
    } 
    else return process.env.REACT_APP_FRONTEND_URL_PROD;
}
const accessToken = () => process.env.REACT_APP_ACCESS_TOKEN;

const googleAuthURL = () => {
  if ( process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test" ) {
    // return (
    //   process.env.REACT_APP_API_BASE_URL +
    //   "oauth2/authorize/google?redirect_uri=" +
    //   process.env.REACT_APP_OAUTH2_REDIRECT_URI
    // );
    return (
      process.env.REACT_APP_API_BASE_URL_PROD +
      "oauth2/authorize/google?redirect_uri=" +
      process.env.REACT_APP_OAUTH2_REDIRECT_URI
    );
  } 
  else {
    return (
      process.env.REACT_APP_API_BASE_URL_PROD +
      "oauth2/authorize/google?redirect_uri=" +
      process.env.REACT_APP_OAUTH2_REDIRECT_URI_PROD
    );
  }
};
export { baseURL, frontendURL, fURL, accessToken, googleAuthURL };
