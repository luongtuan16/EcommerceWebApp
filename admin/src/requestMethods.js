import axios from "axios";

const BaseURL = "http://localhost:8080/api";
// const ls = localStorage.getItem('persist:root');
// const Token = ls ? JSON.parse(JSON.parse(ls).user).curUser.token : '';

export const publicRequest = axios.create({
    baseURL: BaseURL,
});
export const userRequest = token => axios.create({
    baseURL: BaseURL,
    headers: { token: `Barier ${token}`}
});