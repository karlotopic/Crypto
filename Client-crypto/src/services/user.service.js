import axios from 'axios';
import { setCookies, setTokens } from "~/helpers/cookie";

export const Auth = async (username, password, pathname) => {   
    return axios.post(`http://localhost:3000/api/proxy/auth/${pathname}`, {
        username: username,
        password: password
    })
    .then(({ data }) => {
        setCookies(data);
        return true;
    })
    .catch((err) => {
        console.log(err);
        return false;
    })
}

export const logOut = () => {
    setTokens({});
}