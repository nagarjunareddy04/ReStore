import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = "http://localhost:6004/api";
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) =>{
    console.log("caught by interceptor");
    const {data, status} = error.response!;
    switch (status) {
        case 400:
            //toast.error(data.title);
            toast.error("400 Error");
            break;
        case 401:
            toast.error("401 Error");
            break;
        case 500:
            toast.error("500 Error");
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Catalog = {
    list: () => requests.get("/products"),
    details: (id?: string) => requests.get(`/products/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get("/buggy/bad-request"),
    get404Error: () => requests.get("/buggy/not-found"),
    get401Error: () => requests.get("/buggy/unauthorized"),
    getValError: () => requests.get("/buggy/validation-error"),
    get500Error: () => requests.get("/buggy/server-error"),
}

const agent = {
    Catalog,
    TestErrors
}

export default agent;