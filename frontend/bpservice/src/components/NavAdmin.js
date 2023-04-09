/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import BarChartIcon from "@mui/icons-material/BarChart";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../style/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { adminLogout } from "../modules/loginAdmin";

const divStyle = css`
  display: flex;
  justify-content: space-between;
  height: 8vh;
`;

export default function Nav() {
  // const useSelector = useDispatch();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const url = useLocation().pathname == "/admin";
  const objString = localStorage.getItem("login-admin-token");
  const 로그인 = useSelector((state) => state.loginAdminReucer.success);

  React.useEffect(() => {
    if (!로그인 && !url) {
      alert("로그인이 필요합니다");
      navigate("/admin");
    }
  }, [로그인]);

  React.useEffect(() => {
    const obj = JSON.parse(objString);
    if (!url) {
      if (Date.now() > obj?.expire) {
        localStorage.removeItem("login-admin-token");
        alert("다시 로그인해주세요.");
        navigate("/admin");
      }
    }
  }, [url]);

  const onClick = (index) => {
    switch (index) {
      case 0:
        navigate("/admin/total-income");
        break;
      case 1:
        navigate("/admin/total-useage");
        break;
      case 2:
        navigate("/admin/users");
        break;
      case 3:
        navigate("/admin/kiosk-setting");
      default:
        break;
    }
  };

  const 로그아웃 = (e) => {
    e.preventDefault();
    dispatch(adminLogout());
  };
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["매출 현황", "사용 현황", "사용자 목록", "키오스크 관리"].map(
          (text, index) => (
            <ListItem key={text} disablePadding onClick={() => onClick(index)}>
              <ListItemButton>
                <ListItemIcon>
                  {index == 0 ? (
                    <BarChartIcon />
                  ) : index == 1 ? (
                    <UmbrellaIcon />
                  ) : (
                    <AccountCircleTwoToneIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      {objString ? (
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={(e) => 로그아웃(e)}>
              <ListItemIcon>{<LogoutTwoToneIcon />}</ListItemIcon>
              {<ListItemText primary={"로그아웃"} />}
            </ListItemButton>
          </ListItem>
        </List>
      ) : null}
    </Box>
  );

  return (
    <div css={divStyle}>
      <img
        src={logo}
        css={{
          height: "5.5vh",
          width: "11vh",
          marginLeft: "1.5vh",
          marginTop: "1.5vh",
        }}
      />
      <Button onClick={toggleDrawer("right", true)} height="30">
        <MenuIcon sx={{ fontSize: "35px", color: "black" }} />
      </Button>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}
