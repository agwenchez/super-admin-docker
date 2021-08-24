import axios from "axios";

const api = axios.create({
    baseURL: `https://afya-kwanza-backend.herokuapp.com`
  })

export const fetchProductApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/product.json`);
};

export const fetchChatApi1 = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/chatMember.json`);
};

export const fetchChatApi2 = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/chat.chats.json`);
};

export const fetchEmailApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/email.json`);
};

export const fetchBookmaekApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/bookmark.json`);
};

export const fetchTodoApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/todo.json`);
};

export const fetchTaskApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/task.json`);
};

export const fetchProjectApi = () => {
    return axios.get(`${process.env.PUBLIC_URL}/api/project.json`);
};


export const fetchSaccosApi = () => {
    return api.get(`/saccos/all`, {
     headers: { token: localStorage.tokenated}
    });
};


export const fetchMembersApi = () => {
    return api.get(`/members/all`, {
        // headers: { token: localStorage.tokenated}
       });
};


