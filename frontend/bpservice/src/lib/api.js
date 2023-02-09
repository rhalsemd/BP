import axios from "axios";
import dayjs from "dayjs";

const objString = localStorage.getItem("login-admin-token");
const obj = JSON.parse(objString);
const url = "http://bp.ssaverytime.kr:8080";
// const url = "http://192.168.100.176:8080";

export const getBranchRevenue = (day) => {
  const dayData = dayjs(day).format("YYYY-MM-DD");
  return axios({
    method: "get",
    url: `${url}/api/auth/admin/all-kiosk-money-day/${dayData}`,
    headers: {
      "Content-Type ": "application/json",
      Authorization: `Bearer ${obj.value}`,
    },
  });
};

export const getBranchRevenueMonth = (date) => {
  const year = dayjs(date).format("YYYY");
  const month = dayjs(date).format("MM");
  console.log("getBranchRevenueMonth axios");
  return axios({
    method: "get",
    url: `${url}/api/auth/admin/all-kiosk-money-month/${month}/${year}`,
    headers: {
      "Content-Type ": "application/json",
      Authorization: `Bearer ${obj.value}`,
    },
  });
};

export const getUseageRevenu = (day) => {
  const dayData = dayjs(day).format("YYYY-MM-DD");
  return axios({
    method: "get",
    url: `${url}/api/auth/admin/all-kiosk-count-day/${dayData}`,
    // url: `${url}/api/auth/admin/allKioskCountDay/${dayData}`,
    headers: {
      "Content-Type ": "application/json",
      Authorization: `Bearer ${obj.value}`,
    },
  });
};

export const getUseageRevenuMonth = (date) => {
  const year = dayjs(date).format("YYYY");
  const month = dayjs(date).format("MM");
  return axios({
    method: "get",
    url: `${url}/api/auth/admin/all-kiosk-count-month/${month}/${year}`,
    headers: {
      "Content-Type ": "application/json",
      Authorization: `Bearer ${obj.value}`,
    },
  });
};

export const getRevenueTrend = ({ month, year, caseId }) => {
  return axios({
    method: "get",
    url: `${url}/api/auth/admin/kiosk-money-month/${month}/${year}/${caseId}`,
    headers: {
      "Content-Type ": "application/json",
      Authorization: `Bearer ${obj.value}`,
    },
  });
};

export const getRevenueTrendMonth = ({ year, caseId }) => {
  return axios({
    method: "get",
    url: `${url}/api/auth/admin/kiosk-money-year/${year}/${caseId}`,
    headers: {
      "Content-Type ": "application/json",
      Authorization: `Bearer ${obj.value}`,
    },
  });
};

export const getUsers = () => {
  console.log("getUsers axios");
  return axios({
    method: "get",
    url: `${url}/api/auth/admin/log/get-user-data`,
    headers: {
      "Content-Type ": "application/json",
      Authorization: `Bearer ${obj.value}`,
    },
  });
};

export const getUserLog = (userId) => {
  console.log("getUserLog API 엑시오스", userId);
  return axios({
    method: "get",
    url: `${url}/api/auth/admin/log/get-rent-log-data/${userId}`,
    headers: {
      "Content-Type ": "application/json",
      Authorization: `Bearer ${obj.value}`,
    },
  });
};

export const loginAdmin = (data) => {
  console.log(data.id, data.pwd);
  return axios({
    method: "post",
    url: `${url}/api/admin/login`,
    data: {
      adminId: data.id,
      pwd: data.pwd,
    },
    headers: {
      "Content-Type ": "application/json",
    },
  });
};

export const logoutAdmin = () => {
  return axios({
    method: "get",
    url: `${url}/api/auth/admin/logout`,
    headers: {
      Authorization: `Bearer ${obj.value}`,
    },
  });
};

export const getUserImg = (id) => {
  console.log(id);
  return axios({
    method: "get",
    url: `${url}/api/auth/admin/log/get-img-url/${id}`,
    headers: {
      "Content-Type ": "application/json",
      Authorization: `Bearer ${obj.value}`,
    },
  });
};
