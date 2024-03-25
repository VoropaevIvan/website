import axios from "axios";

export const getTokenByVkId = async ({ silentToken, uuid }) => {
  try {
    const res = await axios.post("http://localhost:8080/auth", {
      token: silentToken,
      uuid: uuid,
    });
    return res;
  } catch (error) {}
};

// export const getUserInfoByJwt = (jwt) => {
//   const { decodedToken, isExpired } = useJwt(jwt);
//   console.log(decodedToken, isExpired);
//   return {
//     name: "ivan",
//     surname: "voropaev",
//     isAdmin: true,
//     img: "https://sun1-99.userapi.com/s/v1/ig2/u_-TzIncg6wV3uZA2mlbe0MZw2rxfqfzY8KXfE6lf3gA89HkV6HFky0x2oOiqITmYEZnV3w7MC5Uhy3mVtKFF9EF.jpg?size=50x50&quality=96&crop=182,159,495,495&ava=1",
//   };
// };
