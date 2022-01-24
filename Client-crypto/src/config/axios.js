import axios from 'axios';
import { getTokens, setTokens } from '~/helpers/cookie';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(config => {
    const { accessToken } = getTokens();
    config.headers.Authorization = accessToken;
    return config;
});

axiosInstance.interceptors.response.use(config => {
  // Do something with response data
  return config;
}, function (error) {
    const { config, response: { status } } = error;
    const { refreshToken } = getTokens();
    if (status == 403) {
        return axios.post('http://localhost:3000/api/proxy/auth/refreshToken', {
            refreshToken: refreshToken
        })
            .then((response) => {
                config.headers.Authorization = response.data.accessToken;
                setTokens(response.data);
                return axios.request(config).then(response => response)
                .catch(err => {
                    console.log(err)
                })
            })
            .catch(err => {
                
            })
    }
});

export default axiosInstance;