import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
// import ProtectedRoute from './components/ProtectedRoute';
import Home from './screens/Home/Home';
import UserDetails from './screens/Settings/Settings';
import Write from './screens/Write/Write';
import Profile from './screens/Profile/Profile';
import Article from './screens/Article/Article';
import Admin from './screens/Admin/AdminDashboard';
import OAuth2RedirectHandler from './components/OAuth2RedirectHandler';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* <ProtectedRoute path="/admin" role="admin" component={Admin} /> */}
                <Redirect from="/" exact to="/home" />
                <Route path="/home" component={Home} />
                <Route path="/settings" component={UserDetails} />
                <Route path="/create" component={Write} />
                <Route path="/article/:articleId" component={Article} />
                <Route path="/profile/:userId" component={Profile} />
                <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                {/* <Route path="/admin" component={Admin} /> */}
            </Switch>
        </BrowserRouter>
    )
}
