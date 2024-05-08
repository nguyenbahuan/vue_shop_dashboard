import { HOST_SEVER } from "@/constants";
import axios from "axios";
export async function getProduct(id) {
  try {
    const response = await axios.get(`${HOST_SEVER}/products/detail/${id}`);
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export async function getProductByCategory(formSearch) {
  try {
    const response = await axios.post(
      `${HOST_SEVER}/products/search`,
      formSearch
    );
    return response.data.payload;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
