import axios from "axios";

export const getTokenByVkId = async ({ silentToken, uuid }) => {
  try {
    const link = process.env.REACT_APP_AUTH;
    const res = await axios.post(link, {
      token: silentToken,
      uuid: uuid,
    });
    return res;
  } catch (error) {}
};
