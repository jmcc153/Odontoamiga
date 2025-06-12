import axios from "axios";

const API_URL = import.meta.env.VITE_BACK_URL || "https://neptuno.valcredit.co:3000/api/v1/";
const API_URL2 = import.meta.env.VITE_BACK2_URL || "https://neptuno.valcredit.co:3005/api/v2/";
const API_CITY_URL = import.meta.env.VITE_API_CITY_URL;

export const axiosInstanceBearer = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstanceBearerCity = axios.create({
  baseURL: API_CITY_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstanceBearer2 = axios.create({
  baseURL: API_URL2,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInstanceFormData = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
})