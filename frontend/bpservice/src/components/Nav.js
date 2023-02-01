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
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../modules/userLogin";
import { useEffect } from "react";

const divStyle = css`
  display: flex;
  justify-content: space-between;
  height: 8vh;
`;
export default function Nav() {
  const [state, setState] = React.useState({
    right: false,
  });

  const navigation = useNavigate();
  const dispatch = useDispatch();

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
    if (objString) {
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
    switch (e.target.textContent) {
      case "로그인":
        navigation("/bp/login");
        return;
      case "회원가입":
        navigation("/bp/signUp");
        return;
      case "로그아웃":
        dispatch(logOut());
        navigation("/");
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
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text} onClick={navItemClick} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  const goToHome = () => {
    navigation("/");
  };

  return (
    <div css={divStyle}>
      <h2 onClick={goToHome}>BP</h2>
      <Button onClick={toggleDrawer("right", true)} height="30">
        <p
          css={{
            fontSize: "7vw",
            color: "black",
            fontWeight: "bolder",
          }}
        >
          {"\u2261"}
        </p>
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
