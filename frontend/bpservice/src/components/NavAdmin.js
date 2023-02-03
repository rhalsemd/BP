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
import { useNavigate } from "react-router-dom";

const divStyle = css`
  display: flex;
  justify-content: space-between;
  height: 8vh;
`;
export default function Nav() {
  const navigate = useNavigate();
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
      default:
        break;
    }
  };
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
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
<<<<<<< HEAD:frontend/bpservice/src/components/Nav.js
        {(localStorage.getItem("login-token")
          ? // 로그인 할 때
            ["로그아웃", "마이페이지", "지도"]
          : ["로그인", "회원가입"]
        ).map((text, index) => (
          <ListItem key={text} disablePadding>
=======
        {["매출 현황", "사용 현황", "사용자 목록"].map((text, index) => (
          <ListItem key={text} disablePadding onClick={() => onClick(index)}>
>>>>>>> feature/FE/admin-CSS:frontend/bpservice/src/components/NavAdmin.js
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
              <ListItemText primary={text} onClick={navItemClick} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
<<<<<<< HEAD:frontend/bpservice/src/components/Nav.js
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
=======
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{<LogoutTwoToneIcon />}</ListItemIcon>
            <ListItemText primary={"로그아웃"} />
          </ListItemButton>
        </ListItem>
      </List>
>>>>>>> feature/FE/admin-CSS:frontend/bpservice/src/components/NavAdmin.js
    </Box>
  );

  const goToHome = () => {
    navigation("/");
  };

  return (
    <div css={divStyle}>
      <h2 onClick={goToHome} style={{ cursor: "pointer" }}>
        BP
      </h2>
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
