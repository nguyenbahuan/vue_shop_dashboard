import axios from "axios";

const cityService = {
  async getAllCity() {
    const res = await axios.get(`https://esgoo.net/api-tinhthanh/1/0.htm`);
    return res.data;
  },
};
export default cityService;
