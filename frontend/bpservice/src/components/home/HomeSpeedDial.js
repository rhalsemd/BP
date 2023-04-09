/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import MapIcon from "@mui/icons-material/Map";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { useNavigate } from "react-router-dom/dist";
import { useState } from "react";

function HomeSpeedDial() {
  const [boxOpacity, setBoxOpacity] = useState(true);
  const navigation = useNavigate();

  const mapClick = () => {
    if (localStorage.getItem("login-token")) {
      navigation("/bp/map");
    } else {
      navigation("/bp/login");
    }
  };

  const boxOpacityOn = css`
    opacity: 1;
  `;
  const boxOpacityOff = css`
    opacity: 0.6;
  `;
  const chatBotClick = () => {
    navigation("/bp/chatbot");
  };
  const actions = [
    { icon: <MapIcon onClick={mapClick} />, name: "Map" },
    { icon: <LiveHelpIcon onClick={chatBotClick} />, name: "Chatbot" },
  ];
  return (
    <Box css={boxOpacity ? boxOpacityOff : boxOpacityOn}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{
          position: "absolute",
          bottom: 0,
          "& .MuiFab-primary": { width: 40, height: 40 },
        }}
        icon={<SpeedDialIcon />}
        onOpen={() => setBoxOpacity(false)}
        onClose={() => setBoxOpacity(true)}
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
  );
}

export default HomeSpeedDial;
