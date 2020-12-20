import React from 'react';
import {Route} from "react-router-dom";
import {useCredentials} from "./CredentialsProvider";
import NoPermission from "../views/NoPermission";

interface ProtectedRouteProps {
    children: React.ReactNode,
    permission: string,
    [n:string]: any,
}

export default function ProtectedRoute({ children, permission, ...rest }: ProtectedRouteProps){

    const {user} = useCredentials();

    if (user && user.hasPermission(permission)){
        return (
            <Route {...rest}>
                {children}
            </Route>
        );
    }
    return (
        <Route {...rest}>
            <NoPermission permission={permission}/>
        </Route>
    );
};
