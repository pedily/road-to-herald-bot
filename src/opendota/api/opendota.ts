import Axios from "axios";

export const opendota = Axios.create({
  baseURL: "https://api.opendota.com/api",
  headers: {
    Accept: "application/json; charset=utf-8",
  },
});
