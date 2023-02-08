/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ListItemIcon } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../modules/mypage";

const thirdModalStyle = css`
  width: 95vw;
  margin-left: 2.5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  align-items: center;
  background-color: rgba(249, 250, 251, 0.9);
  /* box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24); */
`;

function MyPageUserBtn() {
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const goToModifyInfo = () => {
    navigation(`/bp/modify/user`);
  };

  const goToModifyPwd = () => {
    navigation(`/bp/modify/pwd`);
  };

  const goToDeleteUser = () => {
    if (!window.confirm("탈퇴를 하시겠습니까?")) {
      return;
    } else {
      dispatch(deleteUser());
    }
  };

  return (
    <>
      <div css={thirdModalStyle}>
        <Box
          sx={{
            width: "85vw",
            bgcolor: "background.paper",
            borderRadius: "10px",
            backgroundColor: "#f9fafb",
          }}
        >
          <nav aria-label="secondary mailbox folders">
            <List>
              {/* 회원 정보 수정 */}
              <ListItem disablePadding>
                <ListItemButton onClick={goToModifyInfo}>
                  <ListItemText primary="회원 정보 수정" />
                </ListItemButton>

                <ListItemIcon sx={{ m: -3 }}>
                  <KeyboardArrowRightIcon />
                </ListItemIcon>
              </ListItem>

              <Divider sx={{ backgroundColor: "lightgray" }} />

              {/* 비밀번호 변경 */}
              <ListItem disablePadding>
                <ListItemButton onClick={goToModifyPwd}>
                  <ListItemText primary="비밀번호 변경" />
                </ListItemButton>

                <ListItemIcon sx={{ m: -3 }}>
                  <KeyboardArrowRightIcon />
                </ListItemIcon>
              </ListItem>

              <Divider sx={{ backgroundColor: "lightgray" }} />

              {/* 회원 탈퇴 */}
              <ListItem disablePadding>
                <ListItemButton onClick={goToDeleteUser}>
                  <ListItemText primary="회원 탈퇴" />
                </ListItemButton>

                <ListItemIcon sx={{ m: -3 }}>
                  <KeyboardArrowRightIcon />
                </ListItemIcon>
              </ListItem>
            </List>
          </nav>
        </Box>
      </div>
    </>
  );
}

export default MyPageUserBtn;
