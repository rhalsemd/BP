/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";
import { connect } from "react-redux";
import { mapInfo } from "../../modules/mapStore";

const resultBox = css`
  width: 95vw;
  height: 150px;
  background-color: white;
  overflow: scroll;
`;

const resultContent = css`
  font-size: 2rem;
  cursor: pointer;
`;

function MapSearchResult({ mapStore, goToPlace }) {
  const [placeLocation, setPlaceLocation] = useState({});
  // 장소를 클릭했을 때
  const getPlace = (e) => {
    const placeId = e.target.id;
    const placeArr = mapStore.searchResult;
    placeArr.forEach((place) => {
      if (place.id === placeId) {
        setPlaceLocation((current) => {
          current.x = place.x;
          current.y = place.y;
          return current;
        });
      }
    });
    goToPlace(placeLocation);
  };
  return (
    <div css={resultBox}>
      <span>
        <ul>
          {mapStore.searchResult
            ? mapStore.searchResult.map((item) => {
                return (
                  <li
                    key={item.id}
                    css={resultContent}
                    onClick={getPlace}
                    id={item.id}
                  >
                    {item.place_name}
                  </li>
                );
              })
            : null}
        </ul>
      </span>
    </div>
  );
}

const mapStateToProps = ({ mapStore }) => {
  return { mapStore };
};

const mapDispatchToProps = (dispatch) => {
  return {
    goToPlace(location) {
      dispatch(mapInfo.goToPlace(location));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapSearchResult);
