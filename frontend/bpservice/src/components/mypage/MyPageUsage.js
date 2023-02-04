/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { ListItemIcon } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Divider from "@mui/material/Divider";
import UmbrellaModal from "./UmbrellaModal";

const secondModalStyle = css`
  width: 95vw;
  margin-left: 2.5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2.5vh;
  border-radius: 10px;
  align-items: center;
  background-color: rgba(249, 250, 251, 0.9);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24);
`;

function MyPageUsage() {
  return (
    <>
      <div css={secondModalStyle}>
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
              {/* 내 우산 사용 정보 */}
              <UmbrellaModal />

              <Divider />

              {/* 보증금 정보 */}
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary="보증금" />
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
export default MyPageUsage;
