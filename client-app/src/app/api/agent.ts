import axios, { AxiosResponse } from "axios";
import { IToDo } from "../models/toDo";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("jwt");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Netverk feil. Sjekk Sql Serveren.");
  }
  const { status, data, config } = error.response;
  if (error.response.status === 404) {
    history.push("/notfound");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }
  if (status === 500) {
    toast.error("Server Feil");
  }
  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(500)).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
};

const ToDos = {
  list: (): Promise<IToDo[]> => requests.get("/todos"),
  details: (id: string) => requests.get(`/todos/${id}`),
  create: (toDo: IToDo) => requests.post("/todos", toDo),
  update: (toDo: IToDo) => requests.put(`/todos/${toDo.id}`, toDo),
  delete: (id: string) => requests.del(`/todos/${id}`),
};

const User = {
  currentUser: (): Promise<IUser> => requests.get("/user"),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/login`, user),
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/user/register`, user),
};
export default {
  ToDos,
  User,
};
