import instance from "./axiosConfig";
import axios from "axios";
import { HOST_SEVER } from "@/constants";

const reviewService = {
  async getReviewProduct(id, form) {
    const res = await axios.post(`${HOST_SEVER}/reviews/product/${id}`, form);

    return res.data;
  },
  async createReviewProduct(form) {
    const res = await instance.post(`${HOST_SEVER}/reviews/create`, form);

    return res.data.payload;
  },
  async statisticalReviewProduct(id) {
    const res = await axios.get(
      `${HOST_SEVER}/reviews/statistical/product/${id}`
    );

    return res.data.payload;
  },
};
export default reviewService;
