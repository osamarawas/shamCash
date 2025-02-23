import axiosInstance from "./axios";

export const postData = async (url: string, body: object) => {
  try {
    const response = await axiosInstance.post(url, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
