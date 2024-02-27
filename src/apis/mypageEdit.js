import axios from "axios";

export const client = axios.create({
  baseURL: "https://dev.jojoumc.shop", //기본 서버 주소
  withCredentials: true,
  headers: {
    // Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("accessToken")}`,
  },
});

export const clientImage = axios.create({
  baseURL: "https://dev.jojoumc.shop", //기본 서버 주소
  withCredentials: true,
  headers: {
    // Accept: "application/json",
    // "Content-Type": "application/json",
    Authorization: `${localStorage.getItem("accessToken")}`,
  },
});

export const photoChange = (image) => {
  const photoImage = new FormData();
  console.log(image, "image");
  photoImage.append("photoImage", image);
  return clientImage.patch("/growup/users/photo-change", photoImage);
};

export const getMyInfo = () => {
  return client.get("/growup/users/info");
};

export const existNickname = async (nickName) => {
  console.log({ nickName }, nickName, "sd");
  return await client.post("/growup/users/exist-nickname", { nickName });
};

export const changeNickname = (nickName) => {
  console.log(nickName);
  return client.patch("/growup/users/nickname-change", {
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

export const change_password = ({ password, passwordCheck }) => {
  console.log(password, passwordCheck, "check");
  return client.patch("/growup/users/password-restore", {
    password,
    passwordCheck,
  });
};

export const withdraw = (currentPwd) =>
  client.patch("/growup/users/withdraw", { currentPwd: currentPwd });
