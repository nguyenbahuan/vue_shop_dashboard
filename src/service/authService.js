import axios from "axios";
import { HOST_AUTH } from "@/constants/index";

const authService = {
  async checkOutToken(form) {
    axios.defaults.headers["Authorization"] = "Bearer " + form.token;
    const res = await axios.post(HOST_AUTH + "/checkout-token", form);
    return res.data;
  },
  async isAuthenticated() {
    const token = localStorage.getItem("token");
    if (token === "undefined" || token === null) {
      return false;
    }
    const res = await this.checkOutToken({ token: token });
    if (res.status === 401 || res.status === 403) {
      return false;
    }
    return true;
  },
  async loginService(formLogin) {
    const res = await axios.post(`${HOST_AUTH}/login`, formLogin, {
      headers: {
        Authorization: "", // Thay yourAccessToken bằng token bạn muốn sử dụng
      },
    });
    return res.data;
  },
  async registerService(formRegister) {
    const res = await axios.post(`${HOST_AUTH}/register`, formRegister);

    return res.data.payload;
  },
  async getProfileService() {
    const token = localStorage.getItem("token");
    if (token === "undefined") {
      return;
    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const res = await axios.get(`${HOST_AUTH}/profile`);

    return res.data.payload;
  },
  async changePasswordService(formChange) {
    const token = localStorage.getItem("token");
    if (token === "undefined") {
      console.log("token error");
      return;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const res = await axios.post(
      `${HOST_AUTH}/profile/change-password`,
      formChange
    );

    return res.data.payload;
  },
  async forgotPasswordService(formChange) {
    const res = await axios.post(`${HOST_AUTH}/forgot-password`, formChange);

    return res.data.payload;
  },
};
export default authService;
