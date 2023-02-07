/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import MapIcon from "@mui/icons-material/Map";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { useNavigate } from "react-router-dom/dist";

const SpeedDialStyle = css`
  position: sticky;
  bottom: 0;
`;

function HomeSpeedDial() {
  const navigation = useNavigate();

  const mapClick = () => {
    if (localStorage.getItem("login-token")) {
      navigation("/bp/map");
    } else {
      navigation("/bp/login");
    }
  };

  const chatBotClick = () => {
    navigation("/bp/chatbot");
  };
  const actions = [
    { icon: <MapIcon onClick={mapClick} />, name: "Map" },
    { icon: <LiveHelpIcon onClick={chatBotClick} />, name: "Chatbot" },
  ];
  return (
    <div css={SpeedDialStyle}>
      <div>
        <Box
          sx={{
            height: 0,
            transform: "translateZ(0px)",
            flexGrow: 1,
          }}
        >
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{
              position: "absolute",
              bottom: 15,
              right: 15,
              "& .MuiFab-primary": { width: 40, height: 40 },
            }}
            icon={<SpeedDialIcon />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        </Box>
      </div>
    </div>
  );
}

export default HomeSpeedDial;
