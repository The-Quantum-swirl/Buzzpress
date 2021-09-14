import React from 'react'
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute(path, role, render, Component, ...rest) {

    return (
        <Route {...rest} render={(props) => {
            // const user = auth.getCurrentUser();
            const user = { "name": "admin", "role": "admin" };

            if (!user)
                return (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location },
                        }}
                    />
                );
            else if (user.role !== role) {
                return <h1>Unauthorised Access : Error 404</h1>;
            }
            return Component ? <Component {...props} {...rest} /> : render(props);
        }}
        />
    )
}
