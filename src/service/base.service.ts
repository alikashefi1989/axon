import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export abstract class BaseService {

    constructor() {
        this.axiosInstance = Axios.create(this.axiosRequestConfig);
    }

    protected baseUrl: string = 'http://localhost:3005/';
    protected axiosInstance: AxiosInstance;

    protected axiosRequestConfig: AxiosRequestConfig = {
        baseURL: this.baseUrl,
        headers: { 'Content-Type': 'application/json' },
    };

    get getAxiosInstance(): AxiosInstance {
        let _getAxiosInstance: AxiosInstance = this.axiosInstance;

        // this.set_401_interceptors(axiosInstanceWithToken);
        _getAxiosInstance.interceptors.response.use(
            function (response) {
                // Any status code that lie within the range of 2xx cause this function to trigger
                // Do something with response data
                return response;
            },
            function (error) {
                // Any status codes that falls outside the range of 2xx cause this function to trigger
                // Do something with response error
                return Promise.reject(error);
            }
        );

        return _getAxiosInstance;
    }
}