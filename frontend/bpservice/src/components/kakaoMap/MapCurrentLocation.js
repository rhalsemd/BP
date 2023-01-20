/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { connect } from "react-redux";
import { mapInfo } from "../../modules/mapStore";

const buttonCss = css`
  width: 40px;
  height: 40px;
`;

const { kakao } = window;

function MapCurrentLocation({ goToCurrent }) {
  const getCurrentPosBtn = () => {
    const option = {
      enableHighAccuracy: true,
    };
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log(position.GeolocationCoordinates.latitude);
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        goToCurrent(location);
      },
      null,
      option
    );
  };

  return (
    <button css={buttonCss} onClick={getCurrentPosBtn}>
      +
    </button>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToCurrent(location) {
      dispatch(mapInfo.goToCurrent(location));
    },
  };
};

export default connect(null, mapDispatchToProps)(MapCurrentLocation);
