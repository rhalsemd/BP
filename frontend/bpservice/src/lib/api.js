import axios from "axios";

const url = "http://192.168.100.176:8080";

export const getBranchRevenue = (day) => {
  console.log("day", day);
  return axios({
    method: "get",
    url: `${url}/admin/KioskMoneyDay/${day}`,
    headers: {
      "Content-Type ": "application/json",
    },
  });
};

export const getUseageRevenu = (day) => {
  axios({
    method: "get",
    url: `${url}/admin/KioskMoneyDay/${day}`,
    headers: {
      "Content-Type ": "application/json",
    },
  });
};
