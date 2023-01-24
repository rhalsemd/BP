import axios from "axios";

export const getBranchRevenue = () => {
  axios({
    method: "get",
    url: "???",
    headers: {
      "Content-Type ": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  }).then(res) {
    console.log(res)
  }
};
