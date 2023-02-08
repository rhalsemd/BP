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
import logo from "../style/logo.png";

import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import LoginIcon from "@mui/icons-material/Login";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../modules/userLogin";
import { useEffect } from "react";
import { pointer, pointers } from "d3";

const divStyle = css`
  display: flex;
  justify-content: space-between;
  position: sticky;
  width: 100%;
  height: 8vh;
  font-size: 1rem;
`;
export default function Nav() {
  const [state, setState] = React.useState({
    right: false,
  });

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const iconRef = React.useRef(null);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  useEffect(() => {
    // localStorage 값 읽기 (문자열)
    const objString = localStorage.getItem("login-token");
    // null 체크
    if (objString !== null && objString !== undefined) {
      // 문자열을 객체로 변환
      const obj = JSON.parse(objString);
      // 현재 시간과 localStorage의 expire 시간 비교
      if (Date.now() > obj.expire) {
        // 만료시간이 지난 item 삭제
        localStorage.removeItem("login-token");
        alert("다시 로그인해주세요.");
        navigation("/bp/login");
      }
    }
  });

  const navItemClick = (e) => {
    switch (e.target.getAttribute("value") || e.target.textContent) {
      case "로그인":
        navigation("/bp/login");
        return;
      case "회원가입":
        navigation("/bp/terms");
        return;
      case "로그아웃":
        dispatch(logOut());
        navigation("/bp");
        return;
      case "마이페이지":
        navigation("/bp/mypage");
        return;
      case "지도":
        navigation("/bp/map");
        return;

      default:
        return;
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {(localStorage.getItem("login-token")
          ? // 로그인 할 때
            ["로그아웃", "마이페이지", "지도"]
          : ["로그인", "회원가입"]
        ).map((text, index) => (
          <ListItem
            key={text}
            value={text}
            disablePadding
            onClick={navItemClick}
          >
            <ListItemButton value={text}>
              <ListItemIcon value={text}>
                {text === "로그아웃" ? (
                  <LogoutIcon value={text} />
                ) : text === "마이페이지" ? (
                  <PermIdentityIcon value={text} />
                ) : text === "지도" ? (
                  <FmdGoodIcon value={text} />
                ) : text === "로그인" ? (
                  <LoginIcon value={text} />
                ) : text === "회원가입" ? (
                  <AssignmentIcon value={text} />
                ) : null}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  const goToHome = () => {
    navigation("/bp");
  };

  return (
    <div css={divStyle}>
      <img
        src={logo}
        css={{
          height: "5.5vh",
          width: "11vh",
          marginLeft: "1.5vh",
          marginTop: "1.5vh",
          cursor: "pointer",
        }}
        alt="Brolly Project"
        onClick={goToHome}
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
