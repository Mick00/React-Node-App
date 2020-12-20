import axios from "axios"

const createAxiosClient = (jwt?: string|null) => {
    return axios.create({
        baseURL: "http://localhost:3100/api/v1",
        timeout: 1000,
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    });
}

export const setJwt = (newJwt: string) => {
    window.localStorage.setItem('token', newJwt);
    request = createAxiosClient(newJwt);
}
export const getJwtFromStorage = () => {
    return window.localStorage.getItem('token')
}

export const deleteJWT = () => {
    window.localStorage.removeItem('token');
}

export let request = createAxiosClient(getJwtFromStorage());

