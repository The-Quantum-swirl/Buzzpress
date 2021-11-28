import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { accessToken } from '../service/ServicePath';

function OAuth2RedirectHandler(props) {
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    const token = getUrlParameter('token');
    const error = getUrlParameter('error');

    if (token) {

        localStorage.setItem(accessToken(), token);
        console.log(props.location);
        return <Redirect to={{
            pathname: "/home",
            state: { from: props.location }
        }} />;
    }
    else {
        return <Redirect to={{
            pathname: "/home",
            state: { from: props.location }
        }} />
    }

}

export default OAuth2RedirectHandler;