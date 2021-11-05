import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
// import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from "./screens/loginPage";
import Logout from "./components/logout";
import Home from './screens/Home';
import UserDetails from './screens/UserDetails';
import Write from './screens/Write/Write';
import Profile from './screens/Profile';
import Article from './screens/Article';
import Admin from './screens/Admin/AdminDashboard';
export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/logout" component={Logout} />
                {/* <ProtectedRoute path="/admin" role="admin" component={Admin} /> */}
                <Redirect from="/" exact to="/home" />
                <Route path="/home" component={Home} />
                <Route path="/settings" component={UserDetails} />
                <Route path="/create" component={Write} />
                <Route path="/article/:articleId" component={Article} />
                <Route path="/profile/:userId" component={Profile} />
                {/* <Route path="/admin" component={Admin} /> */}
            </Switch>
        </BrowserRouter>
    )
}
