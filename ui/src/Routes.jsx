import React from 'react'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from "./screens/loginPage";
import Logout from "./components/logout";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/logout" component={Logout} />
                {/* <ProtectedRoute path="/admin" role="admin" component={Admin} /> */}
                <Redirect from="/" exact to="/login" />
            </Switch>
        </BrowserRouter>
    )
}
