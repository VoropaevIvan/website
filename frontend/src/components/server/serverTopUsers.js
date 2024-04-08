import axios from "axios";

export const getTopUsers = async () => {
  const link = process.env.REACT_APP_TOP_USERS;

  const res = await axios.get(link, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    },
  });
  return res.data;
};
