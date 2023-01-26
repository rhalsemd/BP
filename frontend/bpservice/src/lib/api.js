import axios from "axios";

// const url = "http://192.168.100.176:8080";
const url = "http://192.168.100.80:8080";

export const getBranchRevenue = (day) => {
  console.log("getBranchRevenue axios", day);
  return axios({
    method: "get",
    url: `${url}/admin/AllKioskMoneyDay/${day}`,
    headers: {
      "Content-Type ": "application/json",
    },
  });
};

export const getBranchRevenueMonth = (month, year) => {
  console.log("getBranchRevenueMonth axios");
  return axios({
    method: "get",
    url: `${url}/admin/AllKioskMoneyMonth/${month}/${year}`,
    headers: {
      "Content-Type ": "application/json",
    },
  });
};

export const getUseageRevenu = (day) => {
  console.log("getUseageRevenu axios", day);

  return axios({
    method: "get",
    url: `${url}/admin/AllKioskCountDay/${day}`,
    headers: {
      "Content-Type ": "application/json",
    },
  });
};

export const getUseageRevenuMonth = (month, year) => {
  console.log("getUseageRevenue axios");
  return axios({
    method: "get",
    url: `${url}/admin/AllKioskCountMonth/${month}/${year}`,
    headers: {
      "Content-Type ": "application/json",
    },
  });
};

///////////////////////////////////////
/////////이거안쓸듯/////////////////////
export const getTotalKiosk = (day) => {
  return axios({
    method: "get",
    url: `${url}/admin/KioskMoneyDay/${day}`,
    headers: {
      "Content-Type ": "application/json",
    },
  });
};
//////////////////////////////////////
//////////////////////////////////////

export const getRevenueTrend = ({ month, year }) => {
  console.log("getrevenueDay axios, 여기까지 옴", month, year);
  return axios({
    method: "get",
    url: `${url}/admin/KioskMoneyMonth/${month}/${year}/1`,
    // url: `${url}/admin/KioskMoneyYear/${year}/1`,
    headers: {
      "Content-Type ": "application/json",
    },
  });
};

export const getRevenueTrendMonth = (year) => {
  return axios({
    method: "get",
    url: `${url}/admin/KioskMoneyYear/${year}`,
    headers: {
      "Content-Type ": "application/json",
    },
  });
};
