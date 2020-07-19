import axios, { AxiosResponse } from "axios";
import { IToDo } from "../models/toDo";

axios.defaults.baseURL = "http://localhost:5000/api";

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

export default {
  ToDos,
};
