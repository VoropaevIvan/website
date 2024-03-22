import axios from "axios";

export const getTokenByVkId = async ({ silentToken, uuid }) => {
  const res = axios.post("http://localhost:8080/auth", {
    token: silentToken,
    uuid: uuid,
  });
  return res;
};

export const getUserInfoByJwt = async (jwt) => {
  return { name: "ivan", surname: "voropaev" };
};
