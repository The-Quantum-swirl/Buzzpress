import { accessToken } from '../service/ServicePath';
import { Redirect} from "react-router-dom";
import service from "../service/Httpservice";

function OAuth2RedirectHandler(props) {
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    let token = getUrlParameter('token');
    console.log('last path is');
    console.log(localStorage.getItem('lastpath'));
    
    let path = localStorage.getItem('lastpath')!==null? localStorage.getItem('lastpath'): '/home';

    if (token) {
        localStorage.setItem(accessToken(), token);
        service.setJwt(token);
        localStorage.removeItem('lastpath');
    }
    
    return <Redirect to={path} />;
}

export default OAuth2RedirectHandler;