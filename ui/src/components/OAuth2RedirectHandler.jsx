import { accessToken } from '../service/ServicePath';
import {useHistory} from "react-router-dom";

function OAuth2RedirectHandler(props) {
    let history = useHistory();
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');

    if (token) {
        localStorage.setItem(accessToken(), token);
    }
    setTimeout(() => {
        history.go(-2);
    }, 1000);
    
}

export default OAuth2RedirectHandler;