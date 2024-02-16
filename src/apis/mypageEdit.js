import axios from "axios";

const client = axios.create({
  baseURL: "https://dev.jojoumc.shop", //기본 서버 주소
  withCredentials: true,
  headers: {
    // Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("accessToken")}`,
  },
});

export const getMyInfo = () => {
  return client.get("/growup/users/info");
};

export const photoChange = () => client.patch("/growup/users/photo-change");

export const existNickname = async (nickName) => {
  console.log({ nickName }, nickName, "sd");
  return await client.post("/growup/users/exist-nickname", { nickName });
};

export const changeNickname = (nickName) => {
  console.log(nickName);
  client.patch("/growup/users/nickname-change", {
    nickName,
  });
};

export const changeEmail = () => client.patch("/users/email-change");

export const passwordCheck = (currentPwd) => {
  console.log(currentPwd);
  try {
    return client.post("/growup/users/password-check", currentPwd);
  } catch (e) {
    console.error(e);
  }
};
