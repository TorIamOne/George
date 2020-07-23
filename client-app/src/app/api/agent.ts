import axios, { AxiosResponse } from "axios";
import { IToDo } from "../models/toDo";
import { history } from "../..";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api";

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
  throw error;
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

export default {
  ToDos,
};
