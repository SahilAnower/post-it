import { useToken, backendUrl } from "../constants";

export const FreindListDepictById = async (id) => {
  try {
    const token = useToken();
    const response = await fetch(`${backendUrl}/users/${id}/freinds`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
