import axios from "axios";
import instance from "./axiosConfig";
import { HOST_SEVER } from "@/constants";
export async function getAddress(id) {
  const res = await instance.get(`${HOST_SEVER}/address/show/` + id);

  return res.data.payload;
}

export async function createAddress(formAddress) {
  const token = localStorage.getItem("token");
  if (token === "undefined") {
    console.log("token error");
    return;
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  const res = await axios.post(`${HOST_SEVER}/address/create`, formAddress);

  return res.data.payload;
}

export async function updateAddress(formAddress, id) {
  const token = localStorage.getItem("token");
  if (token === "undefined") {
    console.log("token error");
    return;
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  const res = await axios.put(
    `${HOST_SEVER}/address/update/${id}`,
    formAddress
  );

  return res.data.payload;
}
export async function deleteAddress(id) {
  const token = localStorage.getItem("token");
  if (token === "undefined") {
    console.log("token error");
    return;
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  const res = await axios.delete(`${HOST_SEVER}/address/delete/${id}`);

  return res.data.payload;
}

export async function getAllAdress() {
  const token = localStorage.getItem("token");
  if (token === "undefined") {
    console.log("token error");
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  const res = await axios.get(`${HOST_SEVER}/address/get-all`);
  return res.data.payload;
}
