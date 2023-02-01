import axios from "axios";
import dayjs from "dayjs";

// const url = "http://192.168.137.138:8080";
const url = "http://bp.ssaverytime.kr:8080";
// const url = "http://192.168.100.176:8080";

export const getBranchRevenue = (day) => {
  const dayData = dayjs(day).format("YYYY-MM-DD");
  return axios({
    method: "get",
    url: `${url}/api/auth/admin/all-kiosk-money-day/${dayData}`,
    headers: {
      "Content-Type ": "application/json",
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
    },
  });
};

export const getUseageRevenuMonth = (month, year) => {
  console.log("getUseageRevenue axios");
  return axios({
    method: "get",
    url: `${url}/admin/all-kiosk-count-month/${month}/${year}`,
    headers: {
      "Content-Type ": "application/json",
    },
  });
};

export const getRevenueTrend = ({ month, year, caseId }) => {
  return axios({
    method: "get",
    url: `${url}/api/auth/admin/kiosk-money-month/${month}/${year}/${caseId}`,
    headers: {
      "Content-Type ": "application/json",
    },
  });
};

export const getRevenueTrendMonth = ({ year, caseId }) => {
  return axios({
    method: "get",
    url: `${url}/api/auth/admin/kiosk-money-year/${year}/${caseId}`,
    headers: {
      "Content-Type ": "application/json",
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
    },
  });
};

export const getUserLog = (userId) => {
  console.log("getUserLog API 엑시오스", userId);
  return axios({
    method: "get",
    url: `${url}/api/auth/admin/log/get-lent-log-data/${userId}`,
    headers: {
      "Content-Type ": "application/json",
    },
  });
};
