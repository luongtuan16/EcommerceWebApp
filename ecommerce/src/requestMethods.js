import axios from "axios";

const BaseURL = "http://localhost:8080/api";

export const publicRequest = axios.create({
    baseURL: BaseURL,
});
export const userRequest = (token) =>
    axios.create({
        baseURL: BaseURL,
        headers: { token: `Bearer ${token}` }
    });
