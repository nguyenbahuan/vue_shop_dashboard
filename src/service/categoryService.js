import axios from "axios";
import { HOST_SEVER } from "@/constants";

export async function getAllCategory() {
  const res = await axios.get(`${HOST_SEVER}/categories/get-all`);
  return res.data.payload;
}
