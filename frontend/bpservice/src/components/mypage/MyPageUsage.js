/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import UmbrellaModal from "./UmbrellaModal";
import CountsModal from "./CountsModal";

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
  /* box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.24); */
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

              <Divider sx={{ backgroundColor: "lightgray" }} />

              {/* 보증금 정보 */}
              <CountsModal />
            </List>
          </nav>
        </Box>
      </div>
    </>
  );
}
export default MyPageUsage;
