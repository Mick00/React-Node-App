import React, {createContext, useContext, useEffect, useState} from 'react';
import User, {IUser} from "../data/User";
import {deleteJWT, request, setJwt} from "../request";
import {useHistory} from "react-router-dom";

const CredentialsContext = createContext({
    user: null as IUser|null,
    setUser: function (user: IUser) {
        this.user = user;
    },
    isAuthenticated: () => false as boolean,
    login: (username: string, password: string) => new Promise((res, rej)=> rej()),
    logout: ()=> {}
})

export default function CredentialsProvider(props: any){

    const [ user, setUser ] = useState<IUser|null>(null);
    const history = useHistory();

    useEffect(() => {
        request.post("/auth/validate")
            .then(response => {
                validateResponse(response);
            }).catch(() => {
                history.push("/login");
            })
    },[])

    const login = (username:string, password: string) => {
        return request.post("/auth/login", {username, password})
            .then((response)=>{
                if (response.data.failed){
                    throw response.data.message;
                }
                return response;
            })
            .then(response => {
                return validateResponse(response);
            })
    }

    const validateResponse = (response: any) => {
        if (!response.data.token){
            throw "Wrong password or username";
        }
        setJwt(response.data.token);
        const {user} = response.data;
        const userInfo = new User(
            user.id,
            user.username,
            response.data.token,
            user.permissions,
            user.passwordNeedsReset,
        );

        setUser(userInfo);
        return userInfo;
    }

    const logout = () => {
        setUser(null);
        history.push("/login")
        deleteJWT();
    }

    const isAuthenticated = () => {
        return !!user;
    }

    return (
        <CredentialsContext.Provider value={{
            user,
            setUser,
            isAuthenticated,
            login,
            logout
            }}>
            {props.children}
        </CredentialsContext.Provider>
    )
}

export const useCredentials = ()=>{
    return useContext(CredentialsContext);
}
