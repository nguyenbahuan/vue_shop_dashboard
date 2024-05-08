import instance from "./axiosConfig";
import { HOST_AUTH } from "@/constants";

const userService = {
  async updateUser(formUpdate) {
    const res = await instance.put(`${HOST_AUTH}/profile/update`, formUpdate, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.payload;
  },
};
export default userService;
