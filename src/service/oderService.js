import axios from "axios";
import { HOST_SEVER } from "@/constants";

export async function createOder(formOder) {
  const token = localStorage.getItem("token");
  if (token === "undefined") {
    console.log("token error");
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  const res = await axios.post(`${HOST_SEVER}/oders/create`, formOder);

  return res.data.payload;
}

export async function getAllOder() {
  const token = localStorage.getItem("token");
  if (token === "undefined") {
    console.log("token error");
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  const res = await axios.get(`${HOST_SEVER}/oders/show`);

  return res.data;
}
export async function getHistoryOrder() {
  const token = localStorage.getItem("token");
  if (token === "undefined") {
    console.log("token error");
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  const res = await axios.get(`${HOST_SEVER}/oders/history`);
  return res.data;
}
export async function getdetaiOder(id) {
  const token = localStorage.getItem("token");
  if (token === "undefined") {
    console.log("token error");
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  const res = await axios.get(`${HOST_SEVER}/oders/show/${id}/detail`);

  return res.data.payload;
}
export async function getOrder(id) {
  const token = localStorage.getItem("token");
  if (token === "undefined") {
    console.log("token error");
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  const res = await axios.get(`${HOST_SEVER}/oders/show/${id}`);

  return res.data.payload;
}
export async function changeStatus(id, form) {
  const token = localStorage.getItem("token");
  if (token === "undefined") {
    console.log("token error");
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  const res = await axios.post(`${HOST_SEVER}/oders/update-status/${id}`, form);

  return res.data.payload;
}
