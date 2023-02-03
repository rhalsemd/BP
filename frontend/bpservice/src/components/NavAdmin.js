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
        {["매출 현황", "사용 현황", "사용자 목록"].map((text, index) => (
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
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>{<LogoutTwoToneIcon />}</ListItemIcon>
            <ListItemText primary={"로그아웃"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div css={divStyle}>
      <h2>BP</h2>
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
