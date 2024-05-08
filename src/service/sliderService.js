import axios from "axios";
import { HOST_SEVER } from "@/constants";

const sliderService = {
  async getSlider() {
    const res = await axios.get(`${HOST_SEVER}/slider/get-all`);

    return res.data;
  },
};
export default sliderService;
